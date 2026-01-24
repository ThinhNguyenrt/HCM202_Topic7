# 🎮 Minigame - Quick Reference

## 📌 Truy Cập Game

```
URL: http://localhost:5173/minigame
Navbar: Click "Minigame"
```

## 🎯 Luật Chơi Nhanh

| Phần | Chi Tiết |
|------|---------|
| **Grid** | 5x5 (25 ô) |
| **Ô Bom** | 6 ô (vị trí ngẫu nhiên) |
| **Ô Câu Hỏi** | 19 ô |
| **Lượt Chơi** | 10 lượt (5 nhóm 1, 5 nhóm 2) |
| **Trả lời đúng** | +10 điểm |
| **Trả lời sai** | 0 điểm |
| **Dính Bom** | -5 điểm |
| **Chiến thắng** | Nhóm có nhiều điểm hơn |

## 🎮 Luồng Trò Chơi

```
1. Click "Bắt Đầu Trò Chơi"
   ↓
2. Lượt 1 (Nhóm 1): Click ô → Trả lời câu hỏi/Dính bom → Lưu điểm
   ↓
3. Lượt 2 (Nhóm 2): Click ô → Trả lời câu hỏi/Dính bom → Lưu điểm
   ↓
4. Repeat lượt 3-10
   ↓
5. Hiển thị nút "Xem Kết Quả"
   ↓
6. Trang tổng kết (Winner Screen)
```

## 📂 File Structure

```
src/
├── pages/MiniGame/MiniGame.jsx          (Game logic & UI)
├── components/minigame/
│   ├── Cell.jsx                         (Grid cells)
│   ├── ScoreBoard.jsx                   (Score display)
│   ├── QuestionModal.jsx                (Question popup)
│   └── BombPopup.jsx                    (Bomb notification)
└── data/minigameQuizData.js             (Questions & init)
```

## ⚙️ Cấu Hình

### Số Lượt Chơi
**File**: `src/pages/MiniGame/MiniGame.jsx`
```javascript
const TOTAL_TURNS = 10;  // Thay đổi số lượt
```

### Điểm Số
**File**: `src/pages/MiniGame/MiniGame.jsx`
```javascript
const points = isCorrect ? 10 : 0;  // Điểm trả lời đúng (line 90)
if (currentGroup === 1) {
  setGroup1Score(prev => Math.max(0, prev - 5));  // Trừ điểm bom (line 131)
}
```

### Số Bom
**File**: `src/data/minigameQuizData.js`
```javascript
while (bombPositions.size < 6) {  // Số bom (line 248)
  bombPositions.add(Math.floor(Math.random() * 25));
}
```

### Câu Hỏi
**File**: `src/data/minigameQuizData.js` (line 130+)
```javascript
export const minigameQuestions = [
  {
    id: 1,
    question: "Câu hỏi?",
    options: ["A", "B", "C", "D"],
    correct: 2  // Index đáp án đúng (0-3)
  },
  // Thêm câu hỏi mới ở đây
];
```

## 🎨 Styling

### Colors
- **Nhóm 1**: Blue (`from-blue-600 to-indigo-600`)
- **Nhóm 2**: Orange (`from-orange-500 to-red-500`)
- **Đúng**: Green (`bg-green-400`)
- **Sai**: Red (`bg-red-500`)

### Animations
- Hover: `scale-105`
- Bounce: `animate-bounce`
- Pulse: `animate-pulse`

## 🔧 Common Tasks

### Thay Đổi Màu Nhóm 1
**File**: `src/components/minigame/ScoreBoard.jsx` (line 30)
```javascript
// Từ:
<div className={`rounded-lg p-4 transition-all duration-300 ${
  isGroup1Turn
    ? 'bg-blue-500 shadow-lg scale-105'
    : 'bg-blue-500/70'
}`}>
// Sang:
<div className={`rounded-lg p-4 transition-all duration-300 ${
  isGroup1Turn
    ? 'bg-purple-500 shadow-lg scale-105'
    : 'bg-purple-500/70'
}`}>
```

### Thay Đổi Màu Nhóm 2
**File**: `src/components/minigame/ScoreBoard.jsx` (line 43)
```javascript
// Từ:
<div className={`rounded-lg p-4 transition-all duration-300 ${
  !isGroup1Turn
    ? 'bg-orange-500 shadow-lg scale-105'
    : 'bg-orange-500/70'
}`}>
// Sang:
<div className={`rounded-lg p-4 transition-all duration-300 ${
  !isGroup1Turn
    ? 'bg-green-500 shadow-lg scale-105'
    : 'bg-green-500/70'
}`}>
```

### Thêm Sound Effect (Future)
```javascript
// Trong MiniGame.jsx
const playSound = (type) => {
  // 'correct', 'wrong', 'bomb'
  const sounds = {
    correct: '/sounds/correct.mp3',
    wrong: '/sounds/wrong.mp3',
    bomb: '/sounds/bomb.mp3'
  };
  new Audio(sounds[type]).play();
};

// Gọi trong handleAnswerQuestion
if (isCorrect) {
  playSound('correct');
} else {
  playSound('wrong');
}
```

### Thêm Leaderboard (Future)
```javascript
// Lưu scores sau game kết thúc
const saveGameResult = async (group1Score, group2Score) => {
  const result = {
    date: new Date(),
    group1Score,
    group2Score,
    winner: group1Score > group2Score ? 1 : 2,
    totalTurns: TOTAL_TURNS
  };
  // Lưu vào Firebase hoặc localStorage
  localStorage.setItem('minigameResults', JSON.stringify(result));
};
```

## 🐛 Troubleshooting

### Game không load
- Check console (F12)
- Reload browser
- Clear cache
- Check `minigameQuizData.js` path

### Scoring không cập nhật
- Check `handleAnswerQuestion()` function
- Verify `setGroup1Score()` & `setGroup2Score()` calls
- Check `currentTurn` calculation

### Modal không đóng
- Click "Kết Thúc Lượt"
- Check `onClose` prop
- Verify state management

### Animation không chạy
- Check TailwindCSS configured
- Verify `animate-bounce` class
- Check CSS file imported

## 📞 Useful Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Check lint errors
npm run lint

# Format code
npx prettier --write src/
```

## 📚 Dependencies

```json
{
  "react": "^19.2.0",
  "react-router-dom": "^7.12.0",
  "lucide-react": "^0.562.0",
  "tailwindcss": "^3.4.19"
}
```

## ✨ Tips & Tricks

1. **Random Grid**: Mỗi game khác nhau vì `initializeGame()` shuffle
2. **No Replay**: Ô không thể bấm lại vì `isRevealed` check
3. **Auto Turn**: `advanceTurn()` tự động gọi sau mỗi action
4. **Realtime Score**: State update ngay lập tức
5. **Progress Bar**: `(currentTurn / TOTAL_TURNS) * 100` cho width

## 🚀 Performance Tips

- Component tách rõ → dễ optimize
- Props drilling tối thiểu
- Event handlers optimized
- CSS animations only (no JS)
- Modal lazy render (only when open)

---

**Last Updated**: January 24, 2026  
**Version**: 1.0.0
