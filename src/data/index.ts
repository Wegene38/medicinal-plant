import { chinaA } from './china-a'
import { chinaB } from './china-b'
import { irelandA } from './ireland-a'
import { irelandB } from './ireland-b'
import type { Category, Comparison, Plant } from './types'

export const plants: Plant[] = [...chinaA, ...chinaB, ...irelandA, ...irelandB]

const byId = new Map(plants.map((p) => [p.id, p]))
export const getPlant = (id: string) => byId.get(id)

export const categories: Category[] = [
  'tonic',
  'heat',
  'digestive',
  'respiratory',
  'circulation',
  'pain',
  'skin',
  'women',
  'calming',
  'urinary',
]

export const comparisons: Comparison[] = [
  {
    id: 'hawthorn',
    china: 'shan-zha',
    ireland: 'hawthorn',
    title: { zh: '山楂：消食 vs 养心', en: 'Hawthorn: digestion vs the heart' },
    similarities: {
      zh: '同属山楂属（Crataegus），果实都富含黄酮与原花青素；现代研究在两地都关注其对心血管和血脂的益处。',
      en: 'Both are Crataegus species whose fruit is rich in flavonoids and procyanidins, and modern research in both countries looks at their benefits for the heart and blood lipids.',
    },
    differences: {
      zh: '中医主要用果实“消肉食积滞”；爱尔兰与欧洲草药学则更看重花叶，把它视为“心脏的滋补品”。爱尔兰民间还把孤立的山楂树视为神圣的仙女树。',
      en: 'TCM uses mainly the fruit, to digest rich, meaty food. Irish and European herbalism prizes the flowers and leaves as a heart tonic, and Irish folklore treats lone hawthorns as sacred fairy trees.',
    },
  },
  {
    id: 'dandelion',
    china: 'pu-gong-ying',
    ireland: 'dandelion',
    title: { zh: '蒲公英：清热解毒 vs 利尿养肝', en: 'Dandelion: clearing heat vs diuretic and liver tonic' },
    similarities: {
      zh: '同为蒲公英属，都是随处可见的“野草”，嫩叶都可食用，两地都用它利尿、帮助消化。',
      en: 'Both are Taraxacum, ubiquitous “weeds” with edible young leaves, and both traditions use them to promote urination and aid digestion.',
    },
    differences: {
      zh: '中医用全草清热解毒、消痈散结（尤其是乳痈）；爱尔兰则区分部位：叶利尿、根养肝，并用乳汁点疣、烘根做“咖啡”。',
      en: 'TCM uses the whole plant to clear toxic heat and swellings, especially mastitis. Irish use separates the parts: leaf as a diuretic, root as a liver tonic, sap for warts and roasted root as “coffee”.',
    },
  },
  {
    id: 'mugwort',
    china: 'ai-ye',
    ireland: 'mugwort',
    title: { zh: '艾：艾灸 vs 梦枕', en: 'Mugwort: moxibustion vs dream pillows' },
    similarities: {
      zh: '同为蒿属（Artemisia），都气味芳香，都与妇科和节日驱邪习俗相关：中国在端午挂艾，爱尔兰在仲夏节前夜采艾。',
      en: 'Both are aromatic Artemisia linked to women’s health and to protective festival customs: hung up at China’s Dragon Boat Festival, and gathered on Ireland’s Midsummer Eve.',
    },
    differences: {
      zh: '中国艾叶以“温经散寒”著称，制成艾绒用于艾灸，体系完整；欧洲北艾则主要作苦味健胃剂和梦枕，内服较少。',
      en: 'Chinese ai ye is the warming herb behind moxibustion, part of a fully developed system. European mugwort is used mostly as a bitter digestive and in dream pillows, and is rarely taken internally.',
    },
  },
  {
    id: 'plantain',
    china: 'che-qian',
    ireland: 'ribwort',
    title: { zh: '车前：利尿通淋 vs 疗伤圣草', en: 'Plantain: urinary herb vs wound healer' },
    similarities: {
      zh: '同为车前属，都生长在路边、耐践踏，都含黏液质和桃叶珊瑚苷，两地都用于咳嗽。',
      en: 'Both are trample-proof wayside Plantago species containing mucilage and aucubin, and both are used for coughs.',
    },
    differences: {
      zh: '中医重在“利尿通淋”，种子（车前子）是重要药材；爱尔兰的长叶车前则主要是外伤急救草，被叮咬时嚼一片叶子敷上即可。',
      en: 'TCM focuses on promoting urination, and the seed is an important drug. Irish ribwort is first-aid for stings and cuts: chew a leaf and press it on.',
    },
  },
  {
    id: 'mint',
    china: 'bo-he',
    ireland: 'water-mint',
    title: { zh: '薄荷：疏散风热 vs 健胃驱风', en: 'Mint: dispersing wind-heat vs settling the stomach' },
    similarities: {
      zh: '同属薄荷属，都喜欢湿润环境，都含有薄荷醇类成分，两地都用于感冒和消化不良。',
      en: 'Both are moisture-loving Mentha species containing menthol-type oils, used for colds and indigestion.',
    },
    differences: {
      zh: '中医把薄荷归为“辛凉解表药”，用于风热感冒、咽痛和透疹，煎煮时需后下；爱尔兰更多把它当作饭后助消化的茶饮。',
      en: 'TCM classes mint as a cool, pungent herb for feverish colds, sore throats and rashes, added late to the decoction. In Ireland it is mainly an after-dinner digestive tea.',
    },
  },
  {
    id: 'self-heal',
    china: 'xia-ku-cao',
    ireland: 'self-heal',
    title: { zh: '夏枯草：同一物种，两种智慧', en: 'Self-heal: one species, two traditions' },
    similarities: {
      zh: '完全是同一物种（Prunella vulgaris），两地都认为它有“清热”、消炎的作用。',
      en: 'Exactly the same species, Prunella vulgaris, and both traditions see it as cooling and anti-inflammatory.',
    },
    differences: {
      zh: '中医在夏至前后采集已经枯黄的果穗，用于清肝明目、散结消肿；爱尔兰和欧洲则采集开花的全草，用作伤口和喉咙用药，即“万能药”（heal-all）。',
      en: 'TCM harvests the browned fruit spikes around midsummer to clear Liver fire, brighten the eyes and dissolve nodules. Ireland and Europe pick the flowering herb as a wound and throat remedy, hence “heal-all”.',
    },
  },
]

export const getComparisonFor = (plantId: string) =>
  comparisons.find((c) => c.china === plantId || c.ireland === plantId)
