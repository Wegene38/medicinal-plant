import { HashRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { LangProvider } from './i18n'
import { About } from './pages/About'
import { Compare } from './pages/Compare'
import { Favorites } from './pages/Favorites'
import { Home } from './pages/Home'
import { MapPage } from './pages/MapPage'
import { PlantDetail } from './pages/PlantDetail'
import { Quiz } from './pages/Quiz'

export default function App() {
  return (
    <LangProvider>
      {/* Hash routing keeps deep links working on any static host. */}
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="plant/:id" element={<PlantDetail />} />
            <Route path="compare" element={<Compare />} />
            <Route path="map" element={<MapPage />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </HashRouter>
    </LangProvider>
  )
}
