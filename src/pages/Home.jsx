import { Heart, Users, Zap } from 'lucide-react';
import { useState } from 'react';
import hinh1 from '../assets/hinh1.webp';

function Home() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const cards = [
    {
      title: "Chiến lược lâu dài",
      description: "Đại đoàn kết dân tộc là đường lối xuyên suốt của cách mạng Việt Nam, không phải biện pháp thay thế",
      icon: Heart
    },
    {
      title: "Đoàn kết toàn dân",
      description: "Không phân biệt giai cấp, tôn giáo, dân tộc, quá khứ chính trị - ai yêu nước",
      icon: Users
    },
    {
      title: "Sức mạnh quyết định thắng lợi",
      description: "Chính khối đại đoàn kết đã tạo nên sức mạnh tổng hợp, giúp dân tộc Việt Nam giành và giữ độc lập",
      icon: Zap
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-600 via-red-500 to-orange-500 py-8 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="mb-8 animate-fade-in">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl border-2 border-gray-200 p-8 md:p-12 group cursor-pointer hover:border-red-400 transition-all duration-500">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-5xl group-hover:animate-bounce">💡</span>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 leading-relaxed group-hover:text-red-600 transition-colors duration-300">
              Hồ Chí Minh khẳng định: <span className="text-red-600 group-hover:text-orange-500 transition-colors">"Đoàn kết là then chốt của thành công"</span> và coi đó là chiến lược xuyên suốt. Vậy đoàn kết dân tộc trong tư tưởng Hồ Chí Minh là sách lược tình thế hay là chiến lược mang tính sống còn?
            </h1>
          </div>
        </div>
      </section>

      {/* Image Section */}
      <section className="mb-8">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl border-2 border-gray-200 p-6 md:p-8">
          <img
            src={hinh1}
            alt="Hồ Chí Minh - Đoàn kết dân tộc"
            className="w-full h-auto rounded-xl hover:scale-105 transition-all duration-500 object-cover"
          />
        </div>
      </section>

      {/* Quote Section */}
      <section className="mb-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border-2 border-gray-200 p-8 md:p-12 text-center">
          <div className="relative inline-block hover:scale-105 transition-transform duration-500">
            <svg className="absolute -top-6 -left-4 w-12 h-12 text-red-400 opacity-50" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
            </svg>
            <blockquote className="text-3xl md:text-4xl lg:text-5xl font-bold text-red-600 italic py-8 px-4">
              "Đoàn kết, đoàn kết, đại đoàn kết – Thành công, thành công, đại thành công."
            </blockquote>
            <svg className="absolute -bottom-6 -right-4 w-12 h-12 text-red-400 opacity-50 transform rotate-180" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
            </svg>
          </div>
          <p className="text-xl md:text-2xl text-gray-700 font-semibold mt-8">
            — Hồ Chí Minh
          </p>
        </div>
      </section>

      {/* Cards Section */}
      <section className="mb-8">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl border-2 border-gray-200 p-8 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-8 border-l-4 border-red-600 hover:shadow-lg hover:-translate-y-2 transition-all duration-500 group cursor-pointer"
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-600 to-orange-500 rounded-full mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-red-600 transition-colors duration-300 flex items-center gap-2">
                    {card.title}
                    <span className={`text-2xl transition-all duration-300 ${hoveredCard === index ? 'rotate-45' : ''}`}>✨</span>
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg group-hover:text-gray-800 transition-colors">
                    {card.description}
                  </p>
                  <div className={`mt-4 h-1 bg-gradient-to-r from-red-600 to-orange-500 rounded-full transition-all duration-500 ${hoveredCard === index ? 'w-full' : 'w-0'}`}></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mb-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border-2 border-gray-200 p-10 md:p-12 text-center">
          <p className="text-2xl md:text-3xl text-gray-800 font-semibold mb-8 leading-relaxed">
            Đại đoàn kết dân tộc không chỉ là khẩu hiệu, mà là chiến lược sống còn của cách mạng Việt Nam.
          </p>
          <a
            href="/tu-tuong-hcm"
            className="inline-block bg-gradient-to-r from-red-600 to-orange-500 text-white px-10 py-4 rounded-full font-bold text-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            → Khám phá tư tưởng Hồ Chí Minh
          </a>
        </div>
      </section>
    </div>
  );
}

export default Home;