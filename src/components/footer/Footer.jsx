function Footer() {
  return (
    <footer className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 shadow-lg mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center space-y-4">
          {/* Logo/Brand */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white drop-shadow-lg">
              HCM202
            </h2>
            <div className="mt-2 h-1 w-20 bg-yellow-300 mx-auto rounded-full"></div>
          </div>

          {/* Information */}
          <div className="text-center space-y-2">
            <p className="text-white font-semibold text-lg">
              Nhóm The Crews
            </p>
            <p className="text-white/90 font-medium">
              Đại học FPT
            </p>
          </div>

          {/* Divider */}
          <div className="w-full border-t border-white/30 my-4"></div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-white/90 text-sm">
              © 2026 All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;