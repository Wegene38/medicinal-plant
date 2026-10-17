import type { Plant } from '../data/types'
import { useLang } from '../i18n'
import { monthShort, stageIcon, stageLabel } from '../i18n/strings'

/** Stage timeline plus a 12-month phenology calendar. */
export function GrowthCycle({ plant }: { plant: Plant }) {
  const { l, t, lang } = useLang()
  const now = new Date().getMonth() + 1
  const rows = [
    ...plant.growth.map((s) => ({ key: s.key, label: l(stageLabel[s.key]), icon: stageIcon[s.key], months: s.months })),
    ...(plant.harvest.length ? [{ key: 'harvest', label: t('harvestTime'), icon: '🧺', months: plant.harvest }] : []),
  ]

  return (
    <div className="growth">
      <ol className="timeline">
        {plant.growth.map((stage, i) => (
          <li key={i} className={`timeline__step timeline__step--${stage.key}`}>
            <span className="timeline__icon" aria-hidden>
              {stageIcon[stage.key]}
            </span>
            <div>
              <div className="timeline__head">
                <strong>{l(stageLabel[stage.key])}</strong>
                <span className="timeline__months">{formatMonths(stage.months, lang)}</span>
              </div>
              <p>{l(stage.text)}</p>
            </div>
          </li>
        ))}
      </ol>

      <h4 className="growth__subtitle">{t('growthCalendar')}</h4>
      <div className="calendar" role="table" aria-label={t('growthCalendar')}>
        <div className="calendar__row calendar__row--head" role="row">
          <span className="calendar__label" />
          {monthShort.map((m, i) => (
            <span key={i} className={`calendar__month ${i + 1 === now ? 'is-now' : ''}`} role="columnheader">
              {l(m)}
            </span>
          ))}
        </div>
        {rows.map((row) => (
          <div key={row.key} className="calendar__row" role="row">
            <span className="calendar__label" role="rowheader">
              <span aria-hidden>{row.icon}</span> {row.label}
            </span>
            {Array.from({ length: 12 }, (_, i) => (
              <span
                key={i}
                role="cell"
                className={`calendar__cell ${row.months.includes(i + 1) ? `on on--${row.key}` : ''} ${i + 1 === now ? 'is-now' : ''}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/** Turns [11,12,1,2] into "11–2月" / "Nov–Feb", splitting non-contiguous runs. */
export function formatMonths(months: number[], lang: 'zh' | 'en') {
  if (!months.length) return ''
  const names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const name = (m: number) => (lang === 'zh' ? `${m}` : names[m - 1])
  // Build runs in the order given, treating Dec→Jan as contiguous.
  const runs: number[][] = []
  for (const m of months) {
    const last = runs.at(-1)
    if (last && (last.at(-1)! % 12) + 1 === m) last.push(m)
    else runs.push([m])
  }
  const text = runs.map((r) => (r.length === 1 ? name(r[0]) : `${name(r[0])}–${name(r.at(-1)!)}`)).join(lang === 'zh' ? '、' : ', ')
  return lang === 'zh' ? `${text}月` : text
}
