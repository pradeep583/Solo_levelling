# Solo Leveling Personal RPG System

A fully functional React web app inspired by Solo Leveling anime's Sung Jinwoo system. Track your daily quests, level up, unlock achievements, and improve across 6 stat categories with localStorage persistence.

## 🎮 Features

### Player System
- **Name**: PRADEEP (customizable)
- **Leveling**: XP-based progression (Level × 100 = XP required)
- **Titles**: Unlocked at specific levels (Novice → Strategist → Shadow Monarch)
- **Streak**: Consecutive days of 7+ quest completions

### 6 Stat Categories
1. **🧠 Intelligence** (initial: 62)
2. **💪 Physique** (initial: 47)
3. **👁️ Perception** (initial: 45)
4. **📡 Tech** (initial: 58)
5. **💰 Finance** (initial: 30)
6. **🔥 Discipline** (initial: 50)

Each stat has a **RANK**:
- **D** (0-29): Orange
- **C** (30-49): Yellow-Green
- **B** (50-69): Cyan
- **A** (70-89): Blue
- **S** (90-100): Gold

### Daily Quests (10 quests, reset every midnight)
Each quest grants XP and stat points:
- 🧍 Fix Your Posture (5 XP, +1 Physique)
- 👁️ Eye Care (5 XP, +1 Perception)
- 🎬 YouTube Short (20 XP, +2 Discipline)
- 📖 Book Chapter (10 XP, +1 Intelligence, +1 Discipline)
- 💪 Workout (15 XP, +2 Physique)
- 🧩 DSA Problem (15 XP, +2 Intelligence)
- 📡 Tech Topic (15 XP, +2 Tech)
- ♟️ Chess Match (10 XP, +1 Intelligence)
- 💸 Finance Read (10 XP, +2 Finance)
- 🗺️ Travel Vlog (10 XP, +2 Perception)

### Penalty System
If a quest isn't completed → stat loses the same points it would have gained on the NEXT day.

Example:
- Skip "Workout" today
- Next day: Physique -2
- Visual alert shows all penalties applied

### Achievements (8 total)
- 🩸 First Blood - Complete any quest
- 🛡️ Iron Will - Complete all 10 quests in 1 day
- ⚔️ 7-Day Warrior - 7 day streak
- 👤 Code Monk - Solve DSA 7 days in a row
- 🏋️ Body of Steel - Workout 10 days in a row
- 📈 Market Reader - Finance quests 14 days in a row
- 👻 Shadow Step - Reach Level 10
- 👑 Monarch - Any stat reaches S rank (90+)

### Pages (Bottom Navigation)
1. **⚔️ STATUS** - Player card + 6 stat cards in 2-column grid
2. **📋 QUESTS** - Daily quest checklist with XP rewards
3. **🏆 ACHIEVEMENTS** - Grid of achievements (locked/unlocked)
4. **⚙️ SYSTEM** - Settings, date, streak info, data reset

## 📦 Installation

### Option 1: Use as Main App (Recommended for Solo Leveling)

Replace your `src/main.jsx`:

```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRPG from './AppRPG'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRPG />
  </React.StrictMode>,
)
```

Then run:
```bash
npm run dev
```

### Option 2: Use Both (Dashboard + RPG)

In `src/App.jsx`, add a toggle:

```javascript
import RPGSystem from './screens/RPGSystem';

function App() {
  const [useRPG, setUseRPG] = useState(false);
  
  if (useRPG) {
    return <RPGSystem />;
  }
  
  return <Dashboard ... />;
}
```

## 💾 localStorage Keys

```javascript
'sl_player'           → { name, level, totalXP, streak, title }
'sl_stats'            → { intelligence, physique, perception, tech, finance, discipline }
'sl_quests_YYYY-MM-DD' → { 1: false, 2: true, ...10: false }
'sl_achievements'     → { first_blood: true, iron_will: false, ... }
'sl_last_date'        → "2024-01-15" (for penalty detection)
```

**Auto-clears**: Quest data older than 30 days

## 🎨 Design Reference

- **Background**: Dark navy `#0a0e1a`
- **Panels**: `#0f1625` with `#1e3a5f` border
- **Accent**: Cyan `#00d4ff` for labels, active states
- **Font**: Share Tech Mono (Google Fonts)
- **Max Width**: 430px (mobile app style)
- **No Shadows**: Clean game HUD aesthetic

