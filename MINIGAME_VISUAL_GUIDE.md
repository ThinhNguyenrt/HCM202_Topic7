# 🎮 Minigame - Visual Guide & Flowchart

## 🎬 Game Flow Visualization

### Welcome Screen
```
┌─────────────────────────────────────────────┐
│                                             │
│    ⚡ Minigame Thuyết Trình ⚡            │
│                                             │
│   Tư Tưởng Hồ Chí Minh về                │
│   Đại Đoàn Kết Dân Tộc                   │
│                                             │
│        ┌─────────────────────┐            │
│        │ 📌 LUẬT CHƠI        │            │
│        ├─────────────────────┤            │
│        │ • 25 ô (5x5)        │            │
│        │ • 6 bom, 19 câu     │            │
│        │ • 10 lượt, 2 nhóm   │            │
│        │ • +10 đúng, -5 bom  │            │
│        └─────────────────────┘            │
│                                             │
│        [🎮 Bắt Đầu Trò Chơi 🎮]          │
│                                             │
└─────────────────────────────────────────────┘
```

### Game Screen
```
┌─────────────────────────────────────────────┐
│  Minigame - Tư Tưởng Hồ Chí Minh          │
│  Lượt 1/10                                  │
├─────────────────────────────────────────────┤
│  ┌───────────────────────────────────────┐  │
│  │ 🔴 Lượt 1: Nhóm 1 | Nhóm 1: 30      │  │
│  │ Nhóm 2: 20                          │  │
│  │ ████████░░░░░░░░ 10%                │  │
│  └───────────────────────────────────────┘  │
│                                             │
│  ┌───────────────────────────────────────┐  │
│  │  [1]  [2]  [3]  [4]  [5]             │  │
│  │  [6]  [7]  [🌟] [9]  [10]            │  │
│  │  [11] [12] [13] [14] [15]            │  │
│  │  [16] [17] [18] [💣] [20]            │  │
│  │  [21] [22] [23] [24] [25]            │  │
│  └───────────────────────────────────────┘  │
│                                             │
│                  [⬅️ Thoát]                 │
└─────────────────────────────────────────────┘
```

### Question Modal
```
┌──────────────────────────────────────┐
│ ╳                                     │
├──────────────────────────────────────┤
│                                      │
│  Câu hỏi: "Theo Hồ Chí Minh,        │
│  đại đoàn kết dân tộc là gì?"       │
│                                      │
│  ☐ A. Biện pháp tình thế             │
│  ☑ B. Đường lối chiến lược ✓        │
│  ☐ C. Giải pháp tạm thời            │
│  ☐ D. Phương pháp vận động           │
│                                      │
│  ✓ Chính xác! +10 điểm              │
│                                      │
│      [Kết Thúc Lượt →]              │
│                                      │
└──────────────────────────────────────┘
```

### Bomb Popup
```
┌──────────────────────────────────────┐
│                                      │
│            💣                         │
│         ⚠️ NỔ BOM! ⚠️              │
│                                      │
│    Đã dính bom! Bị trừ 5 điểm       │
│                                      │
│       [Kết Thúc Lượt →]             │
│                                      │
└──────────────────────────────────────┘
```

### Results Screen
```
┌──────────────────────────────────────┐
│         🎉 Trò Chơi Kết Thúc! 🎉    │
├──────────────────────────────────────┤
│                                      │
│    Nhóm 1        🏆       Nhóm 2     │
│    [85]                   [72]       │
│                                      │
│  🥇 Nhóm 1 chiến thắng!              │
│                                      │
│  [Xem Kết Quả]    [Chơi Lại]        │
│                                      │
└──────────────────────────────────────┘
```

---

## 🔄 Turn Progression

```
Start Game
    ↓
Lượt 1 (Nhóm 1) → Click cell → Answer → +10/0/-5 → Advance
    ↓
Lượt 2 (Nhóm 2) → Click cell → Answer → +10/0/-5 → Advance
    ↓
Lượt 3 (Nhóm 1) → Click cell → Answer → +10/0/-5 → Advance
    ↓
Lượt 4 (Nhóm 2) → Click cell → Answer → +10/0/-5 → Advance
    ↓
Lượt 5 (Nhóm 1) → Click cell → Answer → +10/0/-5 → Advance
    ↓
Lượt 6 (Nhóm 2) → Click cell → Answer → +10/0/-5 → Advance
    ↓
Lượt 7 (Nhóm 1) → Click cell → Answer → +10/0/-5 → Advance
    ↓
Lượt 8 (Nhóm 2) → Click cell → Answer → +10/0/-5 → Advance
    ↓
Lượt 9 (Nhóm 1) → Click cell → Answer → +10/0/-5 → Advance
    ↓
Lượt 10 (Nhóm 2) → Click cell → Answer → +10/0/-5 → Advance
    ↓
Game Finished → Show Results → Winner Announced
```

