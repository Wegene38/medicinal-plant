import type { GrowthStage, GrowthStageKey, L10n, Location } from './types'

/** Shorthand for a bilingual string. */
export const t = (zh: string, en: string): L10n => ({ zh, en })

export const stage = (key: GrowthStageKey, months: number[], zh: string, en: string): GrowthStage => ({
  key,
  months,
  text: { zh, en },
})

export const loc = (zh: string, en: string, lat: number, lng: number): Location => ({ name: { zh, en }, lat, lng })

export const fm = (year: 2002 | 2019 | 2023 | 2024, note?: L10n) => ({ year, note })
