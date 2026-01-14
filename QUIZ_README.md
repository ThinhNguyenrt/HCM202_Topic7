# 📱 Quiz App - Multi-user với Leaderboard

## ✨ Tính năng

- **🧑‍💻 Multiple Users**: Mỗi người dùng nhập tên trước khi làm quiz
- **📊 Leaderboard**: Xem bảng xếp hạng toàn bộ người chơi, sắp xếp theo điểm + thời gian
- **📝 Quiz**: Làm quiz với timer, tự động lưu đáp án
- **📋 Results**: Xem chi tiết kết quả, số câu đúng/sai, đáp án
- **☁️ Cloud Storage**: Lưu tất cả dữ liệu trên Firebase Firestore

## 🏗️ Cấu trúc Thư mục

```
src/
├── pages/
│   ├── Quiz.jsx          # Màn hình quiz (nhập tên + làm bài)
│   ├── Results.jsx       # Màn hình xem kết quả chi tiết
│   └── Leaderboard.jsx   # Bảng xếp hạng
├── config/
│   └── firebase.js       # Firebase config
├── App.jsx               # Router chính
└── ...
```

## 🔄 Flow Ứng dụng

1. **Username Screen** → User nhập tên
2. **Intro Screen** → Xem mô tả bài quiz, bắt đầu
3. **Quiz Screen** → Làm bài với timer
4. **Results Screen** → Xem kết quả chi tiết & đáp án
5. **Leaderboard** → Xem top scores của tất cả mọi người

## 🚀 Cách Sử Dụng

### Làm Quiz
1. Truy cập `/quiz`
2. Nhập tên (tối thiểu 2 ký tự)
3. Nhấp "Bắt đầu làm bài"
4. Trả lời các câu hỏi
5. Nộp bài khi hoàn thành

### Xem Results
- Sau khi nộp bài, tự động chuyển đến Results page
- Xem điểm, số câu đúng/sai, thời gian
- Xem lại chi tiết từng câu (đáp án đúng vs bạn chọn)

### Xem Leaderboard
- Nhấp nút "🏆 Xem bảng xếp hạng" từ Results page
- Hoặc truy cập `/leaderboard` trực tiếp
- Xem top 100 người chơi

## 📊 Firebase Structure

Collection: `quizResults`

Mỗi document có cấu trúc:
```javascript
{
  username: "Tên người chơi",
  score: 80,              // Phần trăm
  correct: 8,             // Số câu đúng
  total: 10,              // Tổng câu
  timeTaken: 450,         // Giây
  answers: {              // Map câu → đáp án chọn
    0: 1,
    1: 2,
    ...
  },
  completedAt: "2024-01-14T10:30:00.000Z"
}
```

## 🔧 Routes

| Route | Màn hình |
|-------|---------|
| `/quiz` | Quiz + Results |
| `/results` | Xem chi tiết kết quả |
| `/leaderboard` | Bảng xếp hạng |

## 📝 Chỉnh sửa Quiz

Để thêm câu hỏi hoặc chỉnh sửa:

1. Mở `src/data/quizData.js`
2. Chỉnh sửa mảng `questions`
3. Mỗi question cần: `question`, `options`, `correct`

```javascript
{
  question: "Câu hỏi?",
  options: ["A", "B", "C", "D"],
  correct: 0  // Index của đáp án đúng
}
```

## ⚙️ Configuration

### Thay đổi thời gian làm bài

Mở `src/data/quizData.js`:
```javascript
duration: 5  // 5 phút (mặc định)
```

### Thay đổi Firebase Config

Mở `src/config/firebase.js` và update các giá trị từ Firebase Console

## 🛡️ Security (Production)

Hiện tại Firestore Rules cho phép tất cả mọi người đọc/ghi.

Cho production, cập nhật Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /quizResults/{document=**} {
      allow write: if request.auth != null;
      allow read: if true;
    }
  }
}
```

Hoặc hạn chế hơn:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /quizResults/{document=**} {
      allow create: if request.data.keys().hasAll(['username', 'score', 'correct', 'total', 'timeTaken', 'answers', 'completedAt']);
      allow read: if true;
    }
  }
}
```

## 🐛 Troubleshooting

### Không lưu được kết quả?
- Kiểm tra Firebase config
- Kiểm tra Firestore rules
- Mở DevTools (F12) xem console có lỗi gì

### Leaderboard trống?
- Cần phải có ít nhất 1 kết quả để hiển thị
- Kiểm tra Firestore collection `quizResults`

### Timer không hoạt động?
- Kiểm tra browser console
- Clear cache và reload

## 📱 Responsive Design

Ứng dụng hỗ trợ:
- 📱 Mobile
- 💻 Tablet
- 🖥️ Desktop

## 🎨 Styling

Sử dụng **Tailwind CSS** - các class đã được setup

## 📚 Tài liệu Thêm

- [Firebase Setup Guide](./FIREBASE_SETUP.md)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Happy Quizzing! 🎉**