---

## 📊 Scoring System

```
Per Turn:
┌─────────────────────────────┐
│ Cell Type  │ Action  │ Score│
├─────────────────────────────┤
│ Question   │ Correct │ +10  │
│ Question   │ Wrong   │ 0    │
│ Bomb       │ Hit     │ -5   │
└─────────────────────────────┘

Example (10 Turns):
Nhóm 1: 7 correct + 2 wrong + 1 bomb = 70 + 0 - 5 = 65 points
Nhóm 2: 6 correct + 3 wrong + 1 bomb = 60 + 0 - 5 = 55 points
Winner: Nhóm 1 (65 > 55)
```

---

## 🎯 Grid Visualization

### Initial State (Example)
```
[1]  [2]  [3]  [4]  [💣]
[6]  [💣] [8]  [9]  [10]
[11] [12] [13] [14] [15]
[16] [17] [💣] [19] [20]
[21] [22] [23] [24] [💣]

Bombs: 6 (cells 5, 6, 18, 25 visible)
Questions: 19 (cells 1,2,3,4,7,8,9,10,11,12,13,14,15,16,17,19,20,21,22,23,24)
```

### Mid-Game State (Example)
```
[✓]  [✗]  [3]  [4]  [💥]
[6]  [💥] [✓]  [9]  [✓]
[11] [12] [13] [14] [15]
[✓]  [17] [💥] [19] [20]
[21] [22] [23] [24] [💥]

✓ = Answered correctly
✗ = Answered wrong
💥 = Bombed
□ = Not yet played
```

---

## 🎨 Color Palette

### Game UI Colors
```
Background:      from-slate-900 via-purple-900 to-slate-900
Primary:         from-blue-600 to-indigo-600 (Nhóm 1)
Secondary:       from-orange-500 to-red-500 (Nhóm 2)
Success:         bg-green-400 (Correct)
Danger:          bg-red-500 (Wrong/Bomb)
Info:            bg-purple-600 (Main container)
Accent:          yellow-400 (Highlights)
```

### Cell States
```
Unrevealed:  bg-blue-500/600 (Blue gradient)
Correct:     bg-green-400 (Green)
Wrong:       bg-gray-400 (Gray)
Bomb:        bg-red-500 (Red)
Hover:       scale-110 (Grows on hover)
```

---

## 📱 Responsive Layout

### Mobile (< 640px)
```
┌─────────────┐
│ Header (sm) │
├─────────────┤
│ ScoreBoard  │
├─────────────┤
│  Grid       │
│  [1][2][3]  │
│  [4][5][6]  │
│  ...        │
│  [23][24][25] │
├─────────────┤
│ Controls    │
└─────────────┘
```

### Tablet (640px - 1024px)
```
┌──────────────────────┐
│ Header               │
├──────────────────────┤
│ ScoreBoard           │
├──────────────────────┤
│ Grid (2-3 columns)   │
│ [1] [2] [3] [4]      │
│ [5] [6] [7] [8]      │
│ ...                  │
│ [21][22][23][24][25] │
├──────────────────────┤
│ Controls             │
└──────────────────────┘
```

### Desktop (> 1024px)
```
┌──────────────────────────────────────┐
│ Header - Minigame - Lượt 1/10        │
├──────────────────────────────────────┤
│ ScoreBoard (Full Width)              │
├──────────────────────────────────────┤
│ Grid (5x5)                           │
│  [1]  [2]  [3]  [4]  [5]             │
│  [6]  [7]  [8]  [9]  [10]            │
│  [11] [12] [13] [14] [15]            │
│  [16] [17] [18] [19] [20]            │
│  [21] [22] [23] [24] [25]            │
├──────────────────────────────────────┤
│ Controls                             │
└──────────────────────────────────────┘
```

---

## 🔄 State Transition Diagram

```
┌──────────────────┐
│  Initial State   │
│  gameStarted:F   │
│  gameState:null  │
└────────┬─────────┘
         │ [Click "Start"]
         ▼
┌──────────────────┐
│  Welcome Screen  │
│  Show rules      │
└────────┬─────────┘
         │ [Confirm]
         ▼
┌──────────────────┐
│   Game Running   │
│  gameStarted:T   │
│  currentTurn:1   │
│  grid:[25 cells] │
└────────┬─────────┘
         │ [Click Cell]
         ├─ Question → Modal opens
         │            Answer given
         │            Score updated
         │            Turn advances
         │
         └─ Bomb → Popup shows
                    Penalty applied
                    Turn advances
         │
         ▼
    Is Turn 10?
         │
    No  │ Yes
         │  │
         ▼  ▼
      Repeat  ┌──────────────┐
              │ Game Finished│
              │ Results Show │
              └───┬──────┬───┘
                  │      │
         [Results] │      │ [Replay]
                  ▼      ▼
            Results Pg  Reset
```

