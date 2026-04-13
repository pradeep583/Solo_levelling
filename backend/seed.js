import sequelize from './database.js';
import { Player, Quest, Achievement, Skill } from './models/models.js';

export async function seedData() {
  await sequelize.sync({ force: false }); // Create tables if they don't exist

  // Check if player exists - Reset to starting state
  const player = await Player.findOne();
  if (!player) {
    await Player.create({
      name: "Sung Jinwoo",
      rank: "E",
      level_in_rank: 1,
      total_xp: 0,
      strength: 10,
      agility: 10,
      vitality: 10,
      intelligence: 10,
      sense: 10,
      max_hp: 100,
      current_hp: 100,
      max_mp: 50,
      current_mp: 50,
      skill_points: 0,
      free_points: 0,
      streak_days: 0,
      total_quests_completed: 0,
      total_awakening_count: 0
    });
    console.log("Player initialized as Sung Jinwoo (E-rank Level 1)");
  }

  // Check if quests exist - Solo Leveling themed dungeons
  const questCount = await Quest.count();
  if (questCount === 0) {
    const quests = [
      // E-Rank Dungeons
      { name: "Goblin Dungeon Raid", category: "combat", difficulty_rank: "E", xp_reward: 50, str_gain: 5, agi_gain: 2, vit_gain: 3, int_gain: 1, sen_gain: 1, hp_gain: 10, mp_gain: 5, penalty_xp: -25, is_daily: true, order_index: 1 },
      { name: "Cursed Cavern Exploration", category: "sense", difficulty_rank: "E", xp_reward: 45, str_gain: 2, agi_gain: 3, vit_gain: 2, int_gain: 5, sen_gain: 5, hp_gain: 5, mp_gain: 10, penalty_xp: -20, is_daily: true, order_index: 2 },
      { name: "Ritual Dungeon Training", category: "endurance", difficulty_rank: "E", xp_reward: 40, str_gain: 3, agi_gain: 1, vit_gain: 5, int_gain: 2, sen_gain: 1, hp_gain: 15, mp_gain: 0, penalty_xp: -18, is_daily: true, order_index: 3 },
      { name: "Ancient Library Study", category: "intelligence", difficulty_rank: "E", xp_reward: 35, str_gain: 1, agi_gain: 1, vit_gain: 1, int_gain: 8, sen_gain: 2, hp_gain: 0, mp_gain: 15, penalty_xp: -15, is_daily: true, order_index: 4 },
      { name: "Shadow Gate Guardian Trial", category: "combat", difficulty_rank: "E", xp_reward: 55, str_gain: 6, agi_gain: 4, vit_gain: 2, int_gain: 1, sen_gain: 2, hp_gain: 10, mp_gain: 5, penalty_xp: -28, is_daily: true, order_index: 5 },
      { name: "Healing Sanctuary", category: "healing", difficulty_rank: "E", xp_reward: 30, str_gain: 0, agi_gain: 0, vit_gain: 3, int_gain: 4, sen_gain: 5, hp_gain: 20, mp_gain: 20, penalty_xp: -12, is_daily: true, order_index: 6 },
    ];
    await Quest.bulkCreate(quests);
    console.log("Solo Leveling dungeons initialized");
  }

  // Skills/Abilities
  const skillCount = await Skill.count();
  if (skillCount === 0) {
    const skills = [
      // Starting skills
      { name: "Slash", description: "Basic sword attack", skill_type: "active", unlock_condition: "start", is_unlocked: true, damage_multiplier: 1.0, mp_cost: 0, cooldown_minutes: 0, order_index: 1 },
      { name: "Power Strike", description: "Execute a powerful slash", skill_type: "active", unlock_condition: "level_5", is_unlocked: false, damage_multiplier: 1.5, mp_cost: 10, cooldown_minutes: 1, order_index: 2 },
      
      // D-Rank skills
      { name: "Berserk", description: "Increase STR for 60 seconds", skill_type: "active", unlock_condition: "rank_D", is_unlocked: false, damage_multiplier: 2.0, mp_cost: 20, cooldown_minutes: 3, order_index: 3 },
      { name: "Shadow Step", description: "Increase AGI temporarily", skill_type: "active", unlock_condition: "rank_D", is_unlocked: false, damage_multiplier: 1.2, mp_cost: 15, cooldown_minutes: 2, order_index: 4 },
      
      // C-Rank skills
      { name: "Mana Heart", description: "Passive: Regenerate MP over time", skill_type: "passive", unlock_condition: "rank_C", is_unlocked: false, damage_multiplier: 1.0, mp_cost: 0, cooldown_minutes: 0, order_index: 5 },
      { name: "Blessing", description: "Heal and buff allies", skill_type: "active", unlock_condition: "rank_C", is_unlocked: false, damage_multiplier: 0.5, mp_cost: 30, cooldown_minutes: 5, order_index: 6 },
      
      // B-Rank skills
      { name: "Aura Blade", description: "Channel mana into weapon", skill_type: "active", unlock_condition: "rank_B", is_unlocked: false, damage_multiplier: 2.5, mp_cost: 40, cooldown_minutes: 5, order_index: 7 },
      
      // A-Rank skills
      { name: "Ruler's Authority", description: "Dominate the battlefield", skill_type: "active", unlock_condition: "rank_A", is_unlocked: false, damage_multiplier: 3.0, mp_cost: 50, cooldown_minutes: 10, order_index: 8 },
    ];
    await Skill.bulkCreate(skills);
    console.log("Skills initialized");
  }

  // Achievements
  const achievementCount = await Achievement.count();
  if (achievementCount === 0) {
    const achievements = [
      // Rank progression
      { name: "E-RANK HUNTER", description: "Reach the rank of E", icon: "🎖️", condition_type: "rank_promotion", condition_value: 0, rarity: "common" },
      { name: "D-RANK HUNTER", description: "Reach the rank of D", icon: "🎖️🎖️", condition_type: "rank_promotion", condition_value: 1, rarity: "uncommon" },
      { name: "C-RANK HUNTER", description: "Reach the rank of C", icon: "🎖️🎖️🎖️", condition_type: "rank_promotion", condition_value: 2, rarity: "uncommon" },
      { name: "B-RANK HUNTER", description: "Reach the rank of B", icon: "⭐", condition_type: "rank_promotion", condition_value: 3, rarity: "rare" },
      { name: "A-RANK HUNTER", description: "Reach the rank of A", icon: "⭐⭐", condition_type: "rank_promotion", condition_value: 4, rarity: "rare" },
      { name: "S-RANK HUNTER", description: "Reach the rank of S (Awakened)", icon: "👑", condition_type: "rank_promotion", condition_value: 5, rarity: "legendary" },
      
      // Level milestones
      { name: "NOVICE", description: "Reach Level 10 in current rank", icon: "📈", condition_type: "level", condition_value: 10, rarity: "common" },
      { name: "SKILLED", description: "Reach Level 50 in current rank", icon: "📈📈", condition_type: "level", condition_value: 50, rarity: "uncommon" },
      { name: "MASTER", description: "Reach Level 99 in current rank", icon: "🔱", condition_type: "level", condition_value: 99, rarity: "rare" },
      
      // Stat thresholds
      { name: "IRON BODY", description: "VIT reaches 50", icon: "🦾", condition_type: "stat_threshold", condition_value: 50, rarity: "uncommon" },
      { name: "SHADOW AGILITY", description: "AGI reaches 50", icon: "⚡", condition_type: "stat_threshold", condition_value: 50, rarity: "uncommon" },
      { name: "GODLY STRENGTH", description: "STR reaches 100", icon: "💪", condition_type: "stat_threshold", condition_value: 100, rarity: "rare" },
      
      // Quest milestones
      { name: "FIRST CLEAR", description: "Complete your first dungeon", icon: "🏆", condition_type: "quest_count", condition_value: 1, rarity: "common" },
      { name: "DUNGEON SLAYER", description: "Clear 50 dungeons", icon: "⚔️", condition_type: "quest_count", condition_value: 50, rarity: "uncommon" },
      { name: "GATE KEEPER", description: "Clear 250 dungeons", icon: "🚪", condition_type: "quest_count", condition_value: 250, rarity: "rare" },
      
      // Streak achievements
      { name: "CONSISTENT HUNTER", description: "7-day consecutive completion", icon: "🔥", condition_type: "streak", condition_value: 7, rarity: "uncommon" },
      { name: "DEDICATED HUNTER", description: "30-day consecutive completion", icon: "🔥🔥", condition_type: "streak", condition_value: 30, rarity: "rare" },
      
      // Skill unlocks
      { name: "BLADE MASTERY", description: "Unlock Power Strike", icon: "⚔️", condition_type: "skill_unlock", condition_value: 1, rarity: "uncommon" },
      { name: "MANA AWAKENING", description: "Unlock Berserk", icon: "💫", condition_type: "skill_unlock", condition_value: 2, rarity: "rare" },
    ];
    await Achievement.bulkCreate(achievements);
    console.log("Solo Leveling achievements initialized");
  }
}
