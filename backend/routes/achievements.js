import express from 'express';
import { Achievement } from '../models/models.js';

const router = express.Router();

router.get('/achievements', async (req, res) => {
  try {
    const achievements = await Achievement.findAll();
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
