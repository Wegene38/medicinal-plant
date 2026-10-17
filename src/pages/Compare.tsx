import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { PlantImage } from '../components/PlantImage'
import { comparisons, getPlant } from '../data'
import type { Plant } from '../data/types'
import { useLang } from '../i18n'
import { regionFlag, regionLabel } from '../i18n/strings'

export function Compare() {
  const { t, l } = useLang()
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [hash])

  return (
    <>
      <section className="page-head">
        <h1>⚖️ {t('compareTitle')}</h1>
        <p>{t('compareIntro')}</p>
      </section>

      <div className="compare-list">
        {comparisons.map((c) => {
          const cn = getPlant(c.china)!
          const ie = getPlant(c.ireland)!
          return (
            <article key={c.id} id={c.id} className={`compare ${hash === `#${c.id}` ? 'is-target' : ''}`}>
              <h2>{l(c.title)}</h2>
              <div className="compare__pair">
                <Side plant={cn} />
                <span className="compare__vs">vs</span>
                <Side plant={ie} />
              </div>
              <div className="compare__notes">
                <div>
                  <h3>🤝 {t('similarities')}</h3>
                  <p>{l(c.similarities)}</p>
                </div>
                <div>
                  <h3>🔀 {t('differences')}</h3>
                  <p>{l(c.differences)}</p>
                </div>
              </div>
              <table className="compare__table">
                <thead>
                  <tr>
                    <th />
                    <th>
                      {regionFlag.china} {l(regionLabel.china)}
                    </th>
                    <th>
                      {regionFlag.ireland} {l(regionLabel.ireland)}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>{t('partsUsed')}</th>
                    <td>{l(cn.medicinal.parts)}</td>
                    <td>{l(ie.medicinal.parts)}</td>
                  </tr>
                  <tr>
                    <th>{t('soil')}</th>
                    <td>{l(cn.habitat.soil)}</td>
                    <td>{l(ie.habitat.soil)}</td>
                  </tr>
                  <tr>
                    <th>{t('mainUses')}</th>
                    <td>{l(cn.medicinal.uses[0])}</td>
                    <td>{l(ie.medicinal.uses[0])}</td>
                  </tr>
                </tbody>
              </table>
            </article>
          )
        })}
      </div>
    </>
  )
}

function Side({ plant }: { plant: Plant }) {
  const { l } = useLang()
  return (
    <Link to={`/plant/${plant.id}`} className={`compare__side compare__side--${plant.region}`}>
      <PlantImage plant={plant} />
      <span className="compare__label">
        {regionFlag[plant.region]} {l(plant.name)}
        <i>{plant.latin}</i>
      </span>
    </Link>
  )
}
