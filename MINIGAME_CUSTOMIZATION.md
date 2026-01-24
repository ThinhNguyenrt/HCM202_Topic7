# 🎮 Minigame - Customization Examples

## 📝 Example 1: Thay Đổi Điểm Số

### Từ: +10 điểm, -5 bom
### Sang: +20 điểm, -10 bom

**File**: `src/pages/MiniGame/MiniGame.jsx`

```javascript
// Line 90: Thay đổi điểm câu trả lời đúng
const points = isCorrect ? 20 : 0;  // +20 thay vì +10

// Line 131: Thay đổi phạt bom
setGroup1Score(prev => Math.max(0, prev - 10));  // -10 thay vì -5
setGroup2Score(prev => Math.max(0, prev - 10));
```

**Result**: 
- Correct: +20 → Final max: 190 (10 lượt × 19 câu)
- Wrong: 0 (không đổi)
- Bomb: -10 → Min penalty: -60 (10 × 6 bom)

---

## 📝 Example 2: Tăng Số Lượt Chơi

### Từ: 10 lượt
### Sang: 20 lượt (Nhóm 1: 1-19 lẻ, Nhóm 2: 2-20 chẵn)

**File**: `src/pages/MiniGame/MiniGame.jsx`

```javascript
// Line 12: Thay đổi tổng lượt
const TOTAL_TURNS = 20;  // 20 thay vì 10
```

**Impact**:
- Grid vẫn 25 ô
- Lượt chơi tăng
- Trò chơi dài hơn
- Scoreboard progress bar update tự động

---

## 📝 Example 3: Thay Đổi Số Bom

### Từ: 6 bom, 19 câu hỏi
### Sang: 10 bom, 15 câu hỏi

**File**: `src/data/minigameQuizData.js`

```javascript
// Line 248: Thay đổi số bom
export const initializeGame = () => {
  const cells = Array.from({ length: 25 }, (_, index) => ({
    id: index + 1,
    isBomb: false,
    isRevealed: false,
    questionId: null
  }));

  // Thay đổi từ 6 sang 10
  const bombPositions = new Set();
  while (bombPositions.size < 10) {  // 10 bom
    bombPositions.add(Math.floor(Math.random() * 25));
  }

  // ... rest of code
};
```

**Note**: 
- Cần có 15+ câu hỏi trong `minigameQuestions`
- Grid tự động điều chỉnh

---

## 📝 Example 4: Thêm Câu Hỏi Mới

### Thêm 5 câu hỏi về lãnh đạo Đảng

**File**: `src/data/minigameQuizData.js`

```javascript
export const minigameQuestions = [
  // ... câu hỏi cũ (1-19)
  
  // Thêm câu mới (20-24)
  {
    id: 20,
    question: "Vai trò của Đảng Cộng sản Việt Nam là gì?",
    options: [
      "Tổ chức lao động",
      "Lãnh đạo cách mạng",
      "Quản lý kinh tế",
      "Giáo dục toàn dân"
    ],
    correct: 1  // Đáp án B
  },
  {
    id: 21,
    question: "Đảng Cộng sản được thành lập vào năm nào?",
    options: [
      "1920",
      "1925",
      "1930",
      "1935"
    ],
    correct: 2  // Đáp án C
  },
  {
    id: 22,
    question: "Cơ sở lý luận của Đảng Cộng sản Việt Nam là gì?",
    options: [
      "Chủ nghĩa tư bản",
      "Chủ nghĩa xã hội khoa học",
      "Chủ nghĩa quốc xã",
      "Chủ nghĩa phát xít"
    ],
    correct: 1  // Đáp án B
  },
  {
    id: 23,
    question: "Hội nghị thành lập Đảng tại nơi nào?",
    options: [
      "Hà Nội",
      "Hồng Kông",
      "Thượng Hải",
      "Sài Gòn"
    ],
    correct: 2  // Đáp án C
  },
  {
    id: 24,
    question: "Tổng Bí thư đầu tiên của Đảng là ai?",
    options: [
      "Tôn Đức Thắng",
      "Trần Phú",
      "Hà Huy Tập",
      "Nguyễn Ái Quốc"
    ],
    correct: 1  // Đáp án B
  }
];
```

**Note**:
- ID phải unique
- correct index: 0=A, 1=B, 2=C, 3=D
- Câu hỏi nên rõ ràng

---

## 🎨 Example 5: Thay Đổi Màu Sắc

### Từ: Blue/Orange
### Sang: Purple/Cyan

**File**: `src/components/minigame/ScoreBoard.jsx`

