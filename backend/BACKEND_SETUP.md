# 🚀 Solo Leveling Backend - Getting Started

## Quick Start

### 1️⃣ Install Dependencies
```bash
cd backend
npm install
```

### 2️⃣ Start Development Server
```bash
npm run dev
```

**You should see:**
```
✓ Database connection established
✓ Database schema synchronized
✓ Database seeded with initial data
✓ Scheduler initialized

🌙 Solo Leveling API Server
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Running on http://localhost:8000
Environment: development
Database: SQLite (solo_leveling.db)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 3️⃣ Test the Server
Open browser or use curl:
```bash
# Check health
curl http://localhost:8000/health

# Get status
curl http://localhost:8000/

# Get player info
curl http://localhost:8000/api/player
```

---

## 📁 New Backend Structure

```
backend/
├── server.js                 ← ENTRY POINT (use this to run)
├── app.js                    ← Express configuration
├── .env                      ← Environment variables
│
├── config/
│   └── database.js           ← Database setup
│
├── models/
│   └── models.js             ← All database models
│
├── middleware/
│   ├── errorHandler.js       ← Global error handling
│   └── requestLogger.js      ← Request logging
│
├── services/
│   └── seed.js               ← Database initialization
│
├── routes/                   ← API endpoints
│   ├── player.js
│   ├── quests.js
│   ├── log.js
│   ├── penalties.js
│   └── achievements.js
│
└── utils/                    ← Utilities
    ├── leveling.js
    └── scheduler.js
```

---

## 🔧 Commands

### Development (auto-reload)
```bash
npm run dev
```

### Production
```bash
npm start
```

### Stop Server
Press `CTRL+C`

---

## ✨ What Changed

### ✅ Clean Entry Point
- Old: `npm run dev` → app.js → starts server inline
- New: `npm run dev` → server.js → imports app.js → cleanly boots

### ✅ Better Organization
- Database config now in `config/database.js`
- Seeding in `services/seed.js`
- Middleware in `middleware/` folder
- Clear separation of concerns

### ✅ Improved Logging
```
✓ [timestamp] POST /api/log/complete/1 - Status: 200 - Duration: 45ms
✗ [timestamp] GET /api/invalid - Status: 404 - Duration: 2ms
```

### ✅ Error Handling
All errors now return consistent JSON format with status codes

### ✅ Graceful Shutdown
Properly closes database connection when you press CTRL+C

---

## 🔌 Quick API Tests

### Get Player Status
```bash
curl http://localhost:8000/api/player
```

Response:
```json
{
  "id": 1,
  "name": "Sung Jinwoo",
  "rank": "E",
  "level_in_rank": 1,
  "total_xp": 0,
  "strength": 10,
  "agility": 10,
  "vitality": 10,
  "intelligence": 10,
  "sense": 10,
  "max_hp": 100,
  "current_hp": 100,
  "max_mp": 50,
  "current_mp": 50,
  "free_points": 0,
  "skill_points": 0,
  "streak_days": 0,
  "total_quests_completed": 0
}
```

### Get Today's Quests
```bash
curl http://localhost:8000/api/log/today
```

Response:
```json
[
  {
    "date": "2026-04-13",
    "quest_id": 1,
    "completed": false,
    "completed_at": null,
    "xp_earned": 0,
    "Quest": {
      "id": 1,
      "name": "Goblin Dungeon Raid",
      "category": "combat",
      "difficulty_rank": "E",
      "xp_reward": 50,
      "str_gain": 5,
      ...
    }
  }
  ...
]
```

---

## 📚 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/` | API status |
| GET | `/api/player` | Get player stats |
| GET | `/api/player/skills` | Get player skills |
| POST | `/api/player/allocate-points` | Allocate free points |
| GET | `/api/quests` | Get all quests |
| GET | `/api/log/today` | Get today's logs |
| POST | `/api/log/complete/:id` | Complete a quest |
| POST | `/api/log/undo/:id` | Undo a quest |
| GET | `/api/achievements` | Get achievements |

---

## 🐛 Debugging

### Enable SQL Logging
Edit `.env`:
```env
SQL_LOGGING=true
```

Restart server to see all database queries.

### View Logs
All logs appear in the terminal where you ran `npm run dev`

---

## ⚠️ Common Issues

### Port Already in Use
If port 8000 is taken:
```env
PORT=8001
```
Then restart.

### Database Locked
Delete `solo_leveling.db` to reset:
```bash
rm solo_leveling.db
npm run dev
```

### Dependencies Missing
Reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## ✅ Architecture Benefits

- **Clean**: Separated concerns, easy to find code
- **Scalable**: Add features without touching existing code
- **Maintainable**: Clear folder structure and naming
- **Debuggable**: Better logging and error handling
- **Testable**: Services can be tested independently
- **Production-Ready**: Proper error handling and lifecycle management

---

## 🎯 Next Steps

1. ✅ Backend running on http://localhost:8000
2. Start frontend: `npm run dev` (in frontend folder)
3. Visit http://localhost:5173 to see the app
4. Start completing dungeons!

---

**Status**: ✅ Backend Ready
**Entry Point**: `server.js`
**Run Command**: `npm run dev`