## 🔄 Game Flow

1. **App Loads** → Initialize localStorage, check for new day
2. **New Day Detected** → 
   - Apply penalties from yesterday's incomplete quests
   - Calculate streak
   - Create fresh quest list
   - Update last_date
3. **Complete Quest** → 
   - Add XP to player
   - Add stat points (capped at 100)
   - Check level-up (show modal)
   - Show green toast notification
   - Mark card with green glow
4. **Achievement Unlock** → Automatically unlocked based on conditions
5. **Level Up** → Modal shows new level + new title

## 🛠️ Customization

### Change Initial Stats
Edit `src/utils/storageManager.js`:
```javascript
const DEFAULT_STATS = {
  intelligence: 62,  // Change these
  physique: 47,
  // ...
};
```

### Add New Quest
Edit `src/utils/questData.js`:
```javascript
11: {
  id: 11,
  icon: '🎯',
  name: 'New Quest',
  xp: 20,
  stat: 'discipline',
  increment: 2,
}
```

### Change Rank Thresholds
Edit `src/utils/gameUtils.js`:
```javascript
export const getRankFromPoints = (points) => {
  if (points >= 95) return 'S';  // Changed from 90
  // ...
};
```

### Modify Colors
Edit `src/screens/RPGSystem.css`:
```css
--cyan: #00ffff;      /* Your cyan */
--rank-d: #ff9800;    /* Your orange */
```

## 📊 Data Breakdown

### XP System
```
Level 1: 0 XP needed
Level 2: 100 XP (1 × 100)
Level 3: 200 XP (2 × 100)
Level 4: 300 XP (3 × 100)
...
Level 10: 900 XP (9 × 100)
```

### Stat Caps
- Each stat: 0-100 points
- Rank progessions: D (0-29) → C (30-49) → B (50-69) → A (70-89) → S (90-100)
- On quest complete: points added (capped at 100)
- On penalty: points deducted (minimum 0)

### Streak Logic
```
Completed < 7 quests → streak = 0
Completed >= 7 quests → streak += 1
```

## 🐛 Debugging

### Check localStorage
Open DevTools → Console:
```javascript
console.log(JSON.parse(localStorage.getItem('sl_player')))
console.log(JSON.parse(localStorage.getItem('sl_stats')))
```

### Reset All Data
```javascript
// In console
Object.keys(localStorage).forEach(key => {
  if (key.startsWith('sl_')) localStorage.removeItem(key)
})
window.location.reload()
```

Or use SYSTEM page → "Clear All Data" button

### Manual Date Change (Testing)
Edit `src/utils/storageManager.js` temporarily:
```javascript
export const getLastDate = () => {
  return '2024-01-01'; // Force past date to trigger penalties
};
```

## 📱 Mobile Responsive

- Optimized for 430px width (mobile)
- Adapts to larger screens (max-width: 430px centered)
- Touch-friendly buttons (20px+ tap targets)
- Scroll handling with custom scrollbar

## ⚡ Performance

- localStorage-only (no API required)
- Minimal re-renders (React.memo used where needed)
- CSS animations (GPU accelerated)
- No external API dependencies

## 📝 File Structure

```
src/
├── screens/
│   ├── RPGSystem.jsx              (Main container)
│   ├── RPGSystem.css              (All styles)
│   ├── pages/
│   │   ├── StatusPage.jsx
│   │   ├── QuestsPage.jsx
│   │   ├── AchievementsPage.jsx
│   │   └── SystemPage.jsx
│   └── components/
│       └── RPGSystem/
│           ├── PlayerCard.jsx
│           ├── StatCard.jsx
│           ├── QuestCard.jsx
│           ├── AchievementCard.jsx
│           └── LevelUpModal.jsx
├── utils/
│   ├── gameUtils.js               (Calculations)
│   ├── storageManager.js          (localStorage)
│   └── questData.js               (Quest definitions)
├── AppRPG.jsx                     (Alternative entry)
└── index.css
```

## 🎯 Future Features (Optional)

- [ ] Leaderboard (multi-device sync via cloud)
- [ ] Quest rewards (special titles, cosmetics)
- [ ] Mini-games for certain quests
- [ ] Daily login bonuses
- [ ] Stat trading between quests
- [ ] Advanced analytics dashboard

## 📄 License

Personal project inspired by Solo Leveling anime.

---

**Version**: 1.0.0  
**Last Updated**: April 2026
