import express from 'express';
import { Player, DailyLog, Quest } from '../models/models.js';

const router = express.Router();

router.post('/penalties/apply', async (req, res) => {
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    let logs = await DailyLog.findAll({ where: { date: yesterdayStr } });
    
    if (logs.length === 0) {
      const activeQuests = await Quest.findAll({ where: { is_active: true } });
      const newLogs = activeQuests.map(q => ({
        date: yesterdayStr,
        quest_id: q.id,
        completed: false
      }));
      await DailyLog.bulkCreate(newLogs);
      logs = await DailyLog.findAll({ where: { date: yesterdayStr } });
    }

    const unprocessedLogs = logs.filter(l => !l.penalty_applied);
    const player = await Player.findOne();
    const penaltySummary = { missed: 0, xp_lost: 0, stats_lost: {} };
    
    let allCompleted = true;
    for (const log of unprocessedLogs) {
      if (!log.completed) {
        allCompleted = false;
        const quest = await Quest.findByPk(log.quest_id);
        
        const xpLoss = Math.abs(quest.penalty_xp);
        player.total_xp = Math.max(0, player.total_xp - xpLoss);
        penaltySummary.xp_lost += xpLoss;

        const statLoss = Math.abs(quest.penalty_stat);
        if (statLoss > 0) {
          const statKey = quest.stat_key;
          player[statKey] = Math.max(1, (player[statKey] || 0) - statLoss);
          penaltySummary.stats_lost[statKey] = (penaltySummary.stats_lost[statKey] || 0) + statLoss;
        }
        
        log.penalty_applied = true;
        penaltySummary.missed += 1;
        await log.save();
      } else {
        log.penalty_applied = true;
        await log.save();
      }
    }

    if (allCompleted && logs.length > 0) {
      player.streak_days += 1;
      player.total_xp += 25; // Streak bonus
      penaltySummary.streak_bonus = 25;
    } else if (!allCompleted) {
      player.streak_days = 0;
    }

    await player.save();
    res.json(penaltySummary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
