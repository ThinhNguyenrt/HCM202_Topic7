import Tanglop from '../assets/tanglop.jpg'
import hinh4 from '../assets/hinh4.webp'
import { Clock, BookOpen, Users } from 'lucide-react'
import { useState } from 'react'

function Ideal() {
  const [hoveredCard, setHoveredCard] = useState(null)

  const timelineCards = [
    {
      title: "Trước khi giành chính quyền",
      description: "Xây dựng khối đoàn kết rộng rãi, tập hợp mọi lực lượng yêu nước để chuẩn bị cho cuộc tổng khởi nghĩa",
      icon: Clock
    },
    {
      title: "Trong quá trình đấu tranh cách mạng",
      description: "Duy trì và củng cố khối đoàn kết, huy động sức mạnh toàn dân tộc đấu tranh giành độc lập",
      icon: BookOpen
    },
    {
      title: "Sau khi cách mạng thành công",
      description: "Tiếp tục phát huy đại đoàn kết để xây dựng và bảo vệ Tổ quốc, phát triển đất nước",
      icon: Users
    }
  ];

  const unityAspects = [
    { icon: "👥", text: "Giai cấp" },
    { icon: "🌍", text: "Dân tộc" },
    { icon: "🕊️", text: "Tôn giáo" },
    { icon: "🤝", text: "Đảng phái" },
    { icon: "📜", text: "Quá khứ chính trị" }
  ];

  const principles = [
    "Hiệp thương dân chủ",
    "Tôn trọng sự khác biệt",
    "Lấy lợi ích dân tộc làm điểm tương đồng"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-600 via-red-500 to-orange-500 py-8 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="mb-8 animate-fade-in-down">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border-2 border-gray-200 p-8 md:p-12 text-center group cursor-pointer hover:border-red-400 transition-all duration-500">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 hover:text-red-600 transition-colors duration-500 drop-shadow-lg flex items-center justify-center gap-3">
            <BookOpen className="w-12 h-12 animate-bounce" />
            <span>Tư Tưởng Hồ Chí Minh Về Đại Đoàn Kết Dân Tộc</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
            Đại đoàn kết dân tộc là nội dung cốt lõi trong tư tưởng Hồ Chí Minh, giữ vai trò quyết định đối với sự thành công và phát triển bền vững của cách mạng Việt Nam.
          </p>
        </div>
      </section>

      {/* SECTION 2 - Chiến lược xuyên suốt */}
      <section className="mb-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
        <div className="max-w-6xl mx-auto bg-white rounded-2xl border-2 border-gray-200 p-8 md:p-10 group cursor-pointer hover:border-red-400 transition-all duration-500">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8 flex items-center justify-center gap-3">
            <span className="text-red-600">⚡</span>
            <span>Đại Đoàn Kết Dân Tộc – Chiến Lược Xuyên Suốt</span>
          </h2>
          
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-8 mb-12 border-l-4 border-red-600 hover:shadow-2xl hover:scale-[1.01] transition-all duration-500 group cursor-pointer">
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start hover:text-red-600 hover:translate-x-2 transition-all duration-300 group-hover:font-semibold">
                <span className="text-red-600 font-bold mr-3 text-2xl">•</span>
                <span>Hồ Chí Minh khẳng định cách mạng là sự nghiệp của quần chúng</span>
              </li>
              <li className="flex items-start hover:text-red-600 hover:translate-x-2 transition-all duration-300 group-hover:font-semibold">
                <span className="text-red-600 font-bold mr-3 text-2xl">•</span>
                <span>Đại đoàn kết không phải chiến lược tình thế</span>
              </li>
              <li className="flex items-start hover:text-red-600 hover:translate-x-2 transition-all duration-300 group-hover:font-semibold">
                <span className="text-red-600 font-bold mr-3 text-2xl">•</span>
                <span>Là đường lối lâu dài – nhất quán – bền vững</span>
              </li>
            </ul>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
            Đại Đoàn Kết Phải Được Thực Hiện
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {timelineCards.map((card, index) => {
              const Icon = card.icon
              return (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="relative bg-white rounded-xl shadow-lg p-8 border-t-4 border-red-600 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 group cursor-pointer hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="absolute -top-4 left-8 w-16 h-16 bg-gradient-to-br from-red-600 to-orange-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mt-8 mb-4 group-hover:text-red-600 transition-colors duration-300 flex items-center gap-2">
                    {card.title}
                    <span className={`text-2xl transition-all duration-300 ${hoveredCard === index ? 'scale-125 rotate-45' : ''}`}>✨</span>
                  </h4>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                    {card.description}
                  </p>
                  <div className={`mt-4 h-1 bg-gradient-to-r from-red-600 to-orange-500 rounded-full transition-all duration-500 ${hoveredCard === index ? 'w-full' : 'w-0'}`}></div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3 - Đoàn kết toàn dân */}
      <section className="mb-8 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
        <div className="max-w-6xl mx-auto bg-white rounded-2xl border-2 border-gray-200 p-8 md:p-10 group cursor-pointer hover:border-red-400 transition-all duration-500">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Đoàn Kết Toàn Dân
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-stretch">
            {/* Text bên trái */}
            <div className="flex">
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-shadow duration-500 w-full flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-red-600 mb-6">
                  Đoàn Kết Không Phân Biệt:
                </h3>
                <ul className="space-y-4">
                  {unityAspects.map((aspect, index) => (
                    <li
                      key={index}
                      className="flex items-center text-lg text-gray-700 hover:text-red-600 hover:translate-x-2 transition-all duration-300 font-semibold"
                    >
                      <span className="text-3xl mr-4 hover:scale-125 transition-transform duration-300">{aspect.icon}</span>
                      <span>{aspect.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Hình bên phải */}
            <div className="flex">
              <div className="bg-gradient-to-br from-red-100 to-orange-100 rounded-xl shadow-lg p-8 flex items-center justify-center w-full overflow-hidden hover:shadow-2xl transition-all duration-500">
                <div className="text-center w-full">
                  <img 
                    src={Tanglop} 
                    alt="Đoàn kết toàn dân"
                    className="w-full h-auto object-cover rounded-lg group-hover:scale-105 transition-transform duration-500 shadow-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 - Nền tảng đại đoàn kết */}
      <section className="mb-8 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
        <div className="max-w-5xl mx-auto bg-white rounded-2xl border-2 border-gray-200 p-8 md:p-10 group cursor-pointer hover:border-red-400 transition-all duration-500">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
            Nền Tảng Đại Đoàn Kết Dân Tộc
          </h2>

          {/* Đoạn mở đầu */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-8 mb-10 border-l-4 border-red-600 hover:shadow-lg transition-all duration-500">
            <p className="text-lg text-gray-700 leading-relaxed font-semibold">
              Người cho rằng, trong mỗi con người Việt Nam đều có lòng yêu nước, và đó chính là cơ sở quan trọng nhất để xây dựng khối đại đoàn kết. Bất kỳ ai thật lòng vì độc lập dân tộc, vì hạnh phúc của nhân dân đều là thành viên của khối đoàn kết dân tộc.
            </p>
          </div>

          {/* Nền tảng */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-red-600 mb-8 text-center">
              Khối Đại Đoàn Kết Được Xây Dựng Trên Nền Tảng:
            </h3>
            <div className="space-y-4">
              <div className="bg-white border-l-4 border-red-600 rounded-lg p-6 shadow-md hover:shadow-xl hover:translate-x-2 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <p className="text-lg text-gray-700 font-semibold">
                    Lợi Ích Tối Cao Của Dân Tộc
                  </p>
                </div>
              </div>

              <div className="bg-white border-l-4 border-orange-500 rounded-lg p-6 shadow-md hover:shadow-xl hover:translate-x-2 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <p className="text-lg text-gray-700 font-semibold">
                    Độc Lập Dân Tộc Gắn Liền Với Chủ Nghĩa Xã Hội
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Kết luận */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-8 border-l-4 border-orange-600 hover:shadow-lg transition-all duration-500">
            <p className="text-lg text-gray-700 leading-relaxed font-semibold">
              Đây là cơ sở lợi ích lâu dài, bền vững, chứ không phải lợi ích tạm thời hay cục bộ. Điều này khẳng định đại đoàn kết trong tư tưởng Hồ Chí Minh mang tính <span className="font-bold text-red-600">chiến lược</span>, không phải chiến lược nhất thời.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5 - Mặt trận dân tộc thống nhất */}
      <section className="mb-8 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
        <div className="max-w-5xl mx-auto bg-white rounded-2xl border-2 border-gray-200 p-8 md:p-10 group cursor-pointer hover:border-red-400 transition-all duration-500">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Mặt Trận Dân Tộc Thống Nhất
          </h2>

          {/* Sơ đồ khối */}
          <div className="mb-12">
            <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-xl p-8 text-center shadow-xl hover:shadow-2xl transition-shadow duration-500 transform hover:-translate-y-1">
              <h3 className="text-2xl font-bold text-white mb-4">
                Tổ Chức - Nguyên Tắc - Lý Luận
              </h3>
              <p className="text-white text-lg opacity-90">
                Nền tảng của khối đại đoàn kết dân tộc
              </p>
            </div>
          </div>

          {/* Nguyên tắc hoạt động */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-500">
            <h3 className="text-2xl font-bold text-red-600 mb-8 text-center">
              Nguyên Tắc Hoạt Động
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {principles.map((principle, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-red-600 rounded-full mb-4 mx-auto hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-xl">{index + 1}</span>
                  </div>
                  <p className="text-center text-gray-700 font-semibold leading-relaxed">
                    {principle}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* IMAGE SECTION */}
      <section className="mb-8 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
        <div className="max-w-5xl mx-auto bg-white rounded-2xl border-2 border-gray-200 p-6 md:p-8 group cursor-pointer hover:border-red-400 transition-all duration-500">
          <img 
            src={hinh4} 
            alt="Chiến lược đại đoàn kết dân tộc lâu dài"
            className="w-full h-auto rounded-xl hover:scale-105 transition-all duration-500 object-cover"
          />
        </div>
      </section>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-down {
          animation: fadeInDown 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-left {
          animation: fadeInLeft 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-right {
          animation: fadeInRight 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-in-right {
          animation: slideInRight 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}

export default Ideal;