import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Case1 from './pages/case1'
import Case2 from './pages/case2'
import Case3 from './pages/case3'
import Case4 from './pages/case4'

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Case1 />} />
        <Route path="/case2" element={<Case2 />} />
        <Route path="/case3" element={<Case3 />} />
        <Route path="/case4" element={<Case4 />} />
      </Routes>
    </Router>
  )
}

export default App
