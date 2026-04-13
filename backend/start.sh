#!/bin/bash
# Start Solo Leveling Backend - Clean Architecture

echo "🌙 Solo Leveling Backend - Starting..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Display info
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Backend Configuration:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Entry Point: server.js"
echo "Port: 8000"
echo "Environment: development (use NODE_ENV=production for prod)"
echo "Database: SQLite (solo_leveling.db)"
echo ""
echo "URLs:"
echo "  Health: http://localhost:8000/health"
echo "  API: http://localhost:8000/api/player"
echo ""
echo "Commands:"
echo "  Stop: Press CTRL+C"
echo "  Logs: Watch terminal output"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Start server
npm run dev
