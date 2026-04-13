import 'dotenv/config';
import app from './app.js';
import sequelize from './config/database.js';
import { seedData } from './services/seed.js';
import { setupScheduler } from './utils/scheduler.js';

const PORT = process.env.PORT || 8000;

async function startServer() {
  try {
    // Authenticate database connection
    await sequelize.authenticate();
    console.log('✓ Database connection established');

    // Sync database schema
    await sequelize.sync({ alter: false });
    console.log('✓ Database schema synchronized');

    // Seed data if needed
    await seedData();
    console.log('✓ Database seeded with initial data');

    // Setup scheduler for automated tasks
    setupScheduler();
    console.log('✓ Scheduler initialized');

    // Start HTTP server
    app.listen(PORT, () => {
      console.log(`\n🌙 Solo Leveling API Server`);
      console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
      console.log(`Running on http://localhost:${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`Database: SQLite (solo_leveling.db)`);
      console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
    });
  } catch (error) {
    console.error('✗ Failed to start server:', error.message);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n⚠ Shutting down gracefully...');
  await sequelize.close();
  process.exit(0);
});

startServer();
