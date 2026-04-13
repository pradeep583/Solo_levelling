import express from 'express';
import { DailyLog, Quest, Player } from '../models/models.js';
import { checkLevelUp, addQuestRewards } from '../utils/leveling.js';

const router = express.Router();

router.post('/log/complete/:quest_id', async (req, res) => {
  try {
    const { quest_id } = req.params;
    const today = new Date().toISOString().split('T')[0];
    
    let logEntry = await DailyLog.findOne({ where: { date: today, quest_id } });
    if (!logEntry) {
      return res.status(404).json({ detail: "Log entry not found" });
    }

    if (logEntry.completed) {
      return res.json({ message: "Already completed" });
    }

    const quest = await Quest.findByPk(quest_id);
    const player = await Player.findOne();

    logEntry.completed = true;
    logEntry.completed_at = new Date();
    logEntry.xp_earned = quest.xp_reward;
    await logEntry.save();

    // Add XP
    player.total_xp += quest.xp_reward;
    
    // Apply quest-specific stat gains
    addQuestRewards(player, quest);
    
    // Check for level up or rank promotion
    const progressionResult = checkLevelUp(player);
    const levelUpInfo = progressionResult.leveledUp || progressionResult.rankedUp ? progressionResult : null;
    
    player.total_quests_completed += 1;
    await player.save();

    res.json({ 
      message: "Quest completed", 
      player, 
      level_up: levelUpInfo,
      xp_gained: quest.xp_reward,
      stats_gained: {
        str: quest.str_gain || 0,
        agi: quest.agi_gain || 0,
        vit: quest.vit_gain || 0,
        int: quest.int_gain || 0,
        sen: quest.sen_gain || 0,
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/log/undo/:quest_id', async (req, res) => {
  try {
    const { quest_id } = req.params;
    const today = new Date().toISOString().split('T')[0];
    
    let logEntry = await DailyLog.findOne({ where: { date: today, quest_id } });
    if (!logEntry || !logEntry.completed) {
      return res.status(400).json({ detail: "Cannot undo" });
    }

    const quest = await Quest.findByPk(quest_id);
    const player = await Player.findOne();

    logEntry.completed = false;
    logEntry.completed_at = null;
    logEntry.xp_earned = 0;
    await logEntry.save();

    // Remove XP
    player.total_xp = Math.max(0, player.total_xp - quest.xp_reward);
    
    // Remove stat gains
    player.strength = Math.max(10, player.strength - (quest.str_gain || 0));
    player.agility = Math.max(10, player.agility - (quest.agi_gain || 0));
    player.vitality = Math.max(10, player.vitality - (quest.vit_gain || 0));
    player.intelligence = Math.max(10, player.intelligence - (quest.int_gain || 0));
    player.sense = Math.max(10, player.sense - (quest.sen_gain || 0));
    
    player.total_quests_completed = Math.max(0, player.total_quests_completed - 1);
    await player.save();

    res.json({ message: "Quest completion undone" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/log/today', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const logs = await DailyLog.findAll({ 
      where: { date: today },
      include: Quest
    });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
