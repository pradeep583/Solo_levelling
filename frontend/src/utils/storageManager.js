// Storage utilities for localStorage persistence

const DEFAULT_PLAYER = {
  name: 'PRADEEP',
  level: 1,
  totalXP: 0,
  streak: 0,
  title: 'Novice',
};

const DEFAULT_STATS = {
  intelligence: 62,
  physique: 47,
  perception: 45,
  tech: 58,
  finance: 30,
  discipline: 50,
};

const DEFAULT_QUESTS = {
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
  6: false,
  7: false,
  8: false,
  9: false,
  10: false,
};

const DEFAULT_ACHIEVEMENTS = {
  'first_blood': false,
  'iron_will': false,
  '7_day_warrior': false,
  'code_monk': false,
  'body_of_steel': false,
  'market_reader': false,
  'shadow_step': false,
  'monarch': false,
};

export const initializeStorage = () => {
  if (!localStorage.getItem('sl_player')) {
    localStorage.setItem('sl_player', JSON.stringify(DEFAULT_PLAYER));
  }
  if (!localStorage.getItem('sl_stats')) {
    localStorage.setItem('sl_stats', JSON.stringify(DEFAULT_STATS));
  }
  if (!localStorage.getItem('sl_achievements')) {
    localStorage.setItem('sl_achievements', JSON.stringify(DEFAULT_ACHIEVEMENTS));
  }
  
  const today = new Date().toISOString().split('T')[0];
  const lastDate = localStorage.getItem('sl_last_date');
  
  if (lastDate !== today) {
    // New day - create fresh quests
    localStorage.setItem(`sl_quests_${today}`, JSON.stringify(DEFAULT_QUESTS));
    localStorage.setItem('sl_last_date', today);
  }
};

export const getPlayer = () => {
  const data = localStorage.getItem('sl_player');
  return data ? JSON.parse(data) : DEFAULT_PLAYER;
};

export const setPlayer = (player) => {
  localStorage.setItem('sl_player', JSON.stringify(player));
};

export const getStats = () => {
  const data = localStorage.getItem('sl_stats');
  return data ? JSON.parse(data) : DEFAULT_STATS;
};

export const setStats = (stats) => {
  localStorage.setItem('sl_stats', JSON.stringify(stats));
};

export const getTodayQuests = () => {
  const today = new Date().toISOString().split('T')[0];
  const data = localStorage.getItem(`sl_quests_${today}`);
  return data ? JSON.parse(data) : DEFAULT_QUESTS;
};

export const setTodayQuests = (quests) => {
  const today = new Date().toISOString().split('T')[0];
  localStorage.setItem(`sl_quests_${today}`, JSON.stringify(quests));
};

export const getAchievements = () => {
  const data = localStorage.getItem('sl_achievements');
  return data ? JSON.parse(data) : DEFAULT_ACHIEVEMENTS;
};

export const setAchievements = (achievements) => {
  localStorage.setItem('sl_achievements', JSON.stringify(achievements));
};

export const getLastDate = () => {
  return localStorage.getItem('sl_last_date') || null;
};

export const setLastDate = (date) => {
  localStorage.setItem('sl_last_date', date);
};

export const resetTodayQuests = () => {
  const today = new Date().toISOString().split('T')[0];
  localStorage.setItem(`sl_quests_${today}`, JSON.stringify(DEFAULT_QUESTS));
};

export const clearAllData = () => {
  localStorage.removeItem('sl_player');
  localStorage.removeItem('sl_stats');
  localStorage.removeItem('sl_achievements');
  localStorage.removeItem('sl_last_date');
  
  // Clear all quest data
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('sl_quests_')) {
      localStorage.removeItem(key);
    }
  });
};
