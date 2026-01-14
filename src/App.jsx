import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar.jsx'
import Footer from './components/footer/Footer.jsx'
import Home from './pages/Home.jsx'
import Ideal from './pages/Ideal.jsx'
import Values from './pages/Values.jsx'
import Quiz from './pages/Quiz.jsx'
function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tu-tuong-hcm" element={<Ideal />} />
            <Route path="/gia-tri-vai-tro" element={<Values />} />
            <Route path="/quiz" element={<Quiz />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App