import { Link, useNavigate, useParams } from 'react-router-dom'
import { GrowthCycle } from '../components/GrowthCycle'
import { LazyPlantMap as PlantMap } from '../components/LazyPlantMap'
import { imageFor, PlantImage } from '../components/PlantImage'
import { ToxicityBadge } from '../components/ToxicityBadge'
import { getComparisonFor, getPlant } from '../data'
import { useFavorites } from '../favorites'
import { useLang } from '../i18n'
import { categoryLabel, regionFlag, regionLabel } from '../i18n/strings'

export function PlantDetail() {
  const { id = '' } = useParams()
  const plant = getPlant(id)
  const { t, l, lang } = useLang()
  const { isFavorite, toggle } = useFavorites()
  const navigate = useNavigate()

  if (!plant) {
    return (
      <p className="empty">
        {t('noResults')} <Link to="/">{t('back')}</Link>
      </p>
    )
  }

  const comparison = getComparisonFor(plant.id)
  const credit = imageFor(plant.id)
  const fav = isFavorite(plant.id)

  return (
    <article className={`detail detail--${plant.region}`}>
      <button className="back" onClick={() => (history.length > 1 ? navigate(-1) : navigate('/'))}>
        ← {t('back')}
      </button>

      <header className="detail__hero">
        <figure className="detail__figure">
          <PlantImage plant={plant} eager />
          {credit && (
            <figcaption>
              {t('photoCredit')}:{' '}
              <a href={credit.page} target="_blank" rel="noreferrer">
                {credit.artist}
              </a>{' '}
              · {credit.license}
            </figcaption>
          )}
        </figure>
        <div className="detail__intro">
          <p className="detail__region">
            {regionFlag[plant.region]} {l(regionLabel[plant.region])}
          </p>
          <h1>{l(plant.name)}</h1>
          <p className="detail__alt">
            {lang === 'zh' ? plant.name.en : plant.name.zh} · <i>{plant.latin}</i>
          </p>
          <dl className="facts">
            <div>
              <dt>{t('family')}</dt>
              <dd>{l(plant.family)}</dd>
            </div>
            <div>
              <dt>{t('lifeForm')}</dt>
              <dd>{l(plant.lifeForm)}</dd>
            </div>
            {plant.drugName && (
              <div>
                <dt>{t('drugName')}</dt>
                <dd>{plant.drugName}</dd>
              </div>
            )}
            {plant.irish && (
              <div>
                <dt>{t('irishName')}</dt>
                <dd lang="ga">{plant.irish}</dd>
              </div>
            )}
          </dl>
          <div className="chips">
            <ToxicityBadge level={plant.toxicity} />
            {plant.categories.map((c) => (
              <span key={c} className="chip chip--small">
                {l(categoryLabel[c])}
              </span>
            ))}
          </div>
          <div className="detail__actions">
            <button className={`btn ${fav ? 'btn--active' : ''}`} onClick={() => toggle(plant.id)} aria-pressed={fav}>
              {fav ? '♥' : '♡'} {fav ? t('saved') : t('save')}
            </button>
            {comparison && (
              <Link className="btn btn--ghost" to={`/compare#${comparison.id}`}>
                ⚖️ {t('comparePair')}
              </Link>
            )}
          </div>
        </div>
      </header>

      <p className="detail__summary">{l(plant.summary)}</p>

      {plant.toxicity === 'toxic' && <div className="alert alert--danger">☠ {l(plant.cautions)}</div>}

      <section className="section">
        <h2>🌍 {t('habitat')}</h2>
        <dl className="info-list">
          <dt>{t('climate')}</dt>
          <dd>{l(plant.habitat.climate)}</dd>
          <dt>{t('soil')}</dt>
          <dd>{l(plant.habitat.soil)}</dd>
          <dt>{t('distribution')}</dt>
          <dd>{l(plant.habitat.distribution)}</dd>
        </dl>
      </section>

      <section className="section">
        <h2>🌱 {t('growth')}</h2>
        <GrowthCycle plant={plant} />
      </section>

      <section className="section">
        <h2>💊 {t('medicinal')}</h2>
        <dl className="info-list">
          <dt>{t('partsUsed')}</dt>
          <dd>{l(plant.medicinal.parts)}</dd>
          <dt>{plant.region === 'china' ? t('propertiesChina') : t('propertiesIreland')}</dt>
          <dd>{l(plant.medicinal.properties)}</dd>
          <dt>{t('mainUses')}</dt>
          <dd>
            <ul className="bullets">
              {plant.medicinal.uses.map((u, i) => (
                <li key={i}>{l(u)}</li>
              ))}
            </ul>
          </dd>
        </dl>
      </section>

      <section className="section">
        <h2>🍵 {t('usage')}</h2>
        <div className="usage">
          {plant.usage.map((u, i) => (
            <div key={i} className="usage__item">
              <h3>{l(u.method)}</h3>
              <p>{l(u.detail)}</p>
            </div>
          ))}
        </div>
      </section>

      {plant.toxicity !== 'toxic' && (
        <section className="section">
          <h2>⚠️ {t('cautions')}</h2>
          <div className="alert alert--warn">{l(plant.cautions)}</div>
        </section>
      )}

      <section className="section">
        <h2>🗺️ {t('whereItGrows')}</h2>
        <PlantMap plants={[plant]} height={300} />
      </section>
    </article>
  )
}
