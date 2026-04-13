import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export const Player = sequelize.define('Player', {
  name: { type: DataTypes.STRING, defaultValue: 'Sung Jinwoo' },
  // Rank System: E, D, C, B, A, S (string enum)
  rank: { type: DataTypes.ENUM('E', 'D', 'C', 'B', 'A', 'S'), defaultValue: 'E' },
  // Level within rank (1-99)
  level_in_rank: { type: DataTypes.INTEGER, defaultValue: 1 },
  // Total XP for progression
  total_xp: { type: DataTypes.INTEGER, defaultValue: 0 },
  
  // Solo Leveling Stats
  strength: { type: DataTypes.INTEGER, defaultValue: 10 },      // STR
  agility: { type: DataTypes.INTEGER, defaultValue: 10 },       // AGI
  vitality: { type: DataTypes.INTEGER, defaultValue: 10 },      // VIT
  intelligence: { type: DataTypes.INTEGER, defaultValue: 10 },  // INT
  sense: { type: DataTypes.INTEGER, defaultValue: 10 },         // SEN
  
  // HP/MP System
  max_hp: { type: DataTypes.INTEGER, defaultValue: 100 },
  current_hp: { type: DataTypes.INTEGER, defaultValue: 100 },
  max_mp: { type: DataTypes.INTEGER, defaultValue: 50 },
  current_mp: { type: DataTypes.INTEGER, defaultValue: 50 },
  
  // Skill Points & Free points
  skill_points: { type: DataTypes.INTEGER, defaultValue: 0 },
  free_points: { type: DataTypes.INTEGER, defaultValue: 0 },
  
  // Progression
  streak_days: { type: DataTypes.INTEGER, defaultValue: 0 },
  last_active_date: { type: DataTypes.DATEONLY, allowNull: true },
  total_quests_completed: { type: DataTypes.INTEGER, defaultValue: 0 },
  
  // Prestige/Legacy tracking
  total_awakening_count: { type: DataTypes.INTEGER, defaultValue: 0 },
}, { tableName: 'player' });

export const PlayerSettings = sequelize.define('PlayerSettings', {
  player_id: { type: DataTypes.INTEGER },
  night_time: { type: DataTypes.STRING, defaultValue: '21:00' },
  penalty_enabled: { type: DataTypes.BOOLEAN, defaultValue: true },
}, { tableName: 'player_settings' });

export const StatSnapshot = sequelize.define('StatSnapshot', {
  date: { type: DataTypes.DATEONLY, index: true },
  player_id: { type: DataTypes.INTEGER },
  rank: { type: DataTypes.STRING },
  level_in_rank: { type: DataTypes.INTEGER },
  strength: { type: DataTypes.INTEGER, defaultValue: 0 },
  agility: { type: DataTypes.INTEGER, defaultValue: 0 },
  vitality: { type: DataTypes.INTEGER, defaultValue: 0 },
  intelligence: { type: DataTypes.INTEGER, defaultValue: 0 },
  sense: { type: DataTypes.INTEGER, defaultValue: 0 },
  max_hp: { type: DataTypes.INTEGER, defaultValue: 0 },
  max_mp: { type: DataTypes.INTEGER, defaultValue: 0 },
}, { tableName: 'stat_snapshots' });

// Skills/Abilities system inspired by Solo Leveling
export const Skill = sequelize.define('Skill', {
  name: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  skill_type: { type: DataTypes.ENUM('active', 'passive') },
  unlock_condition: { type: DataTypes.STRING },  // e.g., "rank_C", "level_50", "quest_boss_defeat"
  is_unlocked: { type: DataTypes.BOOLEAN, defaultValue: false },
  unlock_date: { type: DataTypes.DATE, allowNull: true },
  damage_multiplier: { type: DataTypes.FLOAT, defaultValue: 1.0 },
  mp_cost: { type: DataTypes.INTEGER, defaultValue: 0 },
  cooldown_minutes: { type: DataTypes.INTEGER, defaultValue: 0 },
  icon: { type: DataTypes.STRING, allowNull: true },
  order_index: { type: DataTypes.INTEGER, defaultValue: 0 },
}, { tableName: 'skills' });

