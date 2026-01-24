# 🎮 Minigame - Công Nghệ & Kiến Trúc

## 📋 Tổng Quan

Minigame là ứng dụng ReactJS thuyết trình interactif cho môn Tư Tưởng Hồ Chí Minh, cho phép 2 nhóm cạnh tranh trên lưới 5x5 với 10 lượt chơi.

**Trạng thái**: ✅ Hoàn thành & Proofreading  
**Phiên bản**: 1.0.0  
**Ngày tạo**: 24/01/2026

---

## 🏗️ Kiến Trúc Hệ Thống

```
┌─────────────────────────────────────┐
│        React App (App.jsx)          │
│  Router - Navbar - Footer           │
└──────────┬──────────────────────────┘
           │
           ├─ /minigame (Route)
           │
           ▼
┌─────────────────────────────────────┐
│    MiniGame Page Component          │
│  (Main Game Logic & State)          │
└────┬──────────────┬─────────┬───────┘
     │              │         │
     ▼              ▼         ▼
┌──────────┐  ┌──────────┐  ┌──────────┐
│  Grid    │  │ Score    │  │ Modals   │
│ (Cell)   │  │ Board    │  │ (Q/Bomb) │
└──────────┘  └──────────┘  └──────────┘
     │              │              │
     └──────┬───────┴──────────┬───┘
            │                  │
            ▼                  ▼
    ┌────────────────┐  ┌────────────────┐
    │ Game State     │  │ Event Handlers │
    │ Management     │  │ (onClick, etc) │
    └────────────────┘  └────────────────┘
            │                  │
            └──────┬───────────┘
                   │
                   ▼
    ┌─────────────────────────────────┐
    │  quizData.js                    │
    │  (Questions, Initialization)    │
    └─────────────────────────────────┘
```

---

## 🗄️ Database/State Schema

### Game State (Local)
```javascript
{
  gameState: [
    {
      id: 1-25,              // Cell number
      isBomb: boolean,       // Is bomb cell
      isRevealed: boolean,   // Has been clicked
      questionId: number     // Associated question
    }
  ],
  currentTurn: 1-10,        // Current turn
  group1Score: number,      // Nhóm 1 score
  group2Score: number,      // Nhóm 2 score
  selectedCell: number,     // Currently selected cell
  showQuestionModal: boolean,
  showBombPopup: boolean,
  gameStarted: boolean,
  gameFinished: boolean
}
```

### Quiz Question Schema
```javascript
{
  id: number,                        // Unique ID
  question: string,                  // Question text
  options: [string, string, string, string],  // 4 choices
  correct: 0-3                       // Index of correct answer
}
```

---

## 🔄 State Flow Diagram

```
Initial State
    ↓
    ├─ gameStarted = false
    ├─ gameState = null
    ├─ currentTurn = 1
    ├─ group1Score = 0
    ├─ group2Score = 0
    └─ gameFinished = false
    
    ↓ [Click "Bắt Đầu"]
    
    ▼
Game Running State
    ├─ gameStarted = true
    ├─ gameState = [25 cells initialized]
    ├─ currentTurn = 1-10
    ├─ showQuestionModal OR showBombPopup = true
    
    ↓ [Player clicks cell]
    
    ▼
Cell Click → Modal Opens
    ├─ selectedCell = cellIndex
    ├─ Modal opens (Question or Bomb)
    
    ↓ [Player answers or bomb hits]
    
    ▼
Update Scores & Turn
    ├─ Score update (±10 or -5)
    ├─ Cell marked as revealed
    ├─ currentTurn += 1
    
    ↓ [After 10 turns]
    
    ▼
Game Finished State
    ├─ gameFinished = true
    ├─ Results displayed
    ├─ Winner determined
    
    ↓ [Click "Xem Kết Quả" or "Chơi Lại"]
```

---

## 🎯 Logic Flow - Detailed

### 1. Game Initialization
```
handleStartGame()
├─ initializeGame()
│  ├─ Create 25 cells array
│  ├─ Select 6 random bomb positions
│  ├─ Assign 19 questions to remaining cells
│  └─ Return initialized grid
├─ setGameState(initialCells)
├─ setGameStarted(true)
├─ setCurrentTurn(1)
├─ Reset scores to 0
└─ gameFinished = false
```

### 2. Cell Click Handler
```
handleCellClick(cellIndex)
├─ Check if cell already revealed
├─ setSelectedCell(cellIndex)
│
├─ If cell.isBomb:
│  └─ setShowBombPopup(true)
│
└─ If cell.questionId:
   ├─ question = getQuestionById(cell.questionId)
   └─ setShowQuestionModal(true)
```

