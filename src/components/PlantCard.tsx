import { Link } from 'react-router-dom'
import type { Plant } from '../data/types'
import { useLang } from '../i18n'
import { categoryLabel, regionFlag } from '../i18n/strings'
import { PlantImage } from './PlantImage'
import { ToxicityBadge } from './ToxicityBadge'

export function PlantCard({ plant }: { plant: Plant }) {
  const { l, lang } = useLang()
  const secondary = lang === 'zh' ? plant.name.en : plant.name.zh
  return (
    <Link to={`/plant/${plant.id}`} className={`card card--${plant.region}`}>
      <div className="card__media">
        <PlantImage plant={plant} />
        <span className="card__flag" aria-hidden>
          {regionFlag[plant.region]}
        </span>
        {plant.toxicity !== 'safe' && <ToxicityBadge level={plant.toxicity} compact />}
      </div>
      <div className="card__body">
        <h3 className="card__title">{l(plant.name)}</h3>
        <p className="card__sub">
          {secondary} · <i>{plant.latin}</i>
        </p>
        <div className="chips">
          {plant.categories.slice(0, 3).map((c) => (
            <span key={c} className="chip chip--small">
              {l(categoryLabel[c])}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
