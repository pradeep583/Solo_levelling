# SETUP INSTRUCTIONS - Copy & Paste

## Step 1: Update src/main.jsx (For RPG-Only Mode)

**File**: `frontend/src/main.jsx`

Replace entire file with:
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

---

## Step 2: OR Update src/App.jsx (For Toggle Mode)

**File**: `frontend/src/App.jsx`

Add at the top (after existing imports):
```javascript
import RPGSystem from './screens/RPGSystem'
import { useState } from 'react'
```

Replace the function with:
```javascript
function App() {
  const [useRPG, setUseRPG] = useState(false)

  if (useRPG) {
    return (
      <>
        <button 
          onClick={() => setUseRPG(false)}
          style={{
            position: 'fixed',
            top: 10,
            right: 10,
            zIndex: 9999,
            padding: '8px 16px',
            background: '#00d4ff',
            color: '#000',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '12px'
          }}
        >
          ← BACK TO DASHBOARD
        </button>
        <RPGSystem />
      </>
    )
  }

  return (
    <>
      {/* Your existing Dashboard code */}
      
      {/* Add this button */}
      <button 
        onClick={() => setUseRPG(true)}
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 100,
          padding: '10px 16px',
          background: '#00d4ff',
          color: '#000',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '14px'
        }}
      >
        🎮 RPG SYSTEM
      </button>
    </>
  )
}

export default App
```

---

## Step 3: Run the app

```bash
cd frontend
npm run dev
```

Then open: `http://localhost:5173`

---

## Expected First Load Behavior

When app loads for first time:
1. ✅ localStorage initializes
2. ✅ Player "PRADEEP" created
3. ✅ 6 stats initialized
4. ✅ 10 quests created for today
5. ✅ 8 achievements created (all locked)
6. ✅ Status page shows

---

## Quick Test

1. **Go to QUESTS tab**
2. **Check first quest** (Fix Your Posture)
3. **See:**
   - ✅ Card gets green glow
   - 🔔 Toast: "Fix Your Posture COMPLETE — +5 XP"
   - 📊 Physique increases by 1 in STATUS tab
   - ⭐ "First Blood" achievement unlocks

---

## Customization Quick Links

### Change Player Name
File: `src/utils/storageManager.js`
Line: `name: 'PRADEEP',` → `name: 'YOUR_NAME',`

### Change Initial Stats
File: `src/utils/storageManager.js`
Lines: 20-25 (DEFAULT_STATS object)

### Change Rank Thresholds
File: `src/utils/gameUtils.js`
Lines: 3-7 (getRankFromPoints function)

### Change Colors
File: `src/screens/RPGSystem.css`
Search for: `#00d4ff` `#ff9800` `#8bc34a` etc. and replace

---

## Reset Everything

In browser DevTools Console:
```javascript
Object.keys(localStorage).forEach(k => {
  if (k.startsWith('sl_')) localStorage.removeItem(k)
})
window.location.reload()
```

Then app reinitializes with fresh data.

---

## File Checklist

Verify these files exist:

✅ `src/screens/RPGSystem.jsx`
✅ `src/screens/RPGSystem.css`
✅ `src/AppRPG.jsx`
✅ `src/screens/pages/StatusPage.jsx`
✅ `src/screens/pages/QuestsPage.jsx`
✅ `src/screens/pages/AchievementsPage.jsx`
✅ `src/screens/pages/SystemPage.jsx`
✅ `src/screens/components/RPGSystem/PlayerCard.jsx`
✅ `src/screens/components/RPGSystem/StatCard.jsx`
✅ `src/screens/components/RPGSystem/QuestCard.jsx`
✅ `src/screens/components/RPGSystem/AchievementCard.jsx`
✅ `src/screens/components/RPGSystem/LevelUpModal.jsx`
✅ `src/utils/gameUtils.js`
✅ `src/utils/storageManager.js`
✅ `src/utils/questData.js`

---

## Done!

Your Solo Leveling RPG system is ready to use. Start grinding! ⚔️
