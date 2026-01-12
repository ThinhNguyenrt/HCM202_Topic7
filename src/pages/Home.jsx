function Home() {
  const cards = [
    {
      title: "Chiến lược lâu dài",
      description: "Đại đoàn kết dân tộc là đường lối xuyên suốt của cách mạng Việt Nam, không phải biện pháp thay thế"
    },
    {
      title: "Đoàn kết toàn dân",
      description: "Không phân biệt giai cấp, tôn giáo, dân tộc, quá khứ chính trị - ai yêu nước"
    },
    {
      title: "Sức mạnh quyết định thắng lợi",
      description: "Chính khối đại đoàn kết đã tạo nên sức mạnh tổng hợp, giúp dân tộc Việt Nam giành và giữ độc lập"
    }
  ];

  return (
    <div className="bg-[#F5F5F0] min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl shadow-xl p-8 md:p-12 border-l-4 border-red-600 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 leading-relaxed">
              Hồ Chí Minh khẳng định: <span className="text-red-600">"Đoàn kết là then chốt của thành công"</span> và coi đó là chiến lược xuyên suốt. Vậy đoàn kết dân tộc trong tư tưởng Hồ Chí Minh là sách lược tình thế hay là chiến lược mang tính sống còn?
            </h1>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
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
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cards.map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-red-600 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-600 to-orange-500 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-2xl font-bold">{index + 1}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-red-600 transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 rounded-2xl shadow-2xl p-10 md:p-12 hover:scale-[1.02] transition-transform duration-500">
            <p className="text-2xl md:text-3xl text-white font-semibold mb-8 leading-relaxed">
              Đại đoàn kết dân tộc không chỉ là khẩu hiệu, mà là chiến lược sống còn của cách mạng Việt Nam.
            </p>
            <a
              href="/tu-tuong-hcm"
              className="inline-block bg-white text-red-600 px-10 py-4 rounded-full font-bold text-xl shadow-lg hover:shadow-2xl hover:bg-yellow-300 hover:text-red-700 transform hover:scale-110 transition-all duration-300"
            >
              → Khám phá tư tưởng Hồ Chí Minh
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;