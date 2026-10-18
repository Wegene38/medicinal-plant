import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getPlant } from '../data'
import { useLang } from '../i18n'
import type { UiKey } from '../i18n/strings'
import { formatPrice, paymentLinkFor, shopConfig } from './config'
import { BrewTimer, BuyButton, ProductPack } from './components'
import {
  flavourLabel,
  getProduct,
  momentLabel,
  products,
  type Flavour,
  type Moment,
  type Product,
  type Sweetness,
} from './products'

const shopLive = () => products.some((p) => paymentLinkFor(p.id))

export function Shop() {
  const { t, l } = useLang()
  const [moment, setMoment] = useState<Moment | null>(null)
  const shown = moment ? products.filter((p) => p.moments.includes(moment) || p.moments.includes('anytime')) : products

  return (
    <>
      <section className="page-head">
        <h1>🍵 {t('shopTitle')}</h1>
        <p>{t('shopIntro')}</p>
      </section>
      {!shopLive() && <div className="notice">{t('shopPreview')}</div>}
      <div className="shop-tools">
        <div className="chips chips--scroll">
          <button className={`chip ${!moment ? 'is-active' : ''}`} onClick={() => setMoment(null)}>
            {t('allMoments')}
          </button>
          {(['morning', 'afterMeal', 'evening'] as Moment[]).map((m) => (
            <button key={m} className={`chip ${moment === m ? 'is-active' : ''}`} onClick={() => setMoment(moment === m ? null : m)}>
              {l(momentLabel[m])}
            </button>
          ))}
        </div>
        <Link to="/shop/finder" className="btn btn--ghost">
          ✨ {t('finderCta')}
        </Link>
      </div>
      <div className="product-grid">
        {shown.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      <p className="hint">
        <Link to="/shop/delivery">{t('shippingTitle')}</Link> · {t('foodNotice')}
      </p>
    </>
  )
}

function ProductCard({ product }: { product: Product }) {
  const { l } = useLang()
  return (
    <Link to={`/shop/${product.id}`} className="product-card">
      <ProductPack product={product} />
      <div className="product-card__body">
        <h3>{l(product.name)}</h3>
        <p>{l(product.tagline)}</p>
        <div className="product-card__foot">
          <strong>{formatPrice(product.price)}</strong>
          <span>{product.grams} g</span>
        </div>
      </div>
    </Link>
  )
}

export function ProductPage() {
  const { id = '' } = useParams()
  const product = getProduct(id)
  const { t, l } = useLang()
  const navigate = useNavigate()

  if (!product) {
    return (
      <p className="empty">
        {t('noResults')} <Link to="/shop">{t('back')}</Link>
      </p>
    )
  }

  const hasBarley = product.ingredients.some((i) => i.plantId === 'mai-ya') || product.box
  const ingredientText = product.box
    ? l({ zh: '见各款茶的配料表', en: 'See each blend’s ingredient list' })
    : product.ingredients.map((i) => `${l(i.name)} ${i.percent}%`).join(l({ zh: '、', en: ', ' }))

  return (
    <article className="product">
      <button className="back" onClick={() => (history.length > 1 ? navigate(-1) : navigate('/shop'))}>
        ← {t('back')}
      </button>

      <header className="product__hero">
        <ProductPack product={product} large />
        <div>
          <h1>{l(product.name)}</h1>
          <p className="product__tagline">{l(product.tagline)}</p>
          <p className="product__price">
            {formatPrice(product.price)} <span>· {product.grams} g</span>
          </p>
          <p>{l(product.description)}</p>
          <dl className="facts">
            <div>
              <dt>{t('tastingNotes')}</dt>
              <dd>{product.notes.map(l).join(' · ')}</dd>
            </div>
            <div>
              <dt>{t('bestFor')}</dt>
              <dd>{product.moments.map((m) => l(momentLabel[m])).join(' · ')}</dd>
            </div>
          </dl>
          <BuyButton product={product} />
          <p className="hint">
            {l({
              zh: `全爱尔兰配送，运费 ${formatPrice(shopConfig.shippingFee)}，满 ${formatPrice(shopConfig.freeShippingFrom)} 包邮。`,
              en: `Delivery across Ireland: ${formatPrice(shopConfig.shippingFee)}, free over ${formatPrice(shopConfig.freeShippingFrom)}.`,
            })}{' '}
            <Link to="/shop/delivery">{t('shippingTitle')}</Link>
          </p>
        </div>
      </header>

      {!product.box && (
        <section className="section">
          <h2>🌿 {t('ingredientStory')}</h2>
          <div className="ingredients">
            {product.ingredients.map((i) => {
              const plant = i.plantId ? getPlant(i.plantId) : undefined
              const body = (
                <>
                  <span className="ingredients__pct">{i.percent}%</span>
                  <strong>{l(i.name)}</strong>
                  <small>{l(i.origin)}</small>
                </>
              )
              return plant ? (
                <Link key={l(i.name)} to={`/plant/${plant.id}`} className="ingredients__item">
                  {body}
                  <small className="ingredients__more">{plant.latin} →</small>
                </Link>
              ) : (
                <div key={l(i.name)} className="ingredients__item">
                  {body}
                </div>
              )
            })}
          </div>
        </section>
      )}

      <section className="section brew">
        <div>
          <h2>🫖 {t('brewGuide')}</h2>
          <dl className="brew__facts">
            <BrewFact label="brewAmount" value={`${product.brew.grams} g`} />
            <BrewFact label="brewWater" value={`${product.brew.ml} ml`} />
            <BrewFact label="brewTemp" value={`${product.brew.tempC} °C`} />
            <BrewFact label="brewTime" value={`${product.brew.minutes} ${t('minutes')}`} />
          </dl>
        </div>
        <div>
          <h2>⏱️ {t('brewTimer')}</h2>
          <BrewTimer product={product} />
        </div>
      </section>

      <section className="section">
        <h2>📋 {l({ zh: '食品信息', en: 'Food information' })}</h2>
        <dl className="info-list">
          <dt>{t('ingredientsTitle')}</dt>
          <dd>{ingredientText}</dd>
          <dt>{t('allergens')}</dt>
          <dd>{hasBarley ? t('allergensBarley') : t('allergensNone')}</dd>
          <dt>{t('netWeight')}</dt>
          <dd>{product.grams} g</dd>
          <dt>{t('storage')}</dt>
          <dd>{t('storageText')}</dd>
          <dt>{t('bestBefore')}</dt>
          <dd>{t('bestBeforeText')}</dd>
          <dt>{t('operator')}</dt>
          <dd>{shopConfig.businessName ? `${shopConfig.businessName}, ${shopConfig.businessAddress}` : t('operatorPending')}</dd>
        </dl>
        <p className="disclaimer">{t('foodNotice')}</p>
      </section>
    </article>
  )
}

function BrewFact({ label, value }: { label: UiKey; value: string }) {
  const { t } = useLang()
  return (
    <div>
      <dt>{t(label)}</dt>
      <dd>{value}</dd>
    </div>
  )
}

/** Three taste questions → scored product recommendation. */
export function TeaFinder() {
  const { t, l } = useLang()
  const [flavours, setFlavours] = useState<Flavour[]>([])
  const [moment, setMoment] = useState<Moment | null>(null)
  const [sweet, setSweet] = useState<Sweetness | null>(null)
  const ready = flavours.length > 0 && moment && sweet

  const ranked = ready
    ? products
        .filter((p) => !p.box)
        .map((p) => ({
          p,
          score:
            p.flavours.filter((f) => flavours.includes(f)).length * 3 +
            (p.moments.includes(moment) ? 2 : p.moments.includes('anytime') ? 1 : 0) +
            (p.sweetness === sweet ? 2 : 0) +
            (p.signature ? 0.5 : 0),
        }))
        .sort((a, b) => b.score - a.score)
    : []

  const toggleFlavour = (f: Flavour) =>
    setFlavours((cur) => (cur.includes(f) ? cur.filter((x) => x !== f) : [...cur, f]))

  const sweetOptions: [Sweetness, UiKey][] = [
    ['sweet', 'sweetSweet'],
    ['none', 'sweetNone'],
    ['tangy', 'sweetTangy'],
  ]

  return (
    <section className="finder">
      <Link to="/shop" className="back">
        ← {t('navShop')}
      </Link>
      <h1>✨ {t('finderTitle')}</h1>
      <p className="hint">{t('finderIntro')}</p>

      <h2>1. {t('finderQ1')}</h2>
      <div className="chips">
        {(Object.keys(flavourLabel) as Flavour[]).map((f) => (
          <button key={f} className={`chip chip--big ${flavours.includes(f) ? 'is-active' : ''}`} onClick={() => toggleFlavour(f)}>
            {l(flavourLabel[f])}
          </button>
        ))}
      </div>

      <h2>2. {t('finderQ2')}</h2>
      <div className="chips">
        {(Object.keys(momentLabel) as Moment[]).map((m) => (
          <button key={m} className={`chip chip--big ${moment === m ? 'is-active' : ''}`} onClick={() => setMoment(m)}>
            {l(momentLabel[m])}
          </button>
        ))}
      </div>

      <h2>3. {t('finderQ3')}</h2>
      <div className="chips">
        {sweetOptions.map(([key, label]) => (
          <button key={key} className={`chip chip--big ${sweet === key ? 'is-active' : ''}`} onClick={() => setSweet(key)}>
            {t(label)}
          </button>
        ))}
      </div>

      {ready && ranked.length > 0 && (
        <div className="finder__result">
          <p className="finder__label">{t('finderResult')}</p>
          <Link to={`/shop/${ranked[0].p.id}`} className="finder__best">
            <ProductPack product={ranked[0].p} />
            <div>
              <h3>{l(ranked[0].p.name)}</h3>
              <p>{l(ranked[0].p.tagline)}</p>
              <p className="product__price">{formatPrice(ranked[0].p.price)}</p>
              <span className="btn btn--primary">{t('viewProduct')} →</span>
            </div>
          </Link>
          <p className="finder__label">{t('finderAlso')}</p>
          <div className="finder__more">
            {ranked.slice(1, 3).map(({ p }) => (
              <Link key={p.id} to={`/shop/${p.id}`} className="chip chip--big">
                {l(p.name)} · {formatPrice(p.price)}
              </Link>
            ))}
          </div>
          <button
            className="btn btn--ghost"
            onClick={() => {
              setFlavours([])
              setMoment(null)
              setSweet(null)
            }}
          >
            {t('finderAgain')}
          </button>
        </div>
      )}
    </section>
  )
}

export function Delivery() {
  const { t, lang } = useLang()
  const fee = formatPrice(shopConfig.shippingFee)
  const free = formatPrice(shopConfig.freeShippingFrom)
  return (
    <article className="prose">
      <Link to="/shop" className="back">
        ← {t('navShop')}
      </Link>
      <h1>{t('shippingTitle')}</h1>
      {lang === 'zh' ? (
        <>
          <h2>配送</h2>
          <ul>
            <li>目前仅配送爱尔兰共和国境内，由 An Post 寄送，通常 2–3 个工作日送达。</li>
            <li>运费 {fee}；订单满 {free} 免运费。</li>
            <li>每周一和周四发货，节假日前后可能顺延。</li>
          </ul>
          <h2>付款</h2>
          <p>通过 Stripe 安全支付，支持银行卡、Apple Pay 和 Google Pay。我们不会接触或保存你的卡号。</p>
          <h2>退换</h2>
          <ul>
            <li>根据欧盟消费者权益规定，未开封的商品可在收货后 14 天内退回，退款不含运费。</li>
            <li>出于食品安全考虑，已开封的茶叶不接受无理由退货。</li>
            <li>如收到的商品破损或有质量问题，请在 7 天内联系我们并附照片，我们将补寄或全额退款。</li>
          </ul>
          <h2>食品安全</h2>
          <p>所有产品均为食品（花草茶），原料批次可追溯。产品页面列出了完整配料、过敏原、净含量和储存方法。</p>
        </>
      ) : (
        <>
          <h2>Delivery</h2>
          <ul>
            <li>We currently ship within the Republic of Ireland with An Post, usually in 2–3 working days.</li>
            <li>Shipping is {fee}, free on orders over {free}.</li>
            <li>We dispatch on Mondays and Thursdays; bank holidays may add a day.</li>
          </ul>
          <h2>Payment</h2>
          <p>Payments are handled securely by Stripe: cards, Apple Pay and Google Pay. We never see or store your card number.</p>
          <h2>Returns</h2>
          <ul>
            <li>Under EU consumer law you may return unopened items within 14 days of delivery; shipping costs are not refunded.</li>
            <li>For food-safety reasons, opened tea cannot be returned unless faulty.</li>
            <li>If something arrives damaged or faulty, contact us within 7 days with a photo and we will replace or refund it.</li>
          </ul>
          <h2>Food safety</h2>
          <p>All products are foods (herbal infusions) with traceable ingredient batches. Each product page lists ingredients, allergens, net weight and storage.</p>
        </>
      )}
    </article>
  )
}
