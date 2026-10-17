import { useState } from 'react'
import { LazyPlantMap as PlantMap } from '../components/LazyPlantMap'
import { plants } from '../data'
import type { Region } from '../data/types'
import { useLang } from '../i18n'
import { regionFlag, regionLabel } from '../i18n/strings'

export function MapPage() {
  const { t, l } = useLang()
  const [region, setRegion] = useState<Region>('china')
  const [selected, setSelected] = useState<string | null>(null)
  const regionPlants = plants.filter((p) => p.region === region)
  const shown = selected ? regionPlants.filter((p) => p.id === selected) : regionPlants

  return (
    <>
      <section className="page-head">
        <h1>🗺️ {t('mapTitle')}</h1>
        <p>{t('mapIntro')}</p>
      </section>
      <div className="segmented">
        {(['china', 'ireland'] as Region[]).map((r) => (
          <button
            key={r}
            className={region === r ? 'is-active' : ''}
            onClick={() => {
              setRegion(r)
              setSelected(null)
            }}
          >
            {regionFlag[r]} {l(regionLabel[r])}
          </button>
        ))}
      </div>
      <div className="chips chips--scroll map-chips">
        <button className={`chip ${!selected ? 'is-active' : ''}`} onClick={() => setSelected(null)}>
          {t('all')}
        </button>
        {regionPlants.map((p) => (
          <button
            key={p.id}
            className={`chip ${selected === p.id ? 'is-active' : ''}`}
            onClick={() => setSelected(selected === p.id ? null : p.id)}
          >
            {l(p.name)}
          </button>
        ))}
      </div>
      <PlantMap plants={shown} height={520} />
      <p className="hint">{t('mapOffline')}</p>
    </>
  )
}
