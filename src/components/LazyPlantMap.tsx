import { lazy, Suspense, type ComponentProps } from 'react'

// Leaflet is the heaviest dependency, so only load it when a map is shown.
const PlantMap = lazy(() => import('./PlantMap').then((m) => ({ default: m.PlantMap })))

export function LazyPlantMap(props: ComponentProps<typeof PlantMap>) {
  return (
    <Suspense fallback={<div className="map" style={{ height: props.height ?? 420 }} />}>
      <PlantMap {...props} />
    </Suspense>
  )
}
