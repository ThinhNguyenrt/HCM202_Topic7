import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar.jsx'
import Footer from './components/footer/Footer.jsx'
import Home from './pages/Home.jsx'
import Ideal from './pages/Ideal.jsx'
import Values from './pages/Values.jsx'
import Quiz from './pages/Quiz.jsx'
import AIUsage from './pages/AIUsage.jsx'
import Success from './pages/Success.jsx'
import Results from './pages/Results.jsx'
import Leaderboard from './pages/Leaderboard.jsx'
import Statistics from './pages/Statistics.jsx'
import MiniGame from './pages/MiniGame/MiniGame.jsx'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dai-doan-ket" element={<Ideal />} />
            <Route path="/gia-tri-vai-tro" element={<Values />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/minigame" element={<MiniGame />} />
            <Route path="/ai-usage" element={<AIUsage />} />
            <Route path="/success" element={<Success />} />
            <Route path="/results" element={<Results />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/statistics" element={<Statistics />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App