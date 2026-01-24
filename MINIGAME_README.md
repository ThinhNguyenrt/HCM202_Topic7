# 🎮 Minigame - Tư Tưởng Hồ Chí Minh Về Đại Đoàn Kết Dân Tộc

Một trò chơi thuyết trình interactif 2 nhóm trên lưới 5x5 với 10 lượt chơi, được xây dựng bằng React, TailwindCSS, và Firebase Firestore.

## ✨ Tính Năng Chính

### 1. **Game Logic & State Management**

#### Grid & Cells
- **Lưới 5x5**: 25 ô tổng cộng
- **Phân bố ô**:
  - 6 ô **Bom** (vị trí ngẫu nhiên)
  - 19 ô **Câu hỏi** (vị trí ngẫu nhiên)

#### Turn-based System
- **Tổng 10 lượt chơi**
  - Lượt 1, 3, 5, 7, 9: **Nhóm 1**
  - Lượt 2, 4, 6, 8, 10: **Nhóm 2**
- **Tự động chuyển lượt** sau khi mỗi ô được xử lý
- **Không thể click lại** ô đã chơi

#### Hệ Thống Điểm
- ✓ **Trả lời đúng**: +10 điểm
- ✗ **Trả lời sai**: 0 điểm
- 💣 **Dính Bom**: -5 điểm
- **Nhóm nào nhiều điểm hơn** sẽ chiến thắng

### 2. **UI/UX Components (TailwindCSS)**

#### Main Dashboard
```
┌─ ScoreBoard ─────────────────────┐
│ Lượt 1/10 | Nhóm 1 (Turn)        │
│ Nhóm 1: [Score] | Nhóm 2: [Score]│
└─────────────────────────────────┘

┌─ Game Grid ──────────────────────┐
│ [1] [2] [3] [4] [5]              │
│ [6] [7] [8] [9] [10]             │
│ ...                              │
│ [21] [22] [23] [24] [25]        │
└─────────────────────────────────┘
```

#### Modals

**Question Modal**
- Overlay làm mờ nền
- Hiển thị câu hỏi + 4 đáp án (A, B, C, D)
- Feedback tức thì: Xanh (Đúng) / Đỏ (Sai)
- Nút "Kết Thúc Lượt" để cập nhật điểm

**Bomb Popup**
- Hiệu ứng rung lắc (bounce animation)
- Icon 💣 và thông báo "NỔ BOM!"
- Thông báo trừ 5 điểm

### 3. **Component Structure**

```
src/
├── pages/
│   └── MiniGame/
│       └── MiniGame.jsx          # Main game page & logic
├── components/minigame/
│   ├── Cell.jsx                   # Individual grid cell
│   ├── ScoreBoard.jsx             # Score display & turn info
│   ├── QuestionModal.jsx          # Question popup modal
│   └── BombPopup.jsx              # Bomb hit popup
└── data/
    └── minigameQuizData.js        # Game questions & init function
```

## 🚀 Cách Sử Dụng

### Bắt Đầu Trò Chơi

1. **Truy cập**: `/minigame` từ Navbar
2. **Xem luật chơi** trên màn hình chào mừng
3. **Click "Bắt Đầu Trò Chơi"** để khởi động

### Luồng Chơi

1. **Lượt 1** (Nhóm 1):
   - Click vào một ô
   - Nếu là **câu hỏi**: Trả lời 4 tùy chọn
   - Nếu là **bom**: Nhận cảnh báo, trừ 5 điểm
   - Click "Kết Thúc Lượt" để chuyển sang Nhóm 2

2. **Lặp lại** cho các lượt tiếp theo

3. **Sau lượt 10**:
   - Hiển thị nút "Xem Kết Quả"
   - Điều hướng tới màn hình tổng kết (Winner)

## 📊 Cấu Trúc Dữ Liệu

### Game State
```javascript
// Trong component MiniGame
const [gameState, setGameState] = useState(null);
// gameState = [
//   {
//     id: 1,
//     isBomb: false,
//     isRevealed: false,
//     questionId: 1
//   },
//   ...
// ]

const [currentTurn, setCurrentTurn] = useState(1);
const [group1Score, setGroup1Score] = useState(0);
const [group2Score, setGroup2Score] = useState(0);
```

