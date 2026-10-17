import 'leaflet/dist/leaflet.css'
import { latLngBounds } from 'leaflet'
import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet'
import { Link } from 'react-router-dom'
import type { Plant } from '../data/types'
import { useLang } from '../i18n'

const regionColor = { china: '#c0392b', ireland: '#169b62' }

export function PlantMap({ plants, height = 420 }: { plants: Plant[]; height?: number }) {
  const { l } = useLang()
  const points = plants.flatMap((p) => p.locations.map((loc) => ({ plant: p, loc })))
  if (!points.length) return null
  const bounds = latLngBounds(points.map(({ loc }) => [loc.lat, loc.lng]))

  return (
    <div className="map" style={{ height }}>
      <MapContainer
        // Remount when the set of plants changes so the map re-fits its bounds.
        key={plants.map((p) => p.id).join()}
        bounds={bounds.pad(0.25)}
        maxZoom={plants.length === 1 ? 8 : 10}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {points.map(({ plant, loc }, i) => (
          <CircleMarker
            key={i}
            center={[loc.lat, loc.lng]}
            radius={8}
            pathOptions={{ color: '#fff', weight: 2, fillColor: regionColor[plant.region], fillOpacity: 0.9 }}
          >
            <Popup>
              <strong>{l(plant.name)}</strong>
              <br />
              <i>{plant.latin}</i>
              <br />
              {l(loc.name)}
              {plants.length > 1 && (
                <>
                  <br />
                  <Link to={`/plant/${plant.id}`}>→ {l({ zh: '查看详情', en: 'Details' })}</Link>
                </>
              )}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  )
}
