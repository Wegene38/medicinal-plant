import { useCallback, useSyncExternalStore } from 'react'

const KEY = 'mp.favorites'
const listeners = new Set<() => void>()

function read(): string[] {
  try {
    const raw = localStorage.getItem(KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string') : []
  } catch {
    return []
  }
}

let snapshot = read()

function write(next: string[]) {
  snapshot = next
  try {
    localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    // storage unavailable: favourites last for this session only
  }
  listeners.forEach((fn) => fn())
}

function subscribe(fn: () => void) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export function useFavorites() {
  const favorites = useSyncExternalStore(subscribe, () => snapshot)
  const toggle = useCallback((id: string) => {
    write(snapshot.includes(id) ? snapshot.filter((x) => x !== id) : [...snapshot, id])
  }, [])
  return { favorites, toggle, isFavorite: (id: string) => favorites.includes(id) }
}
