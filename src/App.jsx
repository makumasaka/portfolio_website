import { BrowserRouter, Routes, Route, Outlet, useLocation, useParams } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { computeRoute } from '@vercel/analytics'
import Landing from './components/Landing'
import CaseStudy from './components/CaseStudy'
import './styles/style.css'

function RouteAnalytics() {
  const { pathname, search } = useLocation()
  const params = useParams()

  return (
    <Analytics
      route={computeRoute(pathname, params)}
      path={`${pathname}${search}`}
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
