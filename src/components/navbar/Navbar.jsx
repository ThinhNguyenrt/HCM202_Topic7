import { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { title: 'Trang chủ', path: '/' },
    { title: 'Đại đoàn kết', path: '/dai-doan-ket' },
    { title: 'Giá trị và Vai trò', path: '/gia-tri-vai-tro' },
    { title: 'Quiz', path: '/quiz' },
    { title: 'Minigame', path: '/minigame' },
    { title: 'AI Usage', path: '/ai-usage' }
  ];

  return (
    <nav className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <h1 className="text-3xl font-bold text-white drop-shadow-lg">
              The Crew
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-2">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.path}
                className="relative px-5 py-3 text-white font-semibold text-lg overflow-hidden group rounded-lg transition-all duration-300 hover:bg-white/20"
              >
                <span className="relative z-10 group-hover:text-yellow-300 transition-colors duration-300">
                  {item.title}
                </span>
                {/* Underline animation */}
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-yellow-300 group-hover:w-full transition-all duration-300 ease-out"></span>
                {/* Background slide animation */}
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></span>
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/20 focus:outline-none transition-colors duration-200"
            >
              <svg
                className="h-7 w-7"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-red-700 border-t border-red-500">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.path}
                className="block px-4 py-3 rounded-md text-white font-semibold text-lg hover:bg-white/20 hover:text-yellow-300 transition-all duration-300 transform hover:translate-x-2"
              >
                {item.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;