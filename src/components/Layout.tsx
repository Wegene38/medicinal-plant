import { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useLang } from '../i18n'
import type { UiKey } from '../i18n/strings'

type NavItem = { to: string; key: UiKey; icon: string }

const tabs: NavItem[] = [
  { to: '/', key: 'navHome', icon: '🌿' },
  { to: '/shop', key: 'navShop', icon: '🍵' },
  { to: '/compare', key: 'navCompare', icon: '⚖️' },
  { to: '/quiz', key: 'navQuiz', icon: '❓' },
  { to: '/favorites', key: 'navFavorites', icon: '♡' },
]

const topLinks: NavItem[] = [
  { to: '/', key: 'navHome', icon: '🌿' },
  { to: '/shop', key: 'navShop', icon: '🍵' },
  { to: '/compare', key: 'navCompare', icon: '⚖️' },
  { to: '/map', key: 'navMap', icon: '🗺️' },
  { to: '/quiz', key: 'navQuiz', icon: '❓' },
  { to: '/favorites', key: 'navFavorites', icon: '♡' },
  { to: '/about', key: 'navAbout', icon: 'ℹ️' },
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
          {topLinks.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === '/'}>
              {t(n.key)}
            </NavLink>
          ))}
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
          <Link to="/about">{t('navAbout')}</Link> · <Link to="/map">{t('navMap')}</Link> ·{' '}
          <Link to="/shop/delivery">{t('shippingTitle')}</Link>
        </p>
      </footer>

      <nav className="tabbar" aria-label="Main">
        {tabs.map((n) => (
          <NavLink key={n.to} to={n.to} end={n.to === '/'}>
            <span aria-hidden>{n.icon}</span>
            <small>{t(n.key)}</small>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
