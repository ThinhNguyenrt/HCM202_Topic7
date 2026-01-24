# ✅ Minigame Testing Checklist

## 🎮 Functionality Tests

### Game Initialization
- [ ] Click "Minigame" in navbar → /minigame loads
- [ ] Welcome screen displays with game rules
- [ ] "Bắt Đầu Trò Chơi" button clickable
- [ ] Grid initializes with correct bomb/question distribution
- [ ] Cell numbers 1-25 display correctly

### Turn System
- [ ] Lượt 1 starts with Nhóm 1
- [ ] Current turn updates after each cell click
- [ ] Lượt 2 shows Nhóm 2 turn
- [ ] Turn counter displays correctly (X/10)
- [ ] After lượt 10 → game ends

### Cell Interaction
- [ ] Click cell → opens question modal OR bomb popup
- [ ] Can't re-click same cell (disabled after reveal)
- [ ] Cell visual changes after click (color/icon)
- [ ] Selected cell highlights correctly

### Question Modal
- [ ] Modal opens on cell click
- [ ] Question displays clearly
- [ ] All 4 options (A, B, C, D) visible
- [ ] Can select option before feedback
- [ ] Feedback shows (Green correct, Red wrong)
- [ ] "Kết Thúc Lượt" button visible after answer
- [ ] Modal closes on button click

### Scoring
- [ ] Correct answer: +10 points
- [ ] Wrong answer: 0 points
- [ ] Bomb hit: -5 points
- [ ] Score updates immediately
- [ ] Min score never goes below 0

### Bomb Popup
- [ ] Appears on bomb cell click
- [ ] Shows 💣 icon
- [ ] "NỔ BOM!" message displays
- [ ] "-5 điểm" penalty message
- [ ] Bounce animation plays
- [ ] "Kết Thúc Lượt" button closes popup

### ScoreBoard
- [ ] Displays both group scores
- [ ] Current group name highlighted
- [ ] Progress bar updates correctly
- [ ] Turn counter accurate

### Game End
- [ ] After lượt 10 → game finishes
- [ ] Results section displays
- [ ] Final scores shown
- [ ] "Xem Kết Quả" button visible
- [ ] "Chơi Lại" button resets game
- [ ] Navigate to results page on "Xem Kết Quả"

## 🎨 UI/UX Tests

### Styling
- [ ] Blue for Nhóm 1
- [ ] Orange for Nhóm 2
- [ ] Green for correct answers
- [ ] Red for bombs/wrong answers
- [ ] Gradients render smoothly
- [ ] Shadows/glows display correctly

### Animations
- [ ] Hover scale on cells
- [ ] Bounce animation on bomb
- [ ] Fade in modals
- [ ] Smooth transitions
- [ ] No animation jank

### Responsive Design
- [ ] Mobile (small screen): 1 column grid looks good
- [ ] Tablet (medium screen): 2-3 column grid
- [ ] Desktop (large screen): Full 5x5 grid
- [ ] Text scales appropriately
- [ ] Buttons clickable on all sizes
- [ ] No horizontal scroll

### Accessibility
- [ ] Cell numbers readable
- [ ] Modal text large enough
- [ ] Button labels clear
- [ ] Icon meanings obvious
- [ ] Color contrast sufficient

## 🔌 Integration Tests

### Routing
- [ ] /minigame route works
- [ ] Navbar link navigates correctly
- [ ] Back button from results works
- [ ] Page refresh maintains state (if not ended)

### Navigation
- [ ] Can access from navbar
- [ ] Can navigate back from game
- [ ] Can navigate to results
- [ ] Other routes still work

### State Management
- [ ] Scores persist during game
- [ ] Turn counter updates correctly
- [ ] Game state resets on new game
- [ ] Modal states managed properly

## 🚀 Performance Tests

- [ ] Initial load time < 2s
- [ ] Clicking cell responds instantly
- [ ] Modal opens smoothly
- [ ] No lag during animation
- [ ] Memory usage stable
- [ ] No console errors

## 📱 Device Tests

### Desktop
- [ ] 1920x1080 resolution
- [ ] 1366x768 resolution
- [ ] 1024x768 resolution

### Tablet
- [ ] iPad (1024x768)
- [ ] iPad landscape
- [ ] Android tablet

### Mobile
- [ ] iPhone 12 (390x844)
- [ ] iPhone SE (375x667)
- [ ] Android phone

## 🌐 Browser Compatibility

- [ ] Chrome/Edge latest
- [ ] Firefox latest
- [ ] Safari (if on Mac)
- [ ] Mobile browsers

## 🧪 Edge Cases

- [ ] Very fast clicking (no double action)
- [ ] Refresh during game
- [ ] Close browser tab
- [ ] Network latency (if Firebase later)
- [ ] Zoom in/out on page
- [ ] Tab minimize/restore

## 📊 Data Validation

- [ ] All 19 questions present
- [ ] All 6 bombs randomly placed
- [ ] No duplicate questions
- [ ] Correct answers valid (0-3)
- [ ] Question text not empty
- [ ] All options filled

## 🎯 Score Calculation

Test with these scenarios:

| Scenario | Expected | Actual |
|----------|----------|--------|
| All correct | 100 | __ |
| All wrong | 0 | __ |
| All bomb | -30 | __ |
| 5 correct + 5 bomb | 50 - 25 = 25 | __ |
| Mix of correct/wrong | Varies | __ |

## ✅ Final Checklist

Before deployment:
- [ ] No console errors
- [ ] No broken links
- [ ] All text in Vietnamese
- [ ] Images load correctly
- [ ] Performance acceptable
- [ ] Mobile tested
- [ ] Cross-browser tested
- [ ] Game logic correct
- [ ] Scoring accurate
- [ ] UI matches design
- [ ] Responsive layout
- [ ] Accessibility OK

## 🚀 Deployment Checklist

- [ ] Code committed to git
- [ ] Build succeeds (`npm run build`)
- [ ] No warnings during build
- [ ] Production build tested
- [ ] Environment variables set
- [ ] Firebase config verified
- [ ] Assets optimized
- [ ] SEO metadata set
- [ ] Analytics configured
- [ ] Error tracking enabled

---

**Test Date**: ______________  
**Tester**: ______________  
**Status**: ⬜ Not Started | 🟡 In Progress | ✅ Complete  
**Notes**: 