### Quiz Question Format
```javascript
{
  id: 1,
  question: "Theo Hồ Chí Minh, đại đoàn kết dân tộc là gì?",
  options: [
    "Biện pháp tình thế trong cách mạng",
    "Giải pháp tạm thời khi gặp khó khăn",
    "Đường lối chiến lược của cách mạng Việt Nam",
    "Phương pháp vận động quần chúng ngắn hạn"
  ],
  correct: 2  // Index of correct answer (0-3)
}
```

## 🛠️ Các Hàm Chính

### `minigameQuizData.js`

#### `initializeGame()`
```javascript
// Khởi tạo grid 5x5 với 6 bom ngẫu nhiên
const cells = initializeGame();
// Return: Array[25] với mỗi phần tử có id, isBomb, isRevealed, questionId
```

#### `getQuestionById(questionId)`
```javascript
// Lấy câu hỏi theo ID
const question = getQuestionById(1);
```

### `MiniGame.jsx` - Event Handlers

#### `handleStartGame()`
- Khởi tạo grid
- Reset scores
- Bắt đầu trò chơi

#### `handleCellClick(cellIndex)`
- Xác định ô được click
- Mở Modal (Question hoặc Bomb)

#### `handleAnswerQuestion(isCorrect)`
- Cập nhật điểm
- Đánh dấu ô đã chơi
- Chuyển lượt

#### `handleBombHit()`
- Trừ 5 điểm
- Đánh dấu ô đã chơi
- Chuyển lượt

#### `advanceTurn()`
- Tăng `currentTurn`
- Nếu `currentTurn > TOTAL_TURNS` → Game kết thúc

## 🎨 Styling & Design

### Color Scheme
- **Primary**: Blue (Nhóm 1) & Orange (Nhóm 2)
- **Success**: Green (#22C55E)
- **Danger**: Red (#EF4444)
- **Background**: Gradient slate-purple

### Animations
- **Hover**: Scale 110%, Shadow glow
- **Bomb**: Bounce animation
- **Feedback**: Fade in transition

### Responsive Design
- **Mobile**: Single column grid
- **Tablet**: 2-3 columns
- **Desktop**: Full 5x5 grid

## 📦 Dependencies

- **React 19.2.0**: Core framework
- **React Router 7.12.0**: Navigation
- **TailwindCSS 3.4.19**: Styling
- **Lucide React 0.562.0**: Icons
- **Framer Motion**: Animation (optional)
- **Firebase 12.7.0**: Backend (future integration)

## 🔗 Routes

```
/minigame              - Main game page
/results               - Results page (after game ends)
/leaderboard          - Leaderboard (optional)
/statistics           - Statistics (optional)
```

## 🚀 Cải Tiến Trong Tương Lai

### Phase 1 (Hiện tại)
- [x] Game logic cơ bản
- [x] UI/UX components
- [x] Turn-based system
- [x] Scoring system

### Phase 2 (Firebase Integration)
- [ ] Lưu game state trên Firestore
- [ ] Real-time sync giữa màn hình Admin & Viewer
- [ ] Lưu lịch sử games
- [ ] Leaderboard toàn cầu

### Phase 3 (Advanced Features)
- [ ] Chế độ chơi khó (more questions)
- [ ] Power-ups (Skip, Double points)
- [ ] Sound effects
- [ ] Particle effects
- [ ] Multiplayer real-time

## 📝 Hướng Dẫn Phát Triển

### Thêm Câu Hỏi Mới
Chỉnh sửa `src/data/minigameQuizData.js`:
```javascript
export const minigameQuestions = [
  {
    id: 20,  // New ID
    question: "Câu hỏi mới?",
    options: ["A", "B", "C", "D"],
    correct: 0  // Index của đáp án đúng
  },
  // ...
];
```

### Chỉnh Sửa Điểm Số
`src/pages/MiniGame/MiniGame.jsx`:
```javascript
const points = isCorrect ? 10 : 0;  // Chỉnh sửa giá trị điểm
```

### Thay Đổi Số Lượt Chơi
`src/pages/MiniGame/MiniGame.jsx`:
```javascript
const TOTAL_TURNS = 10;  // Chỉnh sửa số lượt
```

## 📞 Support

Nếu gặp vấn đề, kiểm tra:
1. Console dev tools (F12)
2. Đảm bảo tất cả dependencies đã cài đặt
3. Clear cache & reload browser
4. Kiểm tra Firebase config nếu cần tích hợp

---

**Last Updated**: January 24, 2026
**Version**: 1.0.0 (Beta)
