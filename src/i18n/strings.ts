import type { Category, GrowthStageKey, L10n, Region, Toxicity } from '../data/types'

export const ui = {
  appName: { zh: '药用植物图鉴', en: 'Medicinal Plant' },
  tagline: { zh: '中国与爱尔兰的草木本草', en: 'Healing plants of China and Ireland' },
  heroText: {
    zh: '从长白山的人参到爱尔兰沼泽里的睡菜，探索两种传统医学中的植物：它们在哪里生长、如何生长、怎样入药。',
    en: 'From Changbai ginseng to Irish bogbean, explore the plants of two healing traditions: where they grow, how they grow, and how they are used.',
  },
  navHome: { zh: '图鉴', en: 'Plants' },
  navCompare: { zh: '对比', en: 'Compare' },
  navMap: { zh: '地图', en: 'Map' },
  navQuiz: { zh: '测验', en: 'Quiz' },
  navFavorites: { zh: '收藏', en: 'Saved' },
  navAbout: { zh: '关于', en: 'About' },
  all: { zh: '全部', en: 'All' },
  searchPlaceholder: { zh: '搜索中文名、英文名或学名…', en: 'Search by name or Latin name…' },
  allCategories: { zh: '全部功效', en: 'All uses' },
  noResults: { zh: '没有找到匹配的植物。', en: 'No plants match your search.' },
  plantsCount: { zh: '种植物', en: 'plants' },
  back: { zh: '返回', en: 'Back' },
  overview: { zh: '概述', en: 'Overview' },
  habitat: { zh: '生长环境', en: 'Habitat' },
  climate: { zh: '气候', en: 'Climate' },
  soil: { zh: '土壤与生境', en: 'Soil & setting' },
  distribution: { zh: '分布', en: 'Distribution' },
  growth: { zh: '生长过程', en: 'Growth cycle' },
  growthCalendar: { zh: '物候日历', en: 'Seasonal calendar' },
  harvestTime: { zh: '采收', en: 'Harvest' },
  medicinal: { zh: '药用价值', en: 'Medicinal value' },
  partsUsed: { zh: '药用部位', en: 'Parts used' },
  propertiesChina: { zh: '性味归经', en: 'TCM properties' },
  propertiesIreland: { zh: '传统认识', en: 'Traditional view' },
  mainUses: { zh: '主要功效', en: 'Main uses' },
  usage: { zh: '使用方法', en: 'How it is used' },
  cautions: { zh: '注意事项与禁忌', en: 'Cautions' },
  whereItGrows: { zh: '主要产地', en: 'Where it grows' },
  family: { zh: '科', en: 'Family' },
  lifeForm: { zh: '生活型', en: 'Life form' },
  drugName: { zh: '药材名', en: 'Drug name' },
  irishName: { zh: '爱尔兰语名', en: 'Irish name' },
  save: { zh: '收藏', en: 'Save' },
  saved: { zh: '已收藏', en: 'Saved' },
  comparePair: { zh: '查看中爱对比', en: 'Compare China & Ireland' },
  photo: { zh: '图片', en: 'Photo' },
  disclaimerShort: {
    zh: '本应用仅供科普学习，不能替代专业医疗建议。使用任何草药前请咨询医生或注册中医师/草药师。',
    en: 'For education only, not medical advice. Consult a doctor or qualified practitioner before using any herb.',
  },
  compareTitle: { zh: '中爱对比', en: 'China × Ireland' },
  compareIntro: {
    zh: '同一属甚至同一种植物，在两种医学传统中有怎样不同的理解与用法？',
    en: 'How do two healing traditions understand and use the same plant genus — or even the same species?',
  },
  similarities: { zh: '相同之处', en: 'In common' },
  differences: { zh: '不同之处', en: 'Differences' },
  viewDetail: { zh: '查看详情', en: 'View details' },
  mapTitle: { zh: '分布地图', en: 'Distribution map' },
  mapIntro: { zh: '点击标记查看植物的主要产地或生长地。', en: 'Tap a marker to see where each plant grows.' },
  mapOffline: { zh: '地图需要联网加载底图。', en: 'The base map needs an internet connection.' },
  quizTitle: { zh: '识别小测验', en: 'Plant ID quiz' },
  quizIntro: { zh: '看图识植物，每轮 10 题。', en: 'Name the plant from its photo — 10 questions per round.' },
  quizStart: { zh: '开始测验', en: 'Start quiz' },
  quizQuestion: { zh: '这是哪种植物？', en: 'Which plant is this?' },
  quizNext: { zh: '下一题', en: 'Next' },
  quizFinish: { zh: '查看成绩', en: 'See results' },
  quizCorrect: { zh: '答对了！', en: 'Correct!' },
  quizWrong: { zh: '答错了，正确答案是', en: 'Not quite — it is' },
  quizScore: { zh: '你的得分', en: 'Your score' },
  quizAgain: { zh: '再来一轮', en: 'Play again' },
  quizBest: { zh: '最佳成绩', en: 'Best score' },
  quizRegion: { zh: '题目范围', en: 'Plants from' },
  favoritesEmpty: { zh: '还没有收藏。在植物详情页点击 ♡ 收藏。', en: 'Nothing saved yet. Tap ♡ on a plant to save it.' },
  aboutTitle: { zh: '关于本应用', en: 'About this app' },
  language: { zh: 'English', en: '中文' },
  photoCredit: { zh: '图片来源', en: 'Photo' },
  month: { zh: '月', en: '' },
} satisfies Record<string, L10n>

