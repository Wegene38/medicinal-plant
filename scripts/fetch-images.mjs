// Downloads one representative photo per plant from Wikipedia/Wikimedia Commons
// into public/images/, and records author + licence in src/data/images.json.
// Usage: node scripts/fetch-images.mjs [--force]
import { readFile, writeFile, mkdir, access } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const imgDir = path.join(root, 'public/images')
const metaFile = path.join(root, 'src/data/images.json')
const force = process.argv.includes('--force')
const UA = 'MedicinalPlantApp/0.1 (educational project)'

// Pull id + wiki title pairs straight out of the data sources.
async function readPlants() {
  const files = ['china-a.ts', 'china-b.ts', 'ireland-a.ts', 'ireland-b.ts']
  const out = []
  for (const f of files) {
    const src = await readFile(path.join(root, 'src/data', f), 'utf8')
    const re = /id: '([^']+)',\s*\n\s*region:[\s\S]*?wiki: '([^']+)'/g
    for (const m of src.matchAll(re)) out.push({ id: m[1], wiki: m[2] })
  }
  return out
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// Wikimedia rate-limits bursts (HTTP 429), so back off and retry.
async function get(url) {
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(url, { headers: { 'User-Agent': UA } })
    if (res.status === 429 && attempt < 5) {
      await sleep(Number(res.headers.get('retry-after')) * 1000 || 5000 * (attempt + 1))
      continue
    }
    if (!res.ok) throw new Error(`${res.status} ${url}`)
    return res
  }
}

const getJson = async (url) => (await get(url)).json()

const stripHtml = (s = '') => s.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()

// Plants whose Wikipedia lead image is missing or duplicated: search Commons instead.
const COMMONS_SEARCH = {
  heather: 'Calluna vulgaris flowers',
  'self-heal': 'Prunella vulgaris flower close',
}

async function pickFile(id, title) {
  if (COMMONS_SEARCH[id]) {
    const q = new URLSearchParams({
      action: 'query', format: 'json', list: 'search', srnamespace: '6',
      srsearch: `${COMMONS_SEARCH[id]} filetype:bitmap`, srlimit: '5',
    })
    const hits = (await getJson(`https://commons.wikimedia.org/w/api.php?${q}`)).query.search
    const hit = hits.find((h) => /\.jpe?g$/i.test(h.title))
    if (!hit) throw new Error(`no Commons result for ${id}`)
    return hit.title.replace(/^File:/, '')
  }
  const q = new URLSearchParams({
    action: 'query', format: 'json', redirects: '1', prop: 'pageimages',
    piprop: 'name', titles: title,
  })
  const data = await getJson(`https://en.wikipedia.org/w/api.php?${q}`)
  const page = Object.values(data.query.pages)[0]
  if (!page.pageimage) throw new Error(`no page image for ${title}`)
  return page.pageimage
}

async function lookup(id, title) {
  const file = await pickFile(id, title)
  const q2 = new URLSearchParams({
    action: 'query', format: 'json', prop: 'imageinfo', titles: `File:${file}`,
    iiprop: 'url|extmetadata', iiurlwidth: '900',
  })
  const info = Object.values((await getJson(`https://commons.wikimedia.org/w/api.php?${q2}`)).query.pages)[0]
  const ii = info.imageinfo[0]
  const md = ii.extmetadata || {}
  return {
    file,
    url: ii.thumburl || ii.url,
    page: ii.descriptionurl,
    artist: stripHtml(md.Artist?.value) || 'Unknown',
    license: stripHtml(md.LicenseShortName?.value) || 'See source',
  }
}

const exists = (p) => access(p).then(() => true, () => false)

await mkdir(imgDir, { recursive: true })
const meta = (await exists(metaFile)) ? JSON.parse(await readFile(metaFile, 'utf8')) : {}
for (const { id, wiki } of await readPlants()) {
  const dest = path.join(imgDir, `${id}.jpg`)
  if (!force && meta[id] && (await exists(dest))) continue
  try {
    const info = await lookup(id, wiki)
    const res = await get(info.url)
    await writeFile(dest, Buffer.from(await res.arrayBuffer()))
    meta[id] = { src: `images/${id}.jpg`, file: info.file, page: info.page, artist: info.artist, license: info.license }
    console.log('✓', id, '←', info.file)
  } catch (e) {
    console.warn('✗', id, e.message)
  }
  await sleep(1500)
}
await writeFile(metaFile, JSON.stringify(meta, null, 2) + '\n')
