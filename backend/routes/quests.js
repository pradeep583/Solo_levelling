import express from 'express';
import { Quest, DailyLog } from '../models/models.js';

const router = express.Router();

router.get('/quests', async (req, res) => {
  try {
    const quests = await Quest.findAll({
      where: { is_active: true },
      order: [['order_index', 'ASC']]
    });
    res.json(quests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/log/today', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const logs = await DailyLog.findAll({ where: { date: today } });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