export type UiKey = keyof typeof ui

export const regionLabel: Record<Region, L10n> = {
  china: { zh: '中国', en: 'China' },
  ireland: { zh: '爱尔兰', en: 'Ireland' },
}

export const regionFlag: Record<Region, string> = { china: '🇨🇳', ireland: '🇮🇪' }

export const categoryLabel: Record<Category, L10n> = {
  tonic: { zh: '补益', en: 'Tonic' },
  heat: { zh: '清热解毒', en: 'Cooling' },
  digestive: { zh: '消化', en: 'Digestive' },
  respiratory: { zh: '呼吸', en: 'Respiratory' },
  circulation: { zh: '心血管', en: 'Heart & blood' },
  skin: { zh: '外用/皮肤', en: 'Skin & wounds' },
  pain: { zh: '止痛', en: 'Pain' },
  women: { zh: '妇科', en: "Women's health" },
  calming: { zh: '安神', en: 'Calming' },
  urinary: { zh: '利尿', en: 'Urinary' },
}

export const toxicityLabel: Record<Toxicity, L10n> = {
  safe: { zh: '较安全', en: 'Generally safe' },
  caution: { zh: '需谨慎', en: 'Use with care' },
  toxic: { zh: '有毒', en: 'Poisonous' },
}

export const stageLabel: Record<GrowthStageKey, L10n> = {
  seed: { zh: '播种', en: 'Seed' },
  seedling: { zh: '萌芽', en: 'Sprouting' },
  vegetative: { zh: '生长', en: 'Growth' },
  flowering: { zh: '开花', en: 'Flowering' },
  fruiting: { zh: '结果', en: 'Fruiting' },
  dormancy: { zh: '休眠', en: 'Dormancy' },
}

export const stageIcon: Record<GrowthStageKey, string> = {
  seed: '🌰',
  seedling: '🌱',
  vegetative: '🌿',
  flowering: '🌸',
  fruiting: '🍒',
  dormancy: '❄️',
}

export const monthShort: L10n[] = [
  { zh: '1', en: 'J' }, { zh: '2', en: 'F' }, { zh: '3', en: 'M' }, { zh: '4', en: 'A' },
  { zh: '5', en: 'M' }, { zh: '6', en: 'J' }, { zh: '7', en: 'J' }, { zh: '8', en: 'A' },
  { zh: '9', en: 'S' }, { zh: '10', en: 'O' }, { zh: '11', en: 'N' }, { zh: '12', en: 'D' },
]
