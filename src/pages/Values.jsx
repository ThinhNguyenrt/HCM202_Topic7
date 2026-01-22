import hinh4 from '../assets/hinh4.webp';
import hinh3 from '../assets/hinh3.webp';

export default function Values() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-600 via-red-500 to-orange-500 py-8 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="mb-8 animate-fade-in">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl border-2 border-gray-200 p-8 md:p-12 group cursor-pointer hover:border-red-400 transition-all duration-500">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-5xl group-hover:animate-bounce">🎯</span>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 leading-relaxed group-hover:text-red-600 transition-colors duration-300">
              Phân Tích Chiến Lược Đại Đoàn Kết Dân Tộc Trong Tư Tưởng <span className="text-red-600 group-hover:text-orange-500 transition-colors">Hồ Chí Minh</span>
            </h1>
          </div>
          <p className="text-lg md:text-xl text-gray-700 mt-4 leading-relaxed group-hover:text-gray-800 transition-colors">
            Vì sao đại đoàn kết dân tộc là chiến lược quyết định mọi thắng lợi của cách mạng Việt Nam
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <main>
        {/* Section 1 */}
        <section className="mb-8 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
          <div className="max-w-5xl mx-auto bg-white rounded-2xl border-2 border-gray-200 p-8 md:p-10 group cursor-pointer hover:border-red-400 transition-all duration-500">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 flex items-center gap-3 group cursor-pointer hover:text-red-600 transition-colors">
              <span className="text-4xl group-hover:animate-spin">⚡</span>
              Đại đoàn kết tạo nên sức mạnh tổng hợp của dân tộc
            </h2>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-8 border-l-4 border-red-600 hover:shadow-2xl hover:scale-[1.01] transition-all duration-500 group cursor-pointer">
                <p className="text-lg text-gray-800 mb-6 leading-relaxed font-semibold group-hover:text-red-600 transition-colors">
                  Cách mạng Việt Nam diễn ra trong điều kiện:
                </p>
                <ul className="space-y-3 ml-4">
                  <li className="flex items-start text-lg text-gray-700 hover:text-red-600 hover:translate-x-2 transition-all duration-300 group-hover:font-semibold">
                    <span className="text-red-600 font-bold mr-3 text-2xl">•</span>
                    <span>Nền kinh tế lạc hậu</span>
                  </li>
                  <li className="flex items-start text-lg text-gray-700 hover:text-red-600 hover:translate-x-2 transition-all duration-300 group-hover:font-semibold">
                    <span className="text-red-600 font-bold mr-3 text-2xl">•</span>
                    <span>Xuất phát điểm thấp</span>
                  </li>
                  <li className="flex items-start text-lg text-gray-700 hover:text-red-600 hover:translate-x-2 transition-all duration-300 group-hover:font-semibold">
                    <span className="text-red-600 font-bold mr-3 text-2xl">•</span>
                    <span>Phải đối đầu với các thế lực xâm lược mạnh hơn nhiều lần</span>
                  </li>
                </ul>
              </div>

              <p className="text-lg text-gray-800 leading-relaxed hover:text-red-600 transition-colors">
                Trong hoàn cảnh đó, nếu không có sự đoàn kết của toàn dân thì không thể tạo ra sức mạnh đủ lớn để giành và giữ độc lập. Đại đoàn kết dân tộc giúp:
              </p>

              <ul className="space-y-3 ml-4">
                <li className="flex items-start text-lg text-gray-700 hover:text-red-600 hover:translate-x-2 transition-all duration-300 group cursor-pointer font-semibold">
                  <span className="text-red-600 font-bold mr-3 text-2xl">•</span>
                  <span>Kết hợp sức mạnh của các giai cấp, tầng lớp</span>
                </li>
                <li className="flex items-start text-lg text-gray-700 hover:text-red-600 hover:translate-x-2 transition-all duration-300 group cursor-pointer font-semibold">
                  <span className="text-red-600 font-bold mr-3 text-2xl">•</span>
                  <span>Biến sức mạnh riêng lẻ thành sức mạnh tổng hợp</span>
                </li>
                <li className="flex items-start text-lg text-gray-700 hover:text-red-600 hover:translate-x-2 transition-all duration-300 group cursor-pointer font-semibold">
                  <span className="text-red-600 font-bold mr-3 text-2xl">•</span>
                  <span>Phát huy cao nhất tiềm năng của toàn dân tộc</span>
                </li>
              </ul>

              <div className="mt-8 text-center">
                <div className="text-xl font-bold text-red-700 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-500 group cursor-pointer">
                  <p>Chính sức mạnh này là nhân tố quyết định thắng lợi của cách mạng Việt Nam.</p>
                  <span className="inline-block mt-3 text-3xl group-hover:animate-bounce">💪</span>
                </div>
              </div>

              <div className="mt-8">
                <img
                  src={hinh4}
                  alt="Sức mạnh đại đoàn kết"
                  className="w-full h-auto rounded-2xl shadow-2xl hover:shadow-2xl hover:scale-105 transition-all duration-500 object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-8 animate-fadeInUp" style={{animationDelay: '0.4s'}}>
          <div className="max-w-5xl mx-auto bg-white rounded-2xl border-2 border-gray-200 p-8 md:p-10 group cursor-pointer hover:border-red-400 transition-all duration-500">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 flex items-center gap-3 group cursor-pointer hover:text-red-600 transition-colors">
              <span className="text-4xl group-hover:rotate-12 transition-transform">📚</span>
              Thực tiễn cách mạng Việt Nam chứng minh tính chiến lược của đại đoàn kết
            </h2>

            <div className="space-y-6">
              <p className="text-lg text-gray-800 leading-relaxed font-semibold hover:text-red-600 transition-colors">
                Lịch sử cách mạng Việt Nam cho thấy:
              </p>

              <div className="space-y-6">
                <div className="flex items-start hover:bg-red-50 p-4 rounded-lg transition-all duration-300 group cursor-pointer">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-red-600 to-orange-500 rounded-full flex items-center justify-center mr-6 shadow-lg group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                    <span className="text-white font-bold text-lg">1945</span>
                  </div>
                  <div className="pt-2 group-hover:translate-x-2 transition-transform">
                    <p className="text-lg text-gray-700 leading-relaxed group-hover:font-semibold">
                      Cách mạng Tháng Tám năm 1945 thành công nhờ sự đoàn kết toàn dân <span className="text-2xl">✨</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start hover:bg-red-50 p-4 rounded-lg transition-all duration-300 group cursor-pointer">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-red-600 to-orange-500 rounded-full flex items-center justify-center mr-6 shadow-lg group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                    <span className="text-white font-bold text-center text-sm">1945-75</span>
                  </div>
                  <div className="pt-2 group-hover:translate-x-2 transition-transform">
                    <p className="text-lg text-gray-700 leading-relaxed group-hover:font-semibold">
                      Hai cuộc kháng chiến chống thực dân Pháp và đế quốc Mỹ giành thắng lợi nhờ phát huy sức mạnh đại đoàn kết <span className="text-2xl">🎖️</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start hover:bg-red-50 p-4 rounded-lg transition-all duration-300 group cursor-pointer">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-red-600 to-orange-500 rounded-full flex items-center justify-center mr-6 shadow-lg group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                    <span className="text-white font-bold text-center text-sm">Đổi mới</span>
                  </div>
                  <div className="pt-2 group-hover:translate-x-2 transition-transform">
                    <p className="text-lg text-gray-700 leading-relaxed group-hover:font-semibold">
                      Trong thời kỳ đổi mới, đoàn kết dân tộc tiếp tục là nhân tố quyết định sự ổn định và phát triển của đất nước <span className="text-2xl">🚀</span>
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-lg text-gray-800 leading-relaxed font-semibold mt-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 hover:shadow-2xl hover:scale-[1.01] transition-all duration-500 border-l-4 border-red-600 group cursor-pointer">
                Sự tồn tại và phát huy hiệu quả của đại đoàn kết trong suốt tiến trình cách mạng Việt Nam đã chứng minh rõ ràng rằng đây không phải là sách lược nhất thời, mà là chiến lược lâu dài, xuyên suốt.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 - Conclusion */}
        <section className="mb-8 animate-fadeInUp" style={{animationDelay: '0.6s'}}>
          <div className="max-w-5xl mx-auto bg-white rounded-2xl border-2 border-gray-200 p-10 md:p-12 group cursor-pointer hover:border-red-400 transition-all duration-500">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center flex items-center justify-center gap-3">
              <span className="text-5xl group-hover:animate-bounce">🏁</span>
              Kết luận
            </h2>

            <p className="text-xl text-gray-800 mb-8 leading-relaxed text-center font-semibold">
              Từ tư tưởng Hồ Chí Minh và thực tiễn cách mạng Việt Nam có thể khẳng định:
            </p>

            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-8 mb-8 border-l-4 border-red-600 hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
              <p className="text-2xl font-bold text-red-700 text-center leading-relaxed">
                Đại đoàn kết dân tộc không phải là sách lược tình thế, mà là chiến lược lâu dài, mang tính sống còn của cách mạng Việt Nam.
              </p>
            </div>

            <p className="text-xl text-gray-800 font-semibold mb-6 text-center">
              Đại đoàn kết dân tộc là:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border-l-4 border-red-600 hover:shadow-lg hover:-translate-y-2 transition-all duration-500">
                <span className="text-4xl block text-center mb-3 group-hover:animate-bounce">🎯</span>
                <p className="text-lg text-gray-800 font-semibold text-center">
                  Nền tảng tư tưởng của cách mạng
                </p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border-l-4 border-red-600 hover:shadow-lg hover:-translate-y-2 transition-all duration-500">
                <span className="text-4xl block text-center mb-3 group-hover:animate-bounce">💪</span>
                <p className="text-lg text-gray-800 font-semibold text-center">
                  Nguồn sức mạnh to lớn của dân tộc
                </p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border-l-4 border-red-600 hover:shadow-lg hover:-translate-y-2 transition-all duration-500">
                <span className="text-4xl block text-center mb-3 group-hover:animate-bounce">🏆</span>
                <p className="text-lg text-gray-800 font-semibold text-center">
                  Nhân tố quyết định mọi thắng lợi của cách mạng Việt Nam trong quá khứ, hiện tại và tương lai
                </p>
              </div>
            </div>

            <div className="mt-12">
              <img
                src={hinh3}
                alt="Các nguyên tắc hoạt động của đại đoàn kết"
                className="w-full h-auto rounded-xl hover:scale-105 transition-all duration-500 object-cover"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}