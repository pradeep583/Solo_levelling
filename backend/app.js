import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import errorHandler from './middleware/errorHandler.js';
import requestLogger from './middleware/requestLogger.js';

// Import routes
import playerRoutes from './routes/player.js';
import questRoutes from './routes/quests.js';
import logRoutes from './routes/log.js';
import penaltyRoutes from './routes/penalties.js';
import achievementRoutes from './routes/achievements.js';
import syncRoutes from './routes/sync.js';

const app = express();

// Middleware
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Solo Leveling API is running',
    timestamp: new Date().toISOString(),
  });
});

// Status endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'ARISE',
    message: 'Welcome to Solo Leveling System',
    version: '1.0.0',
  });
});

// API Routes
app.use('/api', playerRoutes);
app.use('/api', questRoutes);
app.use('/api', logRoutes);
app.use('/api', penaltyRoutes);
app.use('/api', achievementRoutes);
app.use('/api', syncRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`,
    timestamp: new Date().toISOString(),
  });
});

// Global error handler
app.use(errorHandler);

export default app;
