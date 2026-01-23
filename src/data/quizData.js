// Hàm xáo trộn thứ tự câu trả lời
export const shuffleOptions = (question, seed) => {
  // Sử dụng seed để đảm bảo xáo trộn giống nhau cho cùng một question
  const random = ((seed + question.id) * 9301 + 49297) % 233280 / 233280;
  
  // Tạo mảng index
  const indices = [0, 1, 2, 3];
  
  // Fisher-Yates shuffle với seed
  let shuffled = [...indices];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor((random + i) * (i + 1)) % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // Tạo mảng options mới với thứ tự đã xáo trộn
  const newOptions = shuffled.map(i => question.options[i]);
  
  // Tìm vị trí mới của đáp án đúng
  const oldCorrectOption = question.options[question.correct];
  const newCorrect = newOptions.indexOf(oldCorrectOption);
  
  return {
    ...question,
    options: newOptions,
    correct: newCorrect,
    originalCorrect: question.correct // Lưu lại vị trí cũ cho reference
  };
};

export const quizData = {
  title: "Quiz - Tư tưởng Hồ Chí Minh về Đại đoàn kết dân tộc",
  description: "Kiểm tra kiến thức của bạn về tư tưởng của Hồ Chí Minh liên quan đến đại đoàn kết dân tộc.",
  duration: 5, // 5 minutes
  questions: [
    {
      id: 1,
      question: "Theo Hồ Chí Minh, đại đoàn kết dân tộc là gì?",
      options: [
        "Biện pháp tình thế trong cách mạng",
        "Giải pháp tạm thời khi gặp khó khăn",
        "Đường lối chiến lược của cách mạng Việt Nam",
        "Phương pháp vận động quần chúng ngắn hạn"
      ],
      correct: 2
    },
    {
      id: 2,
      question: "Hồ Chí Minh khẳng định đoàn kết là yếu tố nào của cách mạng?",
      options: [
        "Điều kiện phụ trợ",
        "Nhân tố hỗ trợ",
        "Then chốt của thành công",
        "Biện pháp linh hoạt"
      ],
      correct: 2
    },
    {
      id: 3,
      question: "Theo tư tưởng Hồ Chí Minh, cách mạng là sự nghiệp của ai?",
      options: [
        "Giai cấp công nhân",
        "Đảng Cộng sản",
        "Quần chúng nhân dân",
        "Nhà nước"
      ],
      correct: 2
    },
    {
      id: 4,
      question: "Đại đoàn kết dân tộc trong tư tưởng Hồ Chí Minh mang tính chất nào sau đây?",
      options: [
        "Tạm thời",
        "Linh hoạt theo giai đoạn",
        "Xuyên suốt, lâu dài",
        "Phụ thuộc hoàn cảnh"
      ],
      correct: 2
    },
    {
      id: 5,
      question: "Đối tượng của khối đại đoàn kết dân tộc là:",
      options: [
        "Công – nông – trí thức",
        "Các tầng lớp lao động",
        "Toàn thể nhân dân Việt Nam",
        "Những người cùng lý tưởng chính trị"
      ],
      correct: 2
    },
    {
      id: 6,
      question: "Hồ Chí Minh chủ trương đoàn kết những ai?",
      options: [
        "Người cùng giai cấp",
        "Người có cùng đảng phái",
        "Người yêu nước, vì dân tộc",
        "Người theo chủ nghĩa xã hội"
      ],
      correct: 2
    },
    {
      id: 7,
      question: "Cơ sở quan trọng nhất để xây dựng khối đại đoàn kết dân tộc là:",
      options: [
        "Quyền lợi kinh tế",
        "Sự lãnh đạo của Đảng",
        "Lòng yêu nước",
        "Ý thức giai cấp"
      ],
      correct: 2
    },
    {
      id: 8,
      question: "Nền tảng lợi ích của đại đoàn kết dân tộc là:",
      options: [
        "Lợi ích giai cấp",
        "Lợi ích cá nhân",
        "Lợi ích cục bộ",
        "Lợi ích tối cao của dân tộc"
      ],
      correct: 3
    },
    {
      id: 9,
      question: "Độc lập dân tộc trong tư tưởng Hồ Chí Minh gắn liền với:",
      options: [
        "Kinh tế thị trường",
        "Chủ nghĩa xã hội",
        "Dân chủ tư sản",
        "Hội nhập quốc tế"
      ],
      correct: 1
    },
    {
      id: 10,
      question: "Hình thức tổ chức cao nhất của khối đại đoàn kết dân tộc là:",
      options: [
        "Nhà nước",
        "Quốc hội",
        "Mặt trận dân tộc thống nhất",
        "Chính phủ"
      ],
      correct: 2
    },
    {
      id: 11,
      question: "Mặt trận dân tộc thống nhất hoạt động theo nguyên tắc nào?",
      options: [
        "Tập trung quyền lực",
        "Hiệp thương dân chủ",
        "Đa số quyết định",
        "Đấu tranh loại trừ"
      ],
      correct: 1
    },
    {
      id: 12,
      question: "Ai lãnh đạo Mặt trận dân tộc thống nhất?",
      options: [
        "Nhà nước",
        "Nhân dân",
        "Đảng Cộng sản Việt Nam",
        "Quốc hội"
      ],
      correct: 2
    },
    {
      id: 13,
      question: "Vì sao đại đoàn kết dân tộc là chiến lược quyết định thắng lợi của cách mạng?",
      options: [
        "Vì phù hợp xu thế quốc tế",
        "Vì tạo sức mạnh tổng hợp của dân tộc",
        "Vì giảm mâu thuẫn xã hội",
        "Vì dễ thực hiện"
      ],
      correct: 1
    },
    {
      id: 14,
      question: "Trong điều kiện nào đại đoàn kết dân tộc càng có ý nghĩa quan trọng?",
      options: [
        "Khi đất nước phát triển",
        "Khi kinh tế ổn định",
        "Khi cách mạng gặp khó khăn",
        "Khi hội nhập quốc tế"
      ],
      correct: 2
    },
    {
      id: 15,
      question: "Thực tiễn nào chứng minh rõ nhất vai trò của đại đoàn kết dân tộc?",
      options: [
        "Công nghiệp hóa",
        "Cách mạng Tháng Tám 1945",
        "Phát triển giáo dục",
        "Cải cách hành chính"
      ],
      correct: 1
    },
    {
      id: 16,
      question: "Nếu đại đoàn kết chỉ là sách lược nhất thời thì điều gì sẽ xảy ra?",
      options: [
        "Đoàn kết bền vững",
        "Khối đoàn kết tan rã sau mục tiêu",
        "Cách mạng phát triển mạnh",
        "Sức mạnh dân tộc tăng lên"
      ],
      correct: 1
    },
    {
      id: 17,
      question: "Hồ Chí Minh quan niệm đoàn kết phải được thực hiện trong giai đoạn nào?",
      options: [
        "Trước cách mạng",
        "Trong cách mạng",
        "Sau cách mạng",
        "Tất cả các giai đoạn"
      ],
      correct: 3
    },
    {
      id: 18,
      question: "Đại đoàn kết dân tộc có vai trò gì trong thời kỳ đổi mới hiện nay?",
      options: [
        "Không còn quan trọng",
        "Chỉ mang tính tinh thần",
        "Là nhân tố ổn định và phát triển đất nước",
        "Chỉ dùng trong chính trị"
      ],
      correct: 2
    },
    {
      id: 19,
      question: "Trong luận điểm \"Đại đoàn kết dân tộc là một chiến lược cách mạng\", từ \"chiến lược\" ở đây hàm chứa ý nghĩa nào sau đây?",
      options: [
        "Là một thủ đoạn chính trị cần thiết trong giai đoạn đối đầu với kẻ thù mạnh.",
        "Là biện pháp khôn khéo để lôi kéo các giai cấp trung gian về phía cách mạng.",
        "Là sự kết hợp nhất thời giữa các đảng phái có cùng mục tiêu đánh đuổi ngoại xâm.",
        "Là sợi chỉ đỏ xuyên suốt, quyết định thành bại trong cả giai đoạn cách mạng dân tộc và xây dựng chủ nghĩa xã hội."
      ],
      correct: 3
    },
    {
      id: 20,
      question: "Hồ Chí Minh đã giải quyết mối quan hệ giữa \"đoàn kết\" và \"đấu tranh\" trong nội bộ Mặt trận dân tộc thống nhất như thế nào để đảm bảo tính chiến lược?",
      options: [
        "Đoàn kết thông qua đấu tranh tự phê bình và phê bình để đi đến sự thống nhất mới cao hơn trên cơ sở lợi ích chung.",
        "Đấu tranh giai cấp triệt để là tiền đề, sau đó mới tiến hành đoàn kết dân tộc.",
        "Đấu tranh để loại bỏ những phần tử có tư tưởng khác biệt ra khỏi hàng ngũ.",
        "Đoàn kết không có đấu tranh, luôn nhân nhượng để giữ vững sự hòa khí trong Mặt trận."
      ],
      correct: 0
    }
  ]
};
