export type Lang = 'zh' | 'en'

/** A string available in both Chinese and English. */
export interface L10n {
  zh: string
  en: string
}

export type Region = 'china' | 'ireland'

export type Category =
  | 'tonic' // 补益
  | 'heat' // 清热解毒
  | 'digestive' // 消化
  | 'respiratory' // 呼吸
  | 'circulation' // 心血管与活血
  | 'skin' // 外用与皮肤
  | 'pain' // 止痛与抗炎
  | 'women' // 妇科
  | 'calming' // 安神
  | 'urinary' // 利尿

export type Toxicity = 'safe' | 'caution' | 'toxic'

export type GrowthStageKey = 'seed' | 'seedling' | 'vegetative' | 'flowering' | 'fruiting' | 'dormancy'

export interface GrowthStage {
  key: GrowthStageKey
  /** Months (1–12) in which this stage typically happens. */
  months: number[]
  text: L10n
}

export interface Location {
  name: L10n
  lat: number
  lng: number
}

export interface Plant {
  id: string
  region: Region
  name: L10n
  latin: string
  /** Irish (Gaeilge) name, for Irish plants. */
  irish?: string
  /** Name of the crude drug in TCM, e.g. 枸杞子 for Lycium barbarum. */
  drugName?: string
  family: L10n
  /** English Wikipedia article title, used to fetch the photo. */
  wiki: string
  categories: Category[]
  toxicity: Toxicity
  /** e.g. "多年生草本" / "Perennial herb" */
  lifeForm: L10n
  summary: L10n
  habitat: {
    climate: L10n
    soil: L10n
    distribution: L10n
  }
  medicinal: {
    parts: L10n
    /** TCM nature/flavour/meridians, or the folk-medicine framing for Irish plants. */
    properties: L10n
    uses: L10n[]
  }
  usage: { method: L10n; detail: L10n }[]
  cautions: L10n
  growth: GrowthStage[]
  /** Months (1–12) when the medicinal part is harvested. */
  harvest: number[]
  locations: Location[]
  /** Listed in China's official food–medicine homology catalogue (药食同源目录), by batch year. */
  foodMedicine?: { year: 2002 | 2019 | 2023 | 2024; note?: L10n }
}

export interface Comparison {
  id: string
  china: string
  ireland: string
  title: L10n
  similarities: L10n
  differences: L10n
}
