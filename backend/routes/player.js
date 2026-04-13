import express from 'express';
import { Player, DailyLog, Quest, Skill } from '../models/models.js';

const router = express.Router();

router.get('/player', async (req, res) => {
  try {
    let player = await Player.findOne();
    if (!player) {
      return res.status(404).json({ detail: "Player not found" });
    }

    // Check if we need to create logs for today
    const today = new Date().toISOString().split('T')[0];
    const existingLogs = await DailyLog.findAll({ where: { date: today } });
    
    if (existingLogs.length === 0) {
      const activeQuests = await Quest.findAll({ where: { is_active: true, is_daily: true } });
      const newLogs = activeQuests.map(q => ({
        date: today,
        quest_id: q.id,
        completed: false
      }));
      await DailyLog.bulkCreate(newLogs);
    }

    res.json(player);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get player skills
router.get('/player/skills', async (req, res) => {
  try {
    const skills = await Skill.findAll();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add free points to a specific stat
router.post('/player/allocate-points', async (req, res) => {
  try {
    const { stat, amount } = req.body;
    const validStats = ['strength', 'agility', 'vitality', 'intelligence', 'sense'];
    
    if (!validStats.includes(stat)) {
      return res.status(400).json({ detail: "Invalid stat" });
    }
    
    const player = await Player.findOne();
    if (!player || player.free_points < amount) {
      return res.status(400).json({ detail: "Not enough free points" });
    }
    
    player[stat] += amount;
    player.free_points -= amount;
    await player.save();
    
    res.json({ message: "Points allocated", player });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
