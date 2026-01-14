# 🚀 Quick Start

## 1️⃣ Setup Firebase (1 lần)

### Bước 1: Tạo Firebase Project
- Vào [Firebase Console](https://console.firebase.google.com/)
- Tạo project mới

### Bước 2: Tạo Firestore Database
- Firebase Console → Firestore Database → Create Database
- Chọn **Production mode**
- Chọn region gần nhất

### Bước 3: Thiết lập Rules
Vào tab **Rules** và paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /quizResults/{document=**} {
      allow read, write: if true;
    }
  }
}
```
Nhấp Publish

### Bước 4: Copy Firebase Config
1. Project Settings (⚙️) → General
2. Cuộn xuống "Your apps"
3. Chọn hoặc tạo Web app
4. Copy config

### Bước 5: Paste Config
Mở `src/config/firebase.js` và paste:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_KEY_HERE",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## 2️⃣ Chạy App

```bash
npm run dev
```

Truy cập `http://localhost:5173/quiz`

## 3️⃣ Thử Nghiệm

1. Nhập tên
2. Bắt đầu làm quiz
3. Trả lời câu hỏi
4. Nộp bài
5. Xem results
6. Nhấp "Xem bảng xếp hạng"

## 4️⃣ Kiểm tra Firebase

1. Firebase Console → Firestore Database
2. Xem collection `quizResults`
3. Mỗi user làm quiz sẽ tạo 1 document mới

---

## 📁 File Chính

| File | Chức năng |
|------|---------|
| `src/pages/Quiz.jsx` | Quiz + nhập tên |
| `src/pages/Results.jsx` | Xem kết quả chi tiết |
| `src/pages/Leaderboard.jsx` | Bảng xếp hạng |
| `src/config/firebase.js` | Firebase config |
| `src/App.jsx` | Router |

---

## ❓ FAQ

**Q: Làm sao để thêm câu hỏi?**
A: Mở `src/data/quizData.js` và thêm vào mảng `questions`

**Q: Làm sao để thay đổi thời gian?**
A: Chỉnh sửa `duration` trong `quizData.js` (tính bằng phút)

**Q: Dữ liệu được lưu ở đâu?**
A: Firebase Firestore Cloud Database

**Q: Tôi có thể tự host được không?**
A: Có, deploy lên Vercel, Netlify, hoặc server riêng

---

Enjoy! 🎉
