import { t } from '../data/helpers'
import type { L10n } from '../data/types'

// Product copy describes flavour, origin and occasion only. EU rules
// (Regulation 1924/2006) forbid health claims that are not authorised,
// so nothing here may say what a product does for the body.

export type Flavour = 'floral' | 'fruity' | 'warm' | 'toasty' | 'fresh'
export type Moment = 'morning' | 'afterMeal' | 'evening' | 'anytime'
export type Sweetness = 'sweet' | 'none' | 'tangy'

export interface Ingredient {
  name: L10n
  /** Links to the plant's cultural page in the guide. */
  plantId?: string
  origin: L10n
  percent: number
}

export interface Product {
  id: string
  name: L10n
  tagline: L10n
  description: L10n
  notes: L10n[]
  flavours: Flavour[]
  moments: Moment[]
  sweetness: Sweetness
  ingredients: Ingredient[]
  grams: number
  price: number
  brew: { grams: number; ml: number; tempC: number; minutes: number }
  /** Accent colour for the pack illustration. */
  color: string
  signature?: boolean
  box?: boolean
}

export const flavourLabel: Record<Flavour, L10n> = {
  floral: t('花香', 'Floral'),
  fruity: t('果香微酸', 'Fruity'),
  warm: t('温暖辛香', 'Warm & spiced'),
  toasty: t('焙烤谷香', 'Toasty'),
  fresh: t('清凉', 'Fresh & minty'),
}

export const momentLabel: Record<Moment, L10n> = {
  morning: t('清晨', 'Morning'),
  afterMeal: t('饭后', 'After meals'),
  evening: t('夜晚', 'Evening'),
  anytime: t('随时', 'Any time'),
}

