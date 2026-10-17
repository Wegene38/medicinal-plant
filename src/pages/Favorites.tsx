import { PlantCard } from '../components/PlantCard'
import { getPlant } from '../data'
import { useFavorites } from '../favorites'
import { useLang } from '../i18n'

export function Favorites() {
  const { t } = useLang()
  const { favorites } = useFavorites()
  const saved = favorites.map(getPlant).filter((p) => p !== undefined)

  return (
    <>
      <section className="page-head">
        <h1>♡ {t('navFavorites')}</h1>
      </section>
      {saved.length ? (
        <div className="grid">
          {saved.map((p) => (
            <PlantCard key={p.id} plant={p} />
          ))}
        </div>
      ) : (
        <p className="empty">{t('favoritesEmpty')}</p>
      )}
    </>
  )
}
