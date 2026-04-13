# Backend Architecture - Clean Structure

## 📁 Directory Structure

```
backend/
├── server.js                 # Main entry point - runs the app
├── app.js                    # Express app configuration only
├── package.json              # Dependencies & scripts
├── .env                      # Environment variables (local)
├── .env.example              # Example env file
├── solo_leveling.db          # SQLite database
│
├── config/
│   └── database.js           # Sequelize database configuration
│
├── models/
│   └── models.js             # All database models (Player, Quest, etc.)
│
├── routes/
│   ├── player.js             # Player endpoints
│   ├── quests.js             # Quests/Dungeons endpoints
│   ├── log.js                # Daily log endpoints
│   ├── penalties.js          # Penalty system endpoints
│   └── achievements.js       # Achievements endpoints
│
├── middleware/
│   ├── errorHandler.js       # Global error handler
│   └── requestLogger.js      # Request logging
│
├── services/
│   └── seed.js               # Database seeding service
│
└── utils/
    ├── leveling.js           # Solo Leveling progression logic
    └── scheduler.js          # Cron job scheduler
```

## 🚀 How to Run

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Setup Environment
Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

### 3. Start Development Server
```bash
npm run dev
```

**Output:**
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

### 4. Production Build
```bash
npm start
```

## 📋 Key Improvements

### ✅ Separation of Concerns
- **server.js** → Application startup & lifecycle
- **app.js** → Express configuration only
- **config/** → Environment & database setup
- **middleware/** → Cross-cutting concerns
- **services/** → Business logic & initialization
- **routes/** → API endpoints
- **models/** → Data layer
- **utils/** → Helpers & utilities

### ✅ Clean Startup Flow
```
1. server.js starts
2. Environment variables loaded (.env)
3. Express app configured (app.js)
4. Database connection (config/database.js)
5. Schema synced (Sequelize)
6. Data seeded (services/seed.js)
7. Scheduler initialized (utils/scheduler.js)
8. HTTP server listening on port
9. Graceful shutdown on SIGINT
```

### ✅ Error Handling
- Global error handler middleware
- Structured error responses
- Better error logging

### ✅ Request Logging
- Incoming request logging
- Response status tracking
- Duration measurements
- Visual status indicators (✓/✗)

### ✅ Environment Management
- `.env` for local configuration
- `.env.example` as template
- Production-ready error handling
- Development vs production modes

## 🔌 API Endpoints

### Health Check
```
GET /health
Response: { status: 'ok', message: '...', timestamp: '...' }
```

### Status
```
GET /
Response: { status: 'ARISE', message: '...', version: '...' }
```

### Player API
```
GET    /api/player                    # Get player status
GET    /api/player/skills             # Get available skills
POST   /api/player/allocate-points    # Allocate stat points
```

### Quests API
```
GET    /api/quests                    # Get all quests
GET    /api/quests/:id                # Get specific quest
```

### Log API
```
GET    /api/log/today                 # Get today's logs
POST   /api/log/complete/:quest_id    # Complete a quest
POST   /api/log/undo/:quest_id        # Undo quest completion
```

### Achievements API
```
GET    /api/achievements              # Get all achievements
```

### Penalties API
```
POST   /api/penalties/apply           # Apply penalties
```

## 📝 Environment Variables

### .env
```
NODE_ENV=development
PORT=8000
SQL_LOGGING=false
```

### Configuration Notes
- `NODE_ENV` - Set to 'production' for production deployments
- `PORT` - Server port (default: 8000)
- `SQL_LOGGING` - Enable SQL query logging (default: false)

## 🔄 Database

### Connection
- Type: SQLite
- File: `solo_leveling.db` (auto-created)
- ORM: Sequelize

### Schema
Automatically synced on startup:
- Player
- Quest
- DailyLog
- Achievement
- Skill
- ShadowDungeon
- BossProgress
- PenaltyReport

### Seeding
Auto-seeding on first startup:
- 1 Player (Sung Jinwoo, E-rank Level 1)
- 6 E-rank Dungeons
- 8 Skills
- 20 Achievements

## 🛠️ Development Commands

```bash
# Start development server (with auto-reload)
npm run dev

# Start production server
npm start

# Run tests (not yet configured)
npm test
```

## 📊 Logging

### Request Logs
```
✓ [2026-04-13T10:30:45.123Z] POST /api/log/complete/1 - Status: 200 - Duration: 45ms
✗ [2026-04-13T10:30:50.456Z] GET /api/invalid - Status: 404 - Duration: 2ms
```

### Database Logs
Enable query logging by setting `SQL_LOGGING=true` in `.env`

### Error Logs
Errors automatically logged to console with full stack traces in development

## 🔐 Error Handling

All errors return consistent format:
```json
{
  "error": true,
  "status": 400,
  "message": "Error message here",
  "timestamp": "2026-04-13T10:30:45.123Z"
}
```

## 🔀 Graceful Shutdown

Press `CTRL+C` to gracefully shutdown:
```
⚠ Shutting down gracefully...
[connection closed]
```

## 📚 Next Steps

1. **Testing** - Add Jest + Supertest for API testing
2. **Validation** - Add request validation middleware
3. **Authentication** - Add JWT authentication if needed
4. **Rate Limiting** - Add rate limiting middleware
5. **Documentation** - Add Swagger/OpenAPI documentation
6. **Monitoring** - Add application monitoring (APM)
7. **Caching** - Add Redis caching layer

---

**Status**: ✅ Ready for Development
**Architecture**: Clean & Scalable
**Database**: SQLite with Sequelize ORM
**Entry Point**: server.js