export const products: Product[] = [
  {
    id: 'two-islands',
    name: t('两岛特调', 'Two Islands'),
    tagline: t('杭白菊遇上爱尔兰接骨木花', 'Hangzhou chrysanthemum meets Irish elderflower'),
    description: t(
      '我们的招牌茶。浙江桐乡的杭白菊带来清甜蜜香，爱尔兰初夏的接骨木花带来麝香葡萄般的花香，再以一点薄荷收尾。一杯茶连起两座岛屿。',
      'Our signature blend. Honeyed chrysanthemum from Tongxiang, Zhejiang meets the muscat-like perfume of Irish early-summer elderflower, finished with a touch of mint: two islands in one cup.',
    ),
    notes: [t('蜂蜜', 'Honey'), t('麝香葡萄', 'Muscat grape'), t('清凉尾韵', 'Cool finish')],
    flavours: ['floral', 'fresh'],
    moments: ['afterMeal', 'anytime'],
    sweetness: 'sweet',
    ingredients: [
      { name: t('杭白菊', 'Chrysanthemum flowers'), plantId: 'chrysanthemum', origin: t('中国浙江', 'Zhejiang, China'), percent: 50 },
      { name: t('接骨木花', 'Elderflower'), plantId: 'elder', origin: t('爱尔兰', 'Ireland'), percent: 35 },
      { name: t('薄荷叶', 'Peppermint leaf'), plantId: 'bo-he', origin: t('欧盟', 'EU'), percent: 15 },
    ],
    grams: 40,
    price: 12.5,
    brew: { grams: 2, ml: 250, tempC: 90, minutes: 4 },
    color: '#3f7f6a',
    signature: true,
  },
  {
    id: 'osmanthus-peel',
    name: t('桂花陈皮', 'Osmanthus & Citrus Peel'),
    tagline: t('中秋的桂香，配新会陈皮', 'Mid-Autumn osmanthus with aged mandarin peel'),
    description: t(
      '金色的桂花带着杏桃般的甜香，陈皮带来柔和的柑橘香，烘焙大麦打底，温润顺口，不含咖啡因。',
      'Golden osmanthus with an apricot-like sweetness, soft citrus from aged mandarin peel and a base of roasted barley: smooth, warm and caffeine-free.',
    ),
    notes: [t('杏桃', 'Apricot'), t('柑橘', 'Mandarin'), t('焦糖谷物', 'Toasted grain')],
    flavours: ['floral', 'toasty'],
    moments: ['afterMeal', 'evening'],
    sweetness: 'sweet',
    ingredients: [
      { name: t('烘焙大麦', 'Roasted barley'), plantId: 'mai-ya', origin: t('欧盟', 'EU'), percent: 55 },
      { name: t('陈皮', 'Aged mandarin peel'), plantId: 'chen-pi', origin: t('中国广东', 'Guangdong, China'), percent: 30 },
      { name: t('桂花', 'Osmanthus flowers'), plantId: 'gui-hua', origin: t('中国广西', 'Guangxi, China'), percent: 15 },
    ],
    grams: 50,
    price: 11.5,
    brew: { grams: 3, ml: 250, tempC: 95, minutes: 5 },
    color: '#c98a2b',
  },
  {
    id: 'rose-date',
    name: t('玫瑰红枣', 'Rose & Red Date'),
    tagline: t('平阴玫瑰、新疆红枣与宁夏枸杞', 'Pingyin rose, Xinjiang jujube and Ningxia goji'),
    description: t(
      '玫瑰花蕾的馥郁香气，配上红枣片自然的焦糖甜味和枸杞的果香，色泽玫红，适合下午茶或送礼。',
      'Rich rosebud perfume with the natural caramel sweetness of jujube and a berry note from goji. A rosy cup for the afternoon or as a gift.',
    ),
    notes: [t('玫瑰', 'Rose'), t('焦糖枣', 'Caramel date'), t('红莓', 'Red berry')],
    flavours: ['floral', 'fruity'],
    moments: ['anytime'],
    sweetness: 'sweet',
    ingredients: [
      { name: t('红枣片', 'Jujube slices'), plantId: 'da-zao', origin: t('中国新疆', 'Xinjiang, China'), percent: 50 },
      { name: t('玫瑰花蕾', 'Rosebuds'), plantId: 'mei-gui', origin: t('中国山东', 'Shandong, China'), percent: 30 },
      { name: t('枸杞', 'Goji berries'), plantId: 'goji', origin: t('中国宁夏', 'Ningxia, China'), percent: 20 },
    ],
    grams: 50,
    price: 10.5,
    brew: { grams: 4, ml: 300, tempC: 95, minutes: 6 },
    color: '#b0415a',
  },
  {
    id: 'ginger-jujube',
    name: t('姜枣暖饮', 'Ginger & Jujube'),
    tagline: t('爱尔兰冬夜里的一杯暖意', 'A warm cup for an Irish winter night'),
    description: t(
      '干姜片的辛暖、红枣与桂圆的醇甜，是中国家庭冬天最常煮的一壶茶。可冲泡，也可小火煮 10 分钟更浓郁。',
      'Spicy dried ginger with the mellow sweetness of jujube and longan: the pot Chinese families brew all winter. Steep it, or simmer for 10 minutes for a richer cup.',
    ),
    notes: [t('生姜', 'Ginger'), t('红糖', 'Brown sugar'), t('龙眼蜜', 'Longan honey')],
    flavours: ['warm', 'fruity'],
    moments: ['evening', 'anytime'],
    sweetness: 'sweet',
    ingredients: [
      { name: t('红枣片', 'Jujube slices'), plantId: 'da-zao', origin: t('中国新疆', 'Xinjiang, China'), percent: 50 },
      { name: t('干姜片', 'Dried ginger'), plantId: 'sheng-jiang', origin: t('中国山东', 'Shandong, China'), percent: 30 },
      { name: t('桂圆肉', 'Dried longan'), plantId: 'long-yan', origin: t('中国广东', 'Guangdong, China'), percent: 20 },
    ],
    grams: 60,
    price: 10.5,
    brew: { grams: 5, ml: 300, tempC: 100, minutes: 8 },
    color: '#a2542b',
  },
  {
    id: 'honeysuckle-mint',
    name: t('金银花薄荷', 'Honeysuckle & Mint'),
    tagline: t('夏日冷泡之选', 'Made for summer cold brew'),
    description: t(
      '金银花淡雅的蜜香与薄荷的清凉相互衬托，加少许菊花增加圆润感。热泡清新，冷泡更爽口。',
      'Delicate honeysuckle nectar against cool mint, rounded out with a little chrysanthemum. Fresh when hot, even better cold-brewed.',
    ),
    notes: [t('花蜜', 'Nectar'), t('薄荷', 'Mint'), t('青草', 'Green herbs')],
    flavours: ['fresh', 'floral'],
    moments: ['morning', 'anytime'],
    sweetness: 'none',
    ingredients: [
      { name: t('金银花', 'Honeysuckle flowers'), plantId: 'honeysuckle', origin: t('中国山东', 'Shandong, China'), percent: 45 },
      { name: t('薄荷叶', 'Peppermint leaf'), plantId: 'bo-he', origin: t('欧盟', 'EU'), percent: 35 },
      { name: t('杭白菊', 'Chrysanthemum flowers'), plantId: 'chrysanthemum', origin: t('中国浙江', 'Zhejiang, China'), percent: 20 },
    ],
    grams: 40,
    price: 10.5,
    brew: { grams: 2, ml: 250, tempC: 90, minutes: 4 },
    color: '#4f8f8a',
  },
  {
    id: 'chrysanthemum-goji',
    name: t('金菊枸杞', 'Chrysanthemum & Goji'),
    tagline: t('中国家庭最经典的一杯花茶', 'China’s best-loved everyday flower tea'),
    description: t(
      '浙江桐乡的胎菊与宁夏中宁的枸杞，两样最常见的药食同源食材，组成一杯清甜、金黄的经典花茶。',
      'Young chrysanthemum buds from Tongxiang and goji from Zhongning: two of China’s most familiar food-medicine ingredients in a sweet, golden classic.',
    ),
    notes: [t('洋甘菊般花香', 'Chamomile-like'), t('蜂蜜', 'Honey'), t('红枣', 'Red fruit')],
    flavours: ['floral', 'fruity'],
    moments: ['morning', 'afterMeal', 'anytime'],
    sweetness: 'sweet',
    ingredients: [
      { name: t('胎菊', 'Chrysanthemum buds'), plantId: 'chrysanthemum', origin: t('中国浙江', 'Zhejiang, China'), percent: 60 },
      { name: t('枸杞', 'Goji berries'), plantId: 'goji', origin: t('中国宁夏', 'Ningxia, China'), percent: 40 },
    ],
    grams: 40,
    price: 9.5,
    brew: { grams: 3, ml: 300, tempC: 90, minutes: 5 },
    color: '#c9a227',
  },
  {
    id: 'after-dinner-hawthorn',
    name: t('山楂饭后茶', 'After-Dinner Hawthorn'),
    tagline: t('酸甜开胃，像一杯无糖的酸梅汤', 'Sweet-sour, like a sugar-free sour plum drink'),
    description: t(
      '山楂片的酸甜、陈皮的柑橘香，加上洛神花的玫红色泽与莓果酸味。热饮冷饮皆宜，可按口味加蜂蜜。',
      'Tangy hawthorn, citrus peel and ruby hibiscus with a berry tartness. Lovely hot or iced; add honey to taste.',
    ),
    notes: [t('山楂', 'Haw'), t('蔓越莓', 'Cranberry'), t('柑橘', 'Citrus')],
    flavours: ['fruity'],
    moments: ['afterMeal'],
    sweetness: 'tangy',
    ingredients: [
      { name: t('山楂片', 'Hawthorn slices'), plantId: 'shan-zha', origin: t('中国山东', 'Shandong, China'), percent: 50 },
      { name: t('洛神花', 'Hibiscus calyces'), origin: t('欧盟进口', 'Imported via EU'), percent: 30 },
      { name: t('陈皮', 'Aged mandarin peel'), plantId: 'chen-pi', origin: t('中国广东', 'Guangdong, China'), percent: 20 },
    ],
    grams: 60,
    price: 9.5,
    brew: { grams: 4, ml: 300, tempC: 100, minutes: 6 },
    color: '#b3452f',
  },
  {
    id: 'roasted-barley',
    name: t('烘焙大麦茶', 'Roasted Barley'),
    tagline: t('东亚餐桌上的“谷物咖啡”', 'East Asia’s “grain coffee”'),
    description: t(
      '深度烘焙的大麦，带有烤面包、可可般的香气，零咖啡因、零糖。爱尔兰的大麦酿出了威士忌，也能泡出一杯好茶。',
      'Deep-roasted barley with notes of toast and cocoa, with no caffeine and no sugar. Irish barley makes whiskey; it makes a good cup of tea too.',
    ),
    notes: [t('烤面包', 'Toast'), t('可可', 'Cocoa'), t('坚果', 'Nutty')],
    flavours: ['toasty'],
    moments: ['afterMeal', 'evening', 'anytime'],
    sweetness: 'none',
    ingredients: [{ name: t('烘焙大麦', 'Roasted barley'), plantId: 'mai-ya', origin: t('欧盟', 'EU'), percent: 100 }],
    grams: 100,
    price: 8.5,
    brew: { grams: 5, ml: 400, tempC: 100, minutes: 5 },
    color: '#6b4a2f',
  },
  {
    id: 'discovery-box',
    name: t('试饮礼盒', 'Discovery Box'),
    tagline: t('6 款各 10 克，附双语冲泡卡', 'Six blends, 10 g each, with a bilingual brewing card'),
    description: t(
      '还没决定喜欢哪一款？礼盒包含两岛特调、桂花陈皮、玫瑰红枣、姜枣暖饮、金菊枸杞和山楂饭后茶，每款可冲泡 3–5 杯。适合送礼。',
      'Not sure where to start? Two Islands, Osmanthus & Citrus Peel, Rose & Red Date, Ginger & Jujube, Chrysanthemum & Goji and After-Dinner Hawthorn, 3–5 cups of each. Made for gifting.',
    ),
    notes: [t('6 种风味', 'Six flavours'), t('适合送礼', 'Gift-ready')],
    flavours: ['floral', 'fruity', 'warm', 'toasty', 'fresh'],
    moments: ['anytime'],
    sweetness: 'sweet',
    ingredients: [],
    grams: 60,
    price: 19.5,
    brew: { grams: 3, ml: 250, tempC: 95, minutes: 5 },
    color: '#1f4d3a',
    box: true,
  },
]

const byId = new Map(products.map((p) => [p.id, p]))
export const getProduct = (id: string) => byId.get(id)
