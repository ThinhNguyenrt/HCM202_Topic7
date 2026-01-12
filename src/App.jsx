import Navbar from './components/navbar/Navbar.jsx'
import Footer from './components/footer/Footer.jsx'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Nội dung trang sẽ được thêm vào đây */}
      </main>
      <Footer />
    </div>
  )
}

export default App