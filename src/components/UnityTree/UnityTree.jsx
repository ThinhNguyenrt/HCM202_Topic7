import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';

// Mảng từ khóa cho tooltip (khởi tạo bên ngoài component)
const KEYWORDS = ['Đoàn kết', 'Sống còn', 'Chiến lược', 'Then chốt', 'Yêu nước'];

// Hàm helper để lấy random keyword (pure function)
const getRandomKeyword = () => {
  return KEYWORDS[Math.floor(Math.random() * KEYWORDS.length)];
};

const UnityTree = ({ totalCorrect = 0, totalUsers = 30 }) => {
  const [hoveredLeaf, setHoveredLeaf] = useState(null);
  const [tooltipContent, setTooltipContent] = useState('');

  // Tính số lá hiển thị (tối đa 33)
  const maxLeaves = 33;
  const leaveCount = Math.ceil((totalCorrect / 20) * maxLeaves);
  const actualLeaves = Math.min(leaveCount, maxLeaves);

  // Kiểm tra xem có nên thêm glow effect không
  const hasGlow = totalCorrect > 15;

  // Xử lý hover trên lá
  const handleLeafHover = useCallback((leafIndex) => {
    setHoveredLeaf(leafIndex);
    // Chọn ngẫu nhiên một từ khóa
    setTooltipContent(getRandomKeyword());
  }, []);

  const handleLeafLeave = useCallback(() => {
    setHoveredLeaf(null);
  }, []);

  // Vị trí lá xung quanh thân cây (sắp xếp theo hình tròn/xoắn ốc)
  const generateLeafPositions = useCallback((count) => {
    const positions = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 60 + (i % 3) * 20; // Tạo hiệu ứng xoắn ốc
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius - 20; // Lệch lên trên
      positions.push({ x, y, angle });
    }
    return positions;
  }, []);

  const leafPositions = useMemo(
    () => generateLeafPositions(actualLeaves),
    [actualLeaves, generateLeafPositions]
  );

  return (
    <div className="flex flex-col items-center justify-center w-full py-8">
      {/* Tiêu đề */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-green-700 mb-2">🌳 Cây Di sản Đoàn kết</h2>
        <p className="text-gray-600">
          <span className="font-semibold text-green-600">{actualLeaves}</span> lá xanh từ{' '}
          <span className="font-semibold text-blue-600">{totalCorrect}</span>/20 câu trả lời đúng
        </p>
      </div>

      {/* Container cây */}
      <div className="relative w-full max-w-md h-96 flex items-center justify-center">
        {/* SVG trunk (thân cây) */}
        <svg
          className="absolute w-32 h-48 top-1/3"
          viewBox="0 0 100 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Thân cây chính */}
          <rect
            x="42"
            y="60"
            width="16"
            height="100"
            fill="#8B6F47"
            rx="8"
          />
          {/* Nhánh phụ trái */}
          <path
            d="M 50 100 Q 20 90 10 120"
            stroke="#A0825D"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
          {/* Nhánh phụ phải */}
          <path
            d="M 50 100 Q 80 90 90 120"
            stroke="#A0825D"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
          {/* Gốc cây */}
          <ellipse cx="50" cy="170" rx="18" ry="8" fill="#654321" />
        </svg>

        {/* Lá cây */}
        <div className="absolute w-full h-full flex items-center justify-center">
          {leafPositions.map((pos, index) => (
            <motion.div
              key={index}
              className="absolute"
              style={{
                left: `calc(50% + ${pos.x}px)`,
                top: `calc(50% + ${pos.y}px)`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: index * 0.05,
                duration: 0.4,
                type: 'spring',
                stiffness: 100,
              }}
            >
              <motion.div
                className={`relative cursor-pointer transition-all ${
                  hasGlow ? 'animate-pulse' : ''
                }`}
                onMouseEnter={() => handleLeafHover(index)}
                onMouseLeave={handleLeafLeave}
                whileHover={{ scale: 1.2 }}
              >
                {/* Lá SVG */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={`text-green-500 drop-shadow-lg ${
                    hasGlow && totalCorrect === 20 ? 'text-green-400' : ''
                  }`}
                  style={{
                    transform: `rotate(${pos.angle * (180 / Math.PI)}deg)`,
                    filter:
                      hasGlow && totalCorrect === 20
                        ? 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.7))'
                        : 'none',
                  }}
                >
                  <path d="M12 2C6.5 8 4 12 4 16c0 4.4 3.6 8 8 8s8-3.6 8-8c0-4-2.5-8-8-14z" />
                </svg>

                {/* Tooltip */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={
                    hoveredLeaf === index
                      ? { opacity: 1, y: -10 }
                      : { opacity: 0, y: 10 }
                  }
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap pointer-events-none"
                >
                  <div className="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded shadow-lg">
                    {tooltipContent}
                  </div>
                  {/* Mũi tên tooltip */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-l-transparent border-r-transparent border-t-green-600"></div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Thông tin bổ sung */}
      <div className="mt-8 text-center">
        <div className="inline-block bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            Cây được {actualLeaves === maxLeaves ? 'trở nên rực rỡ' : 'phát triển'} nhờ những{' '}
            <span className="font-semibold text-green-600">đóng góp từ toàn lớp</span> ({totalUsers} người)
          </p>
          {hasGlow && totalCorrect === 20 && (
            <p className="text-xs text-green-600 mt-2 font-semibold">
              ✨ Hoàn hảo! Cây của bạn đang tỏa sáng ✨
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnityTree;
