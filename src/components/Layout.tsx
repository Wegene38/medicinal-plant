import { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useLang } from '../i18n'
import type { UiKey } from '../i18n/strings'

const nav: { to: string; key: UiKey; icon: string }[] = [
  { to: '/', key: 'navHome', icon: '🌿' },
  { to: '/compare', key: 'navCompare', icon: '⚖️' },
  { to: '/map', key: 'navMap', icon: '🗺️' },
  { to: '/quiz', key: 'navQuiz', icon: '❓' },
  { to: '/favorites', key: 'navFavorites', icon: '♡' },
]

export function Layout() {
  const { t, lang, setLang } = useLang()
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="app">
      <header className="topbar">
        <Link to="/" className="brand">
          <img src={`${import.meta.env.BASE_URL}icon.svg`} alt="" width={32} height={32} />
          <span>{t('appName')}</span>
        </Link>
        <nav className="topnav" aria-label="Main">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === '/'}>
              {t(n.key)}
            </NavLink>
          ))}
          <NavLink to="/about">{t('navAbout')}</NavLink>
        </nav>
        <button className="lang-toggle" onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}>
          {t('language')}
        </button>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">
        <p>{t('disclaimerShort')}</p>
        <p>
          <Link to="/about">{t('navAbout')}</Link>
        </p>
      </footer>

      <nav className="tabbar" aria-label="Main">
        {nav.map((n) => (
          <NavLink key={n.to} to={n.to} end={n.to === '/'}>
            <span aria-hidden>{n.icon}</span>
            <small>{t(n.key)}</small>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
