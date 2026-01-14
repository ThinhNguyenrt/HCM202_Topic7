import Tanglop from '../assets/tanglop.jpg'
function Ideal() {
  const timelineCards = [
    {
      title: "Trước khi giành chính quyền",
      description: "Xây dựng khối đoàn kết rộng rãi, tập hợp mọi lực lượng yêu nước để chuẩn bị cho cuộc tổng khởi nghĩa"
    },
    {
      title: "Trong quá trình đấu tranh cách mạng",
      description: "Duy trì và củng cố khối đoàn kết, huy động sức mạnh toàn dân tộc đấu tranh giành độc lập"
    },
    {
      title: "Sau khi cách mạng thành công",
      description: "Tiếp tục phát huy đại đoàn kết để xây dựng và bảo vệ Tổ quốc, phát triển đất nước"
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
    <div className="bg-[#F5F5F0] min-h-screen">
      {/* SECTION 1 - Mở đầu */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 animate-fade-in-down">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 hover:text-red-600 transition-colors duration-500">
            Tư tưởng Hồ Chí Minh về đại đoàn kết dân tộc
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
            Đại đoàn kết dân tộc là nội dung cốt lõi trong tư tưởng Hồ Chí Minh, giữ vai trò quyết định đối với sự thành công và phát triển bền vững của cách mạng Việt Nam.
          </p>
        </div>
      </section>

      {/* SECTION 2 - Chiến lược xuyên suốt */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8 animate-fade-in-up">
            Đại đoàn kết dân tộc – chiến lược xuyên suốt của cách mạng Việt Nam
          </h2>
          
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-8 mb-12 border-l-4 border-red-600 hover:shadow-xl transition-all duration-500 animate-fade-in-left">
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start animate-slide-in-right">
                <span className="text-red-600 font-bold mr-3 text-2xl">•</span>
                <span>Hồ Chí Minh khẳng định cách mạng là sự nghiệp của quần chúng</span>
              </li>
              <li className="flex items-start animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
                <span className="text-red-600 font-bold mr-3 text-2xl">•</span>
                <span>Đại đoàn kết không phải sách lược tình thế</span>
              </li>
              <li className="flex items-start animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
                <span className="text-red-600 font-bold mr-3 text-2xl">•</span>
                <span>Là đường lối lâu dài – nhất quán – bền vững</span>
              </li>
            </ul>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10 animate-fade-in-up">
            Đại đoàn kết phải được thực hiện
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {timelineCards.map((card, index) => (
              <div
                key={index}
                className="relative bg-white rounded-xl shadow-lg p-8 border-t-4 border-red-600 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="absolute -top-4 left-8 w-12 h-12 bg-gradient-to-br from-red-600 to-orange-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-xl font-bold">{index + 1}</span>
                </div>
                <h4 className="text-xl font-bold text-gray-800 mt-6 mb-4 group-hover:text-red-600 transition-colors duration-300">
                  {card.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 - Đoàn kết toàn dân (có hình) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12 animate-fade-in-up">
            Đoàn kết toàn dân
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-stretch">
            {/* Text bên trái */}
            <div className="flex animate-fade-in-left">
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-shadow duration-500 w-full flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-red-600 mb-6">
                  Đoàn kết không phân biệt:
                </h3>
                <ul className="space-y-4">
                  {unityAspects.map((aspect, index) => (
                    <li
                      key={index}
                      className="flex items-center text-lg text-gray-700 hover:text-red-600 hover:translate-x-2 transition-all duration-300 animate-slide-in-right"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <span className="text-3xl mr-4 hover:scale-125 transition-transform duration-300">{aspect.icon}</span>
                      <span className="font-semibold">{aspect.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Hình bên phải */}
            <div className="flex animate-fade-in-right">
              <div className="bg-gradient-to-br from-red-100 to-orange-100 rounded-xl shadow-lg p-8 flex items-center justify-center w-full overflow-hidden group hover:shadow-2xl transition-all duration-500">
                <div className="text-center w-full">
                  <img 
                    src={Tanglop} 
                    alt="TangLop"
                    className="w-full h-auto object-cover rounded-lg group-hover:scale-105 transition-transform duration-500 shadow-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 - Mặt trận dân tộc thống nhất */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12 animate-fade-in-up">
            Mặt trận dân tộc thống nhất
          </h2>

          {/* Sơ đồ khối */}
          <div className="mb-12 animate-fade-in-up">
            <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-xl p-8 text-center shadow-xl hover:shadow-2xl transition-shadow duration-500 transform hover:-translate-y-1">
              <h3 className="text-2xl font-bold text-white mb-4">
                Tổ chức - Nguyên tắc - Lý luận
              </h3>
              <p className="text-white text-lg opacity-90">
                Nền tảng của khối đại đoàn kết dân tộc
              </p>
            </div>
          </div>

          {/* Nguyên tắc hoạt động */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 animate-fade-in-up">
            <h3 className="text-2xl font-bold text-red-600 mb-6 text-center">
              Nguyên tắc hoạt động
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {principles.map((principle, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-red-600 rounded-full mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
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