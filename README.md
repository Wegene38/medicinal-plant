# Medicinal Plant · 药用植物图鉴

A bilingual (中文 / English) PWA introducing 30 medicinal plants from China and Ireland: habitat, growth cycle, medicinal value, usage and cautions.

## Features

- **图鉴 Plants**: filter by region and use, and search by Chinese, English, Latin or Irish name.
- **详情 Detail**: habitat, growth timeline plus a 12-month calendar, TCM properties or Irish folk use, preparation methods, cautions, and a distribution map.
- **对比 Compare**: six China × Ireland pairs from the same genus (hawthorn, dandelion, mugwort, plantain, mint, self-heal).
- **地图 Map**: every growing area on OpenStreetMap.
- **测验 Quiz**: identify plants from photos, 10 questions per round, with your best score saved.
- **收藏 Saved**: favourites stored on the device.
- Works offline once installed (Add to Home Screen); supports dark mode.

## Development

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs to dist/, deployable to any static host
```

## Content

- Plant data lives in `src/data/*.ts` (typed by `src/data/types.ts`). To add a plant, append an entry there.
- Photos come from Wikimedia Commons. `node scripts/fetch-images.mjs` downloads any missing ones into `public/images/` and records the author and licence in `src/data/images.json`.

> For education only, not medical advice.
