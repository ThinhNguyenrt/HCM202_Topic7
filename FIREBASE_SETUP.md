# Hướng dẫn Setup Firebase cho Quiz App

## 1. Tạo Firebase Project

1. Truy cập [Firebase Console](https://console.firebase.google.com/)
2. Nhấp **Create a new project** hoặc chọn project hiện có
3. Nhập tên project và tiếp tục

## 2. Thêm Firestore Database

1. Trong Firebase Console, chọn **Firestore Database** từ menu bên trái
2. Nhấp **Create database**
3. Chọn **Start in production mode** (hoặc test mode nếu đang phát triển)
4. Chọn vị trí gần nhất
5. Nhấp **Create**

## 3. Thiết lập Security Rules

1. Vào tab **Rules** trong Firestore
2. Thay thế nội dung hiện tại bằng code dưới đây:

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

⚠️ **Lưu ý**: Rules này cho phép mọi người đọc/ghi. Chỉ dùng cho phát triển. Cho production, cần tăng security!

3. Nhấp **Publish**

## 4. Lấy Firebase Config

1. Trong Firebase Console, nhấp vào ⚙️ **Project Settings**
2. Vào tab **General**
3. Cuộn xuống mục **Your apps** 
4. Tìm hoặc tạo một **Web app** (biểu tượng `</>`
5. Copy toàn bộ config object

Nó sẽ trông như thế này:
```javascript
{
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
}
```

## 5. Cập nhật Firebase Config

1. Mở file `src/config/firebase.js`
2. Thay đổi các giá trị **YOUR_API_KEY**, **YOUR_AUTH_DOMAIN**, v.v. bằng giá trị từ bước trên

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...", // Thay bằng API key của bạn
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

3. Lưu file

## 6. Chạy ứng dụng

```bash
npm run dev
```

Truy cập vào `/quiz` và thử làm quiz!

## 7. Xem dữ liệu trong Firebase

- Vào Firebase Console > Firestore Database
- Xem collection **quizResults** để kiểm tra kết quả
- Mỗi document chứa: `username`, `score`, `correct`, `total`, `timeTaken`, `answers`, `completedAt`

## Các tính năng đã setup:

✅ **Nhập tên trước khi làm quiz**
✅ **Làm quiz bình thường với timer**
✅ **Lưu kết quả vào Firebase**
✅ **Xem chi tiết kết quả (đúng/sai, thời gian, đáp án)**
✅ **Xem bảng xếp hạng toàn bộ người chơi**
✅ **Thống kê leaderboard (top 100, điểm cao nhất, v.v.)**

---

## Troubleshooting

### Lỗi: "Permission denied"
- Kiểm tra Security Rules đã được thiết lập chưa
- Chắc chắn là Firestore Database đã được tạo

### Không thấy dữ liệu trên Firebase Console
- Kiểm tra console browser (F12) xem có lỗi gì không
- Chắc chắn `firebase.js` config đúng

### Leaderboard trống
- Cần phải có ít nhất 1 user làm xong quiz để hiện dữ liệu
- Kiểm tra collection `quizResults` trong Firestore

---

Hết! Ứng dụng của bạn giờ đã setup xong Firebase! 🎉
