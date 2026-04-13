# 🎮 Solo Leveling RPG System - QUICK START

## Step 1: Install Dependencies
```bash
cd frontend
npm install
```

Share Tech Mono is already included via Google Fonts link in CSS.

## Step 2: Choose Your Setup

### Setup A: Use ONLY the RPG System (Recommended)

**Edit `src/main.jsx`:**
```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRPG from './AppRPG.jsx'
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

**Result**: RPG System loads at http://localhost:5173

---

### Setup B: Use BOTH (Dashboard + RPG Toggle)

**Edit `src/App.jsx` to add RPG view:**
```javascript
import React, { useState } from 'react'
import RPGSystem from './screens/RPGSystem'
import Dashboard from './screens/Dashboard'
// ... rest of imports

function App() {
  const [mode, setMode] = useState('dashboard') // 'dashboard' or 'rpg'

  if (mode === 'rpg') {
    return (
      <>
        <button 
          onClick={() => setMode('dashboard')}
          style={{
            position: 'fixed',
            top: 10,
            right: 10,
            zIndex: 9999,
            padding: '8px 16px',
            backgroundColor: '#00d4ff',
            color: '#000',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Back to Dashboard
        </button>
        <RPGSystem />
      </>
    )
  }

  return (
    <>
      {/* Your existing dashboard code */}
      <button 
        onClick={() => setMode('rpg')}
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 100,
          padding: '10px 16px',
          backgroundColor: '#00d4ff',
          color: '#000',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Launch RPG System
      </button>
      {/* ... rest of your existing app */}
    </>
  )
}

export default App
```

Then run:
```bash
npm run dev
```

**Result**: Toggle between Dashboard and RPG System

---

## Step 3: First Run

The app will:
1. ✅ Create localStorage entries automatically
2. ✅ Initialize player "PRADEEP" with default stats
3. ✅ Create 10 daily quests
4. ✅ Create 8 achievements (all locked initially)

## Step 4: Test It

### Complete a Quest
1. Go to **QUESTS** tab
2. Check a quest checkbox
3. See ✅ Toast notification with "+XP"
4. Card gets green glow
5. Stat increments in **STATUS** tab

### Trigger Penalties (Testing)
1. Complete quests today
2. Open DevTools → Console
3. Run:
```javascript
// Force past date to trigger penalties tomorrow
localStorage.setItem('sl_last_date', '2024-01-01')
window.location.reload()
```
4. Next day, penalties appear as red alert

### Reset Everything
Go to **SYSTEM** tab → "Clear All Data" button

---

## 📂 File Locations

All new RPG System files are in:
- `src/screens/` – Main app + pages
- `src/screens/components/RPGSystem/` – UI cards + modal
- `src/utils/` – Game logic + storage
- `src/screens/RPGSystem.css` – All styling
- `src/AppRPG.jsx` – Entry point for RPG-only mode

---

## ⚙️ Troubleshooting

### Dark styling not loading?
- Make sure `src/index.css` contains the Play Tech Mono font import
- Check browser DevTools → Elements → Verify `#0a0e1a` background is applied

### Quests not resetting daily?
- localStorage should auto-create new date key
- Check `sl_last_date` matches today's date in DevTools

### Stats not increasing?
- Verify quest checkbox actually fires the handler
- Check Console for errors
- Ensure stats are capped at 100 (not NaN)

### Colors wrong?
- Check CSS in `RPGSystem.css` — all colors defined there
- Verify you're using cyan `#00d4ff` not blue

---

## 🎮 Gameplay Tips

1. **Build a Streak**: Complete 7+ quests daily to increment streak
2. **Level Up Fast**: Complete high-XP quests (YouTube Short = 20 XP)
3. **Unlock Achievements**: Iron Will = complete all 10 quests in 1 day
4. **Reach S Rank**: Get any stat to 90+ for "Monarch" achievement
5. **Avoid Penalties**: Never skip quests or lose 2 days of progress!

---

## 📊 Example Session

```
Day 1:
- Completed 7 quests
- +75 XP (Level 1 → Level 1, need 100)
- Streak: 1 day
- Random stat +3 each

Day 2:
- Completed 8 quests
- +95 XP (Level 1 → Level 1, progress: 75/100)
- Streak: 2 days
- Completed "Iron Will" achievement ✅

Day 3:
- Only completed 5 quests
- Next day: -8 penalty points applied to stats
- Streak: 0 (reset)
```

---

## 🔗 Useful Links

- Share Tech Mono Font: https://fonts.google.com/specimen/Share+Tech+Mono
- Solo Leveling Wiki: https://sololeveling.fandom.com/
- Framer Motion Docs: https://www.framer.com/motion/

---

**You're all set! 🚀 Launch the RPG System and start your grind!**