---

## 🎯 User Interaction Points

### Click Targets
```
1. Welcome Screen
   └─ "Bắt Đầu Trò Chơi" button

2. Game Screen
   ├─ Grid cells (1-25)
   └─ "Thoát" button

3. Question Modal
   ├─ Answer options (A, B, C, D)
   └─ "Kết Thúc Lượt" button

4. Bomb Popup
   └─ "Kết Thúc Lượt" button

5. Results Screen
   ├─ "Xem Kết Quả" button
   └─ "Chơi Lại" button
```

---

## 📈 Progress Indicators

### Turn Progress
```
Lượt 1/10:  ████████░░░░░░░░░░░░░░░░░░ 10%
Lượt 5/10:  ████████████████░░░░░░░░░░░░ 50%
Lượt 10/10: ████████████████████████████ 100%
```

### Score Display
```
Before Game:
┌─ Nhóm 1: 0    Nhóm 2: 0 ─┐

Mid Game:
┌─ Nhóm 1: 30   Nhóm 2: 20 ─┐ (Nhóm 1 turn)

End Game:
┌─ Nhóm 1: 65   Nhóm 2: 55 ─┐ (Nhóm 1 wins)
```

---

## 🎬 Animation Sequence

### Cell Click
```
1. Mouse hover    → Cell scales up (scale-110)
2. Mouse click    → Cell transitions
3. Reveal state   → Shows icon (✓ or 💣)
4. Color change   → Green (correct) or Red (bomb)
```

### Bomb Hit
```
1. Modal opens    → Fade in
2. Icon appears   → 💣
3. Animation      → Bounce (up-down)
4. Message        → Fade in
5. Close button   → Click to end turn
```

### Modal Transition
```
1. Background     → Overlay appears (black/60%)
2. Modal          → Fade in + scale
3. Content        → Fade in
4. Buttons        → Interactive
5. Close          → Fade out + scale
```

---

## 🏆 Winning Logic

```
After 10 turns:
Calculate Final Scores
    │
    ├─ Nhóm 1 Score > Nhóm 2 Score
    │  └─ Winner: Nhóm 1 🥇
    │
    ├─ Nhóm 2 Score > Nhóm 1 Score
    │  └─ Winner: Nhóm 2 🥇
    │
    └─ Nhóm 1 Score = Nhóm 2 Score
       └─ Tie / No Winner
```

---

## 🎓 Learning Path Visualization

```
Never Played
    │
    ├─ Read welcome screen (1 min)
    │
    ├─ Click "Bắt Đầu" (2 min)
    │
    ├─ Learn from UI:
    │  ├─ Grid layout
    │  ├─ Turn indicator
    │  ├─ Score display
    │  └─ Feedback messages
    │
    ├─ Play first turn (2 min)
    │  ├─ Click cell
    │  ├─ See modal
    │  ├─ Answer question
    │  ├─ Get feedback
    │  └─ Advance turn
    │
    ├─ Continue playing (3-5 min)
    │  └─ Experience game flow
    │
    └─ See results (1 min)
       └─ Understand scoring
```

---

## 📊 Component Dependency Graph

```
App.jsx
  │
  └─ Router
      │
      ├─ Navbar (modified)
      │  └─ Minigame link
      │
      └─ Routes
         │
         └─ /minigame
            │
            └─ MiniGame.jsx (280 lines)
               │
               ├─ ScoreBoard.jsx (65 lines)
               │  └─ (Uses: useState, group1Score, group2Score, currentTurn)
               │
               ├─ Grid (5x5)
               │  └─ Cell.jsx × 25 (45 lines)
               │     └─ (Uses: cellNumber, isRevealed, isBomb, onClick)
               │
               ├─ QuestionModal.jsx (110 lines)
               │  └─ (Uses: question, isOpen, onClose, onAnswer)
               │
               └─ BombPopup.jsx (50 lines)
                  └─ (Uses: isOpen, onClose)
               
               Data Source:
               minigameQuizData.js (250 lines)
               ├─ minigameQuestions[19]
               ├─ initializeGame()
               └─ getQuestionById()
```

---

**Visual Guide Complete!**

Use this guide to understand the game's visual structure, flow, and interactions.

