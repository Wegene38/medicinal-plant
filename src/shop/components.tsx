import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { PlantImage } from '../components/PlantImage'
import { getPlant } from '../data'
import { useLang } from '../i18n'
import { paymentLinkFor, shopConfig } from './config'
import type { Product } from './products'

/** Illustrated tea pouch: brand band, product name and photos of the botanicals. */
export function ProductPack({ product, large }: { product: Product; large?: boolean }) {
  const { l, t } = useLang()
  const plants = product.ingredients.flatMap((i) => (i.plantId ? [getPlant(i.plantId)!] : [])).slice(0, 3)
  return (
    <div className={`pack ${large ? 'pack--large' : ''}`} style={{ '--pack': product.color } as CSSProperties}>
      <div className="pack__band">
        <span>Medicinal Plant</span>
        {product.signature && <span className="pack__badge">{t('signature')}</span>}
      </div>
      <div className="pack__body">
        <div className="pack__botanicals" aria-hidden>
          {product.box ? (
            <span className="pack__box-icon">🎁</span>
          ) : (
            plants.map((p) => (
              <div key={p.id} className="pack__botanical">
                <PlantImage plant={p} />
              </div>
            ))
          )}
        </div>
        <strong className="pack__name">{l(product.name)}</strong>
        <span className="pack__weight">{product.grams} g</span>
      </div>
    </div>
  )
}

export function BuyButton({ product }: { product: Product }) {
  const { t, l } = useLang()
  const link = paymentLinkFor(product.id)
  if (link) {
    return (
      <a className="btn btn--primary btn--large" href={link} rel="noopener">
        {t('buyNow')}
      </a>
    )
  }
  const email = shopConfig.contactEmail
  return (
    <div className="buy-pending">
      <button className="btn btn--large" disabled>
        {t('comingSoon')}
      </button>
      {email && (
        <a
          className="btn btn--ghost"
          href={`mailto:${email}?subject=${encodeURIComponent(`Notify me: ${l(product.name)}`)}`}
        >
          ✉️ {t('notifyMe')}
        </a>
      )}
    </div>
  )
}

/** Countdown timer for steeping, with a chime and vibration when done. */
export function BrewTimer({ product }: { product: Product }) {
  const { t } = useLang()
  const total = product.brew.minutes * 60
  const [left, setLeft] = useState(total)
  const [running, setRunning] = useState(false)
  const done = left === 0
  const endAt = useRef(0)

  useEffect(() => {
    if (!running) return
    // Count down against a fixed end time so a throttled background tab stays accurate.
    const id = window.setInterval(() => {
      const remaining = Math.max(0, Math.round((endAt.current - Date.now()) / 1000))
      setLeft(remaining)
      if (remaining === 0) {
        window.clearInterval(id)
        setRunning(false)
        chime()
        navigator.vibrate?.([200, 100, 200])
      }
    }, 250)
    return () => window.clearInterval(id)
  }, [running])

  const toggle = () => {
    if (!running) endAt.current = Date.now() + left * 1000
    setRunning(!running)
  }

  const mm = String(Math.floor(left / 60)).padStart(2, '0')
  const ss = String(left % 60).padStart(2, '0')
  const progress = 1 - left / total

  return (
    <div className="timer">
      <div className="timer__dial" style={{ '--p': progress } as CSSProperties} role="timer" aria-live="polite">
        <span>{done ? '🍵' : `${mm}:${ss}`}</span>
      </div>
      {done && <p className="timer__done">{t('brewDone')}</p>}
      <div className="timer__actions">
        {!done && (
          <button className="btn btn--primary" onClick={toggle}>
            {running ? t('brewPause') : t('brewStart')}
          </button>
        )}
        <button
          className="btn"
          onClick={() => {
            setRunning(false)
            setLeft(total)
          }}
        >
          {t('brewReset')}
        </button>
      </div>
    </div>
  )
}

function chime() {
  try {
    const ctx = new AudioContext()
    ;[0, 0.25].forEach((delay, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.frequency.value = i ? 1046 : 784
      gain.gain.setValueAtTime(0.2, ctx.currentTime + delay)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.6)
      osc.connect(gain).connect(ctx.destination)
      osc.start(ctx.currentTime + delay)
      osc.stop(ctx.currentTime + delay + 0.6)
    })
  } catch {
    // audio unavailable; vibration and the on-screen message still signal completion
  }
}
