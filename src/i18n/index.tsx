import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { L10n, Lang } from '../data/types'
import { ui, type UiKey } from './strings'

interface LangContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  /** Translate a UI string key. */
  t: (key: UiKey) => string
  /** Pick the current language from a bilingual value. */
  l: (value: L10n) => string
}

const LangContext = createContext<LangContextValue | null>(null)

const STORAGE_KEY = 'mp.lang'

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'zh' || saved === 'en') return saved
  } catch {
    // storage unavailable; fall through to browser language
  }
  return navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
    document.title = ui.appName[lang]
  }, [lang])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // ignore
    }
  }, [])

  const value = useMemo<LangContextValue>(
    () => ({ lang, setLang, t: (key) => ui[key][lang], l: (v) => v[lang] }),
    [lang, setLang],
  )
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside LangProvider')
  return ctx
}
