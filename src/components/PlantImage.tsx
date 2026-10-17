import { useState } from 'react'
import images from '../data/images.json'
import type { Plant } from '../data/types'

interface ImageMeta {
  src: string
  page: string
  artist: string
  license: string
}

const meta = images as Record<string, ImageMeta>

export const imageFor = (id: string): ImageMeta | undefined => meta[id]

export function PlantImage({ plant, className, eager }: { plant: Plant; className?: string; eager?: boolean }) {
  const info = meta[plant.id]
  const [failed, setFailed] = useState(false)
  if (!info || failed) {
    return (
      <div className={`plant-img plant-img--fallback ${className ?? ''}`} aria-hidden>
        🌿
      </div>
    )
  }
  return (
    <img
      className={`plant-img ${className ?? ''}`}
      src={import.meta.env.BASE_URL + info.src}
      alt={plant.latin}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}