### 3. Answer Processing
```
handleAnswerQuestion(isCorrect)
├─ setShowQuestionModal(false)
│
├─ Calculate points
│  ├─ isCorrect ? +10 : 0
│  └─ Get currentGroup = currentTurn % 2 === 1 ? 1 : 2
│
├─ Update score
│  ├─ If group1: setGroup1Score(prev => prev + points)
│  └─ If group2: setGroup2Score(prev => prev + points)
│
├─ Mark cell as revealed
│  ├─ newGameState[selectedCell].isRevealed = true
│  └─ setGameState(newGameState)
│
├─ setSelectedCell(null)
└─ advanceTurn()
```

### 4. Bomb Hit Handler
```
handleBombHit()
├─ setShowBombPopup(false)
│
├─ Get currentGroup
│
├─ Deduct 5 points
│  ├─ If group1: setGroup1Score(prev => Math.max(0, prev - 5))
│  └─ If group2: setGroup2Score(prev => Math.max(0, prev - 5))
│
├─ Mark cell as revealed
│  └─ newGameState[selectedCell].isRevealed = true
│
├─ setSelectedCell(null)
└─ advanceTurn()
```

### 5. Turn Advancement
```
advanceTurn()
├─ If currentTurn < 10:
│  ├─ setCurrentTurn(prev => prev + 1)
│  ├─ setSelectedCell(null)
│  └─ Continue playing
│
└─ Else (currentTurn === 10):
   ├─ setGameFinished(true)
   ├─ Display results section
   └─ Wait for player action
```

---

## 🎨 Component Hierarchy

```
MiniGame (Main Container)
│
├─ Welcome Screen (conditional)
│  ├─ Game info
│  └─ Rules display
│
└─ Game Screen (conditional)
   │
   ├─ Header
   │  └─ Title + Turn info
   │
   ├─ ScoreBoard
   │  ├─ Group 1 score card
   │  ├─ Group 2 score card
   │  ├─ Turn indicator
   │  └─ Progress bar
   │
   ├─ Game Grid
   │  └─ Cell (×25)
   │     ├─ Cell number
   │     ├─ Reveal effect
   │     └─ Click handler
   │
   ├─ Results Section (conditional)
   │  ├─ Final scores
   │  ├─ "Xem Kết Quả" button
   │  └─ "Chơi Lại" button
   │
   ├─ QuestionModal (conditional)
   │  ├─ Question text
   │  ├─ 4 option buttons (A-D)
   │  ├─ Feedback display
   │  └─ "Kết Thúc Lượt" button
   │
   └─ BombPopup (conditional)
      ├─ Bomb icon 💣
      ├─ "NỔ BOM!" message
      ├─ Penalty info
      └─ "Kết Thúc Lượt" button
```

---

## 📊 Data Flow

### Input Data
```
quizData.js
├─ minigameQuestions (19 questions)
├─ initializeGame() → Game grid
└─ getQuestionById() → Specific question
```

### Processing
```
MiniGame Component
├─ State Management
│  ├─ Game state
│  ├─ Scores
│  └─ Turn tracking
│
├─ Event Handlers
│  ├─ Cell click
│  ├─ Answer submission
│  ├─ Bomb hit
│  └─ Turn switching
│
└─ Conditional Rendering
   ├─ Modals
   ├─ Grid
   └─ Results
```

### Output Data
```
Display Layers
├─ UI Components
│  ├─ ScoreBoard
│  ├─ Grid cells
│  ├─ Modals
│  └─ Buttons
│
└─ Results Page
   ├─ Final scores
   ├─ Winner
   └─ Navigation
```

---

## 🔐 Data Validation

### Input Validation
```javascript
// Question validation
const isValidQuestion = (q) => {
  return q.id && 
         q.question && 
         q.options.length === 4 && 
         q.correct >= 0 && q.correct <= 3;
};

// Grid validation
const isValidGameState = (cells) => {
  return cells.length === 25 && 
         cells.filter(c => c.isBomb).length === 6;
};

// Score validation
const isValidScore = (score) => {
  return typeof score === 'number' && score >= 0;
};
```

### Score Boundary Checks
```javascript
// Min score: 0
const scores = Math.max(0, scores - penalty);

// Max score (per 10 turns): 100
// If all 10 turns correct: 10 × 10 = 100

// Turn range: 1-10
const validTurn = Math.min(Math.max(turn, 1), 10);
```

---

## ⚡ Performance Optimization

### Current Optimizations
- ✅ Component memoization ready
- ✅ Event handler optimization
- ✅ Modal lazy rendering (only open when needed)
- ✅ CSS animations (no JS animations)
- ✅ Efficient state updates
- ✅ No unnecessary re-renders

### Future Optimizations
- [ ] React.memo for Cell components
- [ ] useCallback for event handlers
- [ ] Code splitting (lazy load pages)
- [ ] Image optimization
- [ ] Caching strategy

---

## 🔒 Security Considerations

### Current Security
- ✅ No sensitive data in client
- ✅ No direct API calls
- ✅ Local state only
- ✅ No authentication needed

