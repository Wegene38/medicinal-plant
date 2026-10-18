# Medicinal Plant · 药用植物图鉴

A bilingual (中文 / English) PWA introducing 117 medicinal plants from China and Ireland (habitat, growth cycle, medicinal value, usage and cautions), plus a herbal-tea shop.

## Features

- **图鉴 Plants**: filter by region and use, and search by Chinese, English, Latin or Irish name. Includes every plant and fungus on China's 药食同源 (food–medicine) catalogue, with a filter for it.
- **茶铺 Tea shop**: 8 blends plus a discovery box, with product pages (flavour, ingredients linked to the guide, food information), a brew timer, a "find your blend" quiz and a delivery/returns page. Checkout uses Stripe Payment Links.
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

## Opening the shop

Edit `src/shop/config.ts`:

1. Fill in `businessName`, `businessAddress` (shown on product pages as the food business operator) and `contactEmail`.
2. In the Stripe Dashboard, create a Payment Link for each product: collect shipping addresses, add the shipping rates (€4.95, free over €35) and allow promotion codes.
3. Paste each link under the product's id in `paymentLinks`. Products without a link show "Coming soon".

Product copy lives in `src/shop/products.ts`. It must describe flavour, origin and brewing only: EU law (Regulation 1924/2006) forbids unauthorised health claims, so plant pages carry no buy buttons.

## Content

- Plant data lives in `src/data/*.ts` (typed by `src/data/types.ts`). To add a plant, append an entry there.
- Photos come from Wikimedia Commons. `node scripts/fetch-images.mjs` downloads any missing ones into `public/images/` and records the author and licence in `src/data/images.json`.

> For education only, not medical advice.