```javascript
// Line 30: Nhóm 1 - từ blue sang purple
{isGroup1Turn
  ? 'bg-purple-500 shadow-lg scale-105'      // Từ: bg-blue-500
  : 'bg-purple-500/70'}                       // Từ: bg-blue-500/70

// Line 43: Nhóm 2 - từ orange sang cyan
{!isGroup1Turn
  ? 'bg-cyan-500 shadow-lg scale-105'         // Từ: bg-orange-500
  : 'bg-cyan-500/70'}                         // Từ: bg-orange-500/70
```

**File**: `src/components/minigame/Cell.jsx`

```javascript
// Line 14: Unrevealed cell color
'bg-gradient-to-br from-purple-500 to-purple-600 border-purple-700'  // Từ: blue

// Hover color
'hover:from-purple-600 hover:to-purple-700'  // Từ: blue
```

---

## 🎬 Example 6: Thêm Animation

### Thêm animation xoay (rotate) khi dính bom

**File**: `src/components/minigame/BombPopup.jsx`

```javascript
// Thêm custom animation vào className
<div
  className={`
    relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4
    ${shakeClass}
    animate-pulse  // Thêm pulse
    ${isShaking ? 'animate-spin' : ''}  // Thêm spin khi shake
  `}
>
```

**Hoặc** tạo custom animation trong `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      animation: {
        'bomb-explode': 'bombExplode 1s ease-in-out',
      },
      keyframes: {
        bombExplode: {
          '0%': { transform: 'scale(1) rotate(0deg)' },
          '50%': { transform: 'scale(1.2) rotate(10deg)' },
          '100%': { transform: 'scale(1) rotate(-10deg)' },
        },
      },
    },
  },
};
```

---

## 🔊 Example 7: Thêm Sound Effects

### Thêm âm thanh cho sự kiện

**File**: `src/pages/MiniGame/MiniGame.jsx`

```javascript
// Thêm vào đầu file
const sounds = {
  correct: '/sounds/correct.mp3',
  wrong: '/sounds/wrong.mp3',
  bomb: '/sounds/bomb.mp3',
  turnSwitch: '/sounds/turn.mp3'
};

const playSound = (type) => {
  try {
    const audio = new Audio(sounds[type]);
    audio.play();
  } catch (error) {
    console.log('Sound play error:', error);
  }
};

// Trong handleAnswerQuestion
const handleAnswerQuestion = (isCorrect) => {
  if (isCorrect) {
    playSound('correct');
  } else {
    playSound('wrong');
  }
  // ... rest of function
};

// Trong handleBombHit
const handleBombHit = () => {
  playSound('bomb');
  // ... rest of function
};

// Trong advanceTurn
const advanceTurn = () => {
  if (currentTurn < TOTAL_TURNS) {
    playSound('turnSwitch');
    setCurrentTurn(prev => prev + 1);
    // ...
  }
};
```

**Cần tạo thư mục**:
```
public/
└── sounds/
    ├── correct.mp3
    ├── wrong.mp3
    ├── bomb.mp3
    └── turn.mp3
```

---

## 🏆 Example 8: Thêm Leaderboard

### Lưu kết quả và hiển thị top scores

**File**: `src/pages/MiniGame/MiniGame.jsx`

```javascript
// Thêm vào cuối file
const saveGameResult = (group1Score, group2Score) => {
  const result = {
    id: Date.now(),
    date: new Date().toLocaleDateString('vi-VN'),
    group1: group1Score,
    group2: group2Score,
    winner: group1Score > group2Score ? 'Nhóm 1' : 
            group2Score > group1Score ? 'Nhóm 2' : 'Hòa',
    turns: TOTAL_TURNS
  };

  // Lấy kết quả cũ từ localStorage
  const savedResults = JSON.parse(localStorage.getItem('minigameResults') || '[]');
  
  // Thêm kết quả mới
  savedResults.push(result);
  
  // Lưu lại
  localStorage.setItem('minigameResults', JSON.stringify(savedResults));
};

// Gọi khi game kết thúc
const handleViewResults = () => {
  saveGameResult(group1Score, group2Score);
  
  const finalScore = {
    group1Score,
    group2Score,
    winner: group1Score > group2Score ? 1 : group2Score > group1Score ? 2 : 0
  };
  navigate('/results', { state: finalScore });
};
```

---

## 🎯 Example 9: Chế Độ Khó (Difficulty Mode)

### Thêm tùy chọn Easy/Normal/Hard

**File**: `src/pages/MiniGame/MiniGame.jsx`