### Future Security (Firebase)
- [ ] User authentication
- [ ] Data validation on server
- [ ] Rate limiting
- [ ] Cheat detection
- [ ] Results verification

---

## 🧪 Testing Strategy

### Unit Tests
```javascript
// Test: initializeGame()
- Verify 25 cells created
- Verify 6 bombs randomly placed
- Verify 19 questions assigned

// Test: getQuestionById()
- Return correct question by ID
- Handle invalid ID

// Test: scoring logic
- +10 for correct
- 0 for wrong
- -5 for bomb
- Min 0 enforcement
```

### Component Tests
```javascript
// Test: Cell component
- Render with correct styling
- Click handler triggered
- Disabled state works

// Test: ScoreBoard
- Display correct scores
- Highlight current group
- Progress bar updates

// Test: QuestionModal
- Display question and options
- Feedback shows correctly
- Close button works

// Test: BombPopup
- Bounce animation
- Close handler triggered
```

### Integration Tests
```javascript
// Test: Complete game flow
- Game initialization
- Cell clicking
- Turn progression
- Score calculation
- Game ending
- Results display
```

---

## 📦 Deployment Checklist

### Pre-deployment
- [ ] All code committed
- [ ] No console errors
- [ ] All tests passing
- [ ] Build succeeds
- [ ] Performance acceptable
- [ ] Mobile tested
- [ ] Cross-browser tested

### Deployment
- [ ] Build optimized
- [ ] Assets minified
- [ ] Environment configured
- [ ] Monitoring enabled
- [ ] Backup created

### Post-deployment
- [ ] Smoke tests
- [ ] User feedback
- [ ] Error tracking
- [ ] Performance monitoring

---

## 🚀 Scalability

### Current Scale
- ✅ 25 cells
- ✅ 10 turns
- ✅ 2 groups
- ✅ 19 questions

### Scalability Plan
| Metric | Current | Scalable To |
|--------|---------|-------------|
| Grid Size | 5×5 | 10×10 (100 cells) |
| Turns | 10 | 50+ |
| Groups | 2 | N groups |
| Questions | 19 | 1000+ (Firebase) |
| Players | Presentation | 100+ (real-time) |

### Scaling Strategies
- Server-side state management
- Database for questions
- Real-time multiplayer
- Admin dashboard
- Analytics

---

## 📚 API Reference

### Component Props

#### MiniGame
```javascript
// No props - Main page component
```

#### Cell
```javascript
{
  cellNumber: number,           // 1-25
  isRevealed: boolean,          // Default: false
  isBomb: boolean,              // Default: false
  onClick: function,            // Click handler
  disabled: boolean             // Default: false
}
```

#### ScoreBoard
```javascript
{
  group1Score: number,          // Required
  group2Score: number,          // Required
  currentTurn: number,          // 1-10
  totalTurns: number            // Default: 10
}
```

#### QuestionModal
```javascript
{
  question: {                   // Question object
    id: number,
    question: string,
    options: [string],
    correct: number
  },
  isOpen: boolean,              // Modal visibility
  onClose: function,            // Close handler
  onAnswer: function            // Answer callback
}
```

#### BombPopup
```javascript
{
  isOpen: boolean,              // Popup visibility
  onClose: function             // Close handler
}
```

---

## 🎯 Best Practices

### Code Organization
- ✅ Components clearly separated
- ✅ Logic centralized in main component
- ✅ Data in separate file
- ✅ Naming conventions followed
- ✅ Comments for complex logic

### State Management
- ✅ State lifting to parent
- ✅ Props drilling minimized
- ✅ No prop mutation
- ✅ Immutable updates

### Performance
- ✅ No unnecessary renders
- ✅ Event handlers optimized
- ✅ CSS animations only
- ✅ Lazy rendering of modals

### Accessibility
- ✅ Semantic HTML
- ✅ ARIA labels
- ✅ Keyboard navigation
- ✅ Color contrast

---

## 📞 Troubleshooting Guide

### Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| Grid not loading | Data not initialized | Check `initializeGame()` |
| Scoring wrong | State update timing | Verify `handleAnswerQuestion()` |
| Modal stuck | Click handler blocked | Check modal close logic |
| Turn not advancing | `advanceTurn()` not called | Verify all handlers |
| Styles not applied | TailwindCSS not configured | Check `tailwind.config.js` |

---

## 🔗 Related Files

| File | Purpose |
|------|---------|
| [MINIGAME_README.md](MINIGAME_README.md) | User guide |
| [MINIGAME_QUICKREF.md](MINIGAME_QUICKREF.md) | Quick reference |
| [MINIGAME_CUSTOMIZATION.md](MINIGAME_CUSTOMIZATION.md) | Customization examples |
| [MINIGAME_TESTING_CHECKLIST.md](MINIGAME_TESTING_CHECKLIST.md) | Testing checklist |

---

**Document Version**: 1.0  
**Last Updated**: January 24, 2026  
**Author**: HCM Project Team