// Shadow System - Player's second life/dungeon run capabilities
export const ShadowDungeon = sequelize.define('ShadowDungeon', {
  date: { type: DataTypes.DATEONLY, index: true },
  dungeon_type: { type: DataTypes.ENUM('normal', 'shadow'), defaultValue: 'normal' },
  completed: { type: DataTypes.BOOLEAN, defaultValue: false },
  time_spent_minutes: { type: DataTypes.INTEGER, defaultValue: 0 },
  rewards_xp: { type: DataTypes.INTEGER, defaultValue: 0 },
  stat_gains: { type: DataTypes.JSON, defaultValue: {} },
}, { tableName: 'shadow_dungeons' });

export const Quest = sequelize.define('Quest', {
  name: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING, allowNull: true },
  // Dungeon types
  category: { type: DataTypes.ENUM('combat', 'endurance', 'intelligence', 'agility', 'sense', 'healing') },
  difficulty_rank: { type: DataTypes.ENUM('E', 'D', 'C', 'B', 'A', 'S'), defaultValue: 'E' },
  
  // Rewards
  xp_reward: { type: DataTypes.INTEGER },
  str_gain: { type: DataTypes.INTEGER, defaultValue: 0 },
  agi_gain: { type: DataTypes.INTEGER, defaultValue: 0 },
  vit_gain: { type: DataTypes.INTEGER, defaultValue: 0 },
  int_gain: { type: DataTypes.INTEGER, defaultValue: 0 },
  sen_gain: { type: DataTypes.INTEGER, defaultValue: 0 },
  hp_gain: { type: DataTypes.INTEGER, defaultValue: 0 },
  mp_gain: { type: DataTypes.INTEGER, defaultValue: 0 },
  
  // Penalties
  penalty_xp: { type: DataTypes.INTEGER, defaultValue: 0 },
  
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
  is_daily: { type: DataTypes.BOOLEAN, defaultValue: true },
  is_special: { type: DataTypes.BOOLEAN, defaultValue: false },
  order_index: { type: DataTypes.INTEGER, defaultValue: 0 },
}, { tableName: 'quests' });

export const DailyLog = sequelize.define('DailyLog', {
  date: { type: DataTypes.DATEONLY, index: true },
  quest_id: { type: DataTypes.INTEGER },
  completed: { type: DataTypes.BOOLEAN, defaultValue: false },
  completed_at: { type: DataTypes.DATE, allowNull: true },
  xp_earned: { type: DataTypes.INTEGER, defaultValue: 0 },
  penalty_applied: { type: DataTypes.BOOLEAN, defaultValue: false },
}, { tableName: 'daily_logs' });

export const Achievement = sequelize.define('Achievement', {
  name: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  icon: { type: DataTypes.STRING },
  unlocked_at: { type: DataTypes.DATE, allowNull: true },
  // Solo Leveling achievement types
  condition_type: { type: DataTypes.ENUM('rank_promotion', 'level', 'stat_threshold', 'quest_count', 'skill_unlock', 'boss_defeat', 'streak') },
  condition_value: { type: DataTypes.INTEGER },
  rarity: { type: DataTypes.ENUM('common', 'uncommon', 'rare', 'legendary'), defaultValue: 'common' },
}, { tableName: 'achievements' });

export const BossProgress = sequelize.define('BossProgress', {
  boss_id: { type: DataTypes.INTEGER, index: true },
  boss_name: { type: DataTypes.STRING, defaultValue: 'Unknown Boss' },
  boss_rank: { type: DataTypes.ENUM('E', 'D', 'C', 'B', 'A', 'S'), defaultValue: 'E' },
  total_health: { type: DataTypes.INTEGER, defaultValue: 100 },
  current_health: { type: DataTypes.INTEGER, defaultValue: 100 },
  defeated: { type: DataTypes.BOOLEAN, defaultValue: false },
  defeated_at: { type: DataTypes.DATE, allowNull: true },
}, { tableName: 'boss_progress' });

export const PenaltyReport = sequelize.define('PenaltyReport', {
  date: { type: DataTypes.DATEONLY, index: true },
  missed_count: { type: DataTypes.INTEGER, defaultValue: 0 },
  xp_lost: { type: DataTypes.INTEGER, defaultValue: 0 },
  applied_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { tableName: 'penalty_reports' });

// Associations
DailyLog.belongsTo(Quest, { foreignKey: 'quest_id' });
Quest.hasMany(DailyLog, { foreignKey: 'quest_id' });
Skill.belongsToMany(Player, { through: 'PlayerSkills' });
Player.belongsToMany(Skill, { through: 'PlayerSkills' });