```javascript
const [difficulty, setDifficulty] = useState('normal');

const getGameConfig = (level) => {
  const configs = {
    easy: { bombs: 3, turns: 8, points: 5 },
    normal: { bombs: 6, turns: 10, points: 10 },
    hard: { bombs: 8, turns: 12, points: 15 }
  };
  return configs[level];
};

// Trong welcome screen
<div className="mb-6">
  <h3 className="text-xl font-bold text-white mb-3">Chọn Độ Khó</h3>
  <div className="flex gap-3">
    {['easy', 'normal', 'hard'].map(level => (
      <button
        key={level}
        onClick={() => setDifficulty(level)}
        className={`px-6 py-2 rounded-lg font-bold ${
          difficulty === level 
            ? 'bg-green-500 text-white'
            : 'bg-gray-500 text-white hover:bg-gray-600'
        }`}
      >
        {level === 'easy' ? 'Dễ' : level === 'normal' ? 'Bình Thường' : 'Khó'}
      </button>
    ))}
  </div>
</div>

// Trong handleStartGame
const handleStartGame = () => {
  const config = getGameConfig(difficulty);
  const initialCells = initializeGame(config.bombs);
  setGameStarted(true);
  // ...
};
```

---

## 🔐 Example 10: Admin Mode

### Chế độ xem câu hỏi trước

**File**: `src/pages/MiniGame/MiniGame.jsx`

```javascript
const [adminMode, setAdminMode] = useState(false);

// Thêm phím tắt (e.g., Ctrl+Shift+A)
useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
      setAdminMode(!adminMode);
    }
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [adminMode]);

// Hiển thị đáp án khi admin mode
{adminMode && gameState && selectedCell !== null && (
  <div className="fixed top-4 right-4 bg-yellow-400 p-4 rounded-lg">
    <p className="font-bold">
      Đáp án: {gameState[selectedCell].isBomb ? '💣 BOM' : 
      question.options[question.correct]}
    </p>
  </div>
)}
```

---

## 📊 Example 11: Statistics Tracking

### Theo dõi thống kê chơi

**File**: Tạo file mới `src/hooks/useGameStats.js`

```javascript
import { useState, useEffect } from 'react';

export const useGameStats = () => {
  const [stats, setStats] = useState({
    totalGames: 0,
    group1Wins: 0,
    group2Wins: 0,
    ties: 0,
    averageScore: 0
  });

  const updateStats = (group1Score, group2Score) => {
    const results = JSON.parse(localStorage.getItem('minigameResults') || '[]');
    
    setStats({
      totalGames: results.length,
      group1Wins: results.filter(r => r.group1 > r.group2).length,
      group2Wins: results.filter(r => r.group2 > r.group1).length,
      ties: results.filter(r => r.group1 === r.group2).length,
      averageScore: (results.reduce((a, b) => a + b.group1 + b.group2, 0) / (results.length * 2)) || 0
    });
  };

  return { stats, updateStats };
};
```

---

## 🌍 Example 12: Multi-Language Support

### Thêm hỗ trợ tiếng Anh

**File**: Tạo file mới `src/i18n/translations.js`

```javascript
export const translations = {
  vi: {
    startButton: 'Bắt Đầu Trò Chơi',
    correctAnswer: 'Chính xác! +10 điểm',
    wrongAnswer: 'Sai rồi! 0 điểm',
    bombHit: 'Đã dính bom! Bị trừ 5 điểm',
    endTurn: 'Kết Thúc Lượt',
    group1: 'Nhóm 1',
    group2: 'Nhóm 2',
    turn: 'Lượt'
  },
  en: {
    startButton: 'Start Game',
    correctAnswer: 'Correct! +10 points',
    wrongAnswer: 'Wrong! 0 points',
    bombHit: 'Hit a bomb! -5 points',
    endTurn: 'End Turn',
    group1: 'Group 1',
    group2: 'Group 2',
    turn: 'Turn'
  }
};

export const useTranslation = (lang = 'vi') => {
  return translations[lang];
};
```

---

## 🔗 Quick Links to Files

| Component | File | Purpose |
|-----------|------|---------|
| Main Game | `src/pages/MiniGame/MiniGame.jsx` | Game logic & layout |
| Grid Cell | `src/components/minigame/Cell.jsx` | Individual cells |
| Scoreboard | `src/components/minigame/ScoreBoard.jsx` | Score display |
| Questions | `src/components/minigame/QuestionModal.jsx` | Question modal |
| Bombs | `src/components/minigame/BombPopup.jsx` | Bomb notification |
| Data | `src/data/minigameQuizData.js` | Questions & init |
| Config | `tailwind.config.js` | Styling config |

---

**Happy Customizing! 🎉**

