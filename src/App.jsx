import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Landing from './components/Landing'
import CaseStudy from './components/CaseStudy'
import './styles/style.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/project/:id" element={<CaseStudy />} />
      </Routes>
      <Analytics />
    </BrowserRouter>
  )
}

export default App
