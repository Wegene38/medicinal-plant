import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PlantCard } from '../components/PlantCard'
import { categories, plants } from '../data'
import type { Category, Region } from '../data/types'
import { useLang } from '../i18n'
import { categoryLabel, regionFlag, regionLabel } from '../i18n/strings'

const regions: (Region | 'all')[] = ['all', 'china', 'ireland']

export function Home() {
  const { t, l } = useLang()
  // Filters live in the URL so Back from a detail page restores them.
  const [params, setParams] = useSearchParams()
  const region = (params.get('region') as Region | null) ?? 'all'
  const category = params.get('cat') as Category | null
  const query = params.get('q') ?? ''

  const update = (key: string, value: string | null) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return plants.filter(
      (p) =>
        (region === 'all' || p.region === region) &&
        (!category || p.categories.includes(category)) &&
        (!q ||
          [p.name.zh, p.name.en, p.latin, p.drugName ?? '', p.irish ?? ''].some((s) => s.toLowerCase().includes(q))),
    )
  }, [region, category, query])

  return (
    <>
      <section className="hero">
        <p className="hero__eyebrow">🇨🇳 × 🇮🇪</p>
        <h1>{t('tagline')}</h1>
        <p className="hero__text">{t('heroText')}</p>
      </section>

      <section className="filters">
        <div className="segmented" role="tablist">
          {regions.map((r) => (
            <button
              key={r}
              role="tab"
              aria-selected={region === r}
              className={region === r ? 'is-active' : ''}
              onClick={() => update('region', r === 'all' ? null : r)}
            >
              {r === 'all' ? t('all') : `${regionFlag[r]} ${l(regionLabel[r])}`}
            </button>
          ))}
        </div>
        <input
          type="search"
          className="search"
          placeholder={t('searchPlaceholder')}
          value={query}
          onChange={(e) => update('q', e.target.value)}
        />
        <div className="chips chips--scroll">
          <button className={`chip ${!category ? 'is-active' : ''}`} onClick={() => update('cat', null)}>
            {t('allCategories')}
          </button>
          {categories.map((c) => (
            <button
              key={c}
              className={`chip ${category === c ? 'is-active' : ''}`}
              onClick={() => update('cat', category === c ? null : c)}
            >
              {l(categoryLabel[c])}
            </button>
          ))}
        </div>
      </section>

      <p className="count">
        {results.length} {t('plantsCount')}
      </p>
      {results.length ? (
        <div className="grid">
          {results.map((p) => (
            <PlantCard key={p.id} plant={p} />
          ))}
        </div>
      ) : (
        <p className="empty">{t('noResults')}</p>
      )}
    </>
  )
}
