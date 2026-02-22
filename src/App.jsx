import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
    </BrowserRouter>
  )
}

export default App
