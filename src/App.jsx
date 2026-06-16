import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Outlet, useLocation, useParams } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { computeRoute } from '@vercel/analytics'
import Landing from './components/Landing'
import CaseStudy from './components/CaseStudy'
import { trackPageView } from './utils/googleAnalytics'
import './styles/style.css'

function RouteAnalytics() {
  const { pathname, search } = useLocation()
  const params = useParams()
  const path = `${pathname}${search}`

  useEffect(() => {
    trackPageView(path)
  }, [path])

  return (
    <Analytics
      route={computeRoute(pathname, params)}
      path={path}
    />
  )
}

function AppShell() {
  return (
    <>
      <Outlet />
      <RouteAnalytics />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Landing />} />
          <Route path="/project/:id" element={<CaseStudy />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
