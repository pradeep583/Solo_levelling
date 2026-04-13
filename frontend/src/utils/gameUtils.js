// Utility functions for stat ranks and calculations

export const getRankFromPoints = (points) => {
  if (points >= 90) return 'S';
  if (points >= 70) return 'A';
  if (points >= 50) return 'B';
  if (points >= 30) return 'C';
  return 'D';
};

export const getRankColor = (rank) => {
  const colors = {
    'D': '#ff9800',
    'C': '#8bc34a',
    'B': '#00d4ff',
    'A': '#1e90ff',
    'S': '#d4af37',
  };
  return colors[rank] || '#666';
};

export const getTitleByLevel = (level) => {
  const titles = {
    1: 'Novice',
    2: 'Apprentice',
    3: 'Seeker',
    4: 'Strategist',
    5: 'Analyst',
    6: 'Tactician',
    8: 'Expert',
    10: 'Master',
    15: 'Elite',
    20: 'Shadow Monarch',
  };
  
  // Find the highest level title that doesn't exceed current level
  const validLevels = Object.keys(titles)
    .map(Number)
    .filter(l => l <= level)
    .sort((a, b) => b - a);
  
  return titles[validLevels[0]] || 'Novice';
};

export const getXPRequiredForLevel = (level) => {
  return level * 100;
};

export const getXPToNextLevel = (totalXP, level) => {
  const required = getXPRequiredForLevel(level);
  return Math.max(0, required - totalXP);
};

export const checkLevelUp = (totalXP, currentLevel) => {
  const requiredXP = getXPRequiredForLevel(currentLevel);
  if (totalXP >= requiredXP) {
    return true;
  }
  return false;
};

export const calculatePenalties = (lastDate, completedQuests, stats) => {
  // Returns { penalties: [...penalties], newStats: {...} }
  
  if (!lastDate) {
    return { penalties: [], newStats: stats };
  }

  const today = new Date().toISOString().split('T')[0];
  if (lastDate === today) {
    return { penalties: [], newStats: stats };
  }

  // Different day — calculate penalties
  const questsData = {
    1: { stat: 'physique', points: 1, name: 'Fix Your Posture' },
    2: { stat: 'perception', points: 1, name: 'Eye Care' },
    3: { stat: 'discipline', points: 2, name: 'Edit & Post YouTube' },
    4: { stat: 'discipline', points: 1, name: 'Read Book Chapter' },
    5: { stat: 'physique', points: 2, name: 'Workout' },
    6: { stat: 'intelligence', points: 2, name: 'Solve DSA Problem' },
    7: { stat: 'tech', points: 2, name: 'Study Tech Topic' },
    8: { stat: 'intelligence', points: 1, name: 'Win Chess Match' },
    9: { stat: 'finance', points: 2, name: 'Read Finance Article' },
    10: { stat: 'perception', points: 2, name: 'Watch Travel Vlog' },
  };

  const penalties = [];
  const newStats = { ...stats };

  Object.entries(completedQuests).forEach(([questId, completed]) => {
    if (!completed) {
      const questInfo = questsData[parseInt(questId)];
      if (questInfo) {
        const statKey = questInfo.stat;
        const penaltyAmount = questInfo.points;
        const oldValue = newStats[statKey];
        newStats[statKey] = Math.max(0, oldValue - penaltyAmount);
        
        penalties.push({
          quest: questInfo.name,
          stat: statKey.toUpperCase(),
          amount: penaltyAmount,
          from: oldValue,
          to: newStats[statKey],
        });
      }
    }
  });

  return { penalties, newStats };
};

export const getLevelInfo = (totalXP) => {
  let level = 1;
  let accumXP = 0;

  while (true) {
    const requiredForNext = getXPRequiredForLevel(level + 1);
    if (accumXP + requiredForNext > totalXP) {
      break;
    }
    accumXP += requiredForNext;
    level++;
  }

  return {
    level,
    xpInCurrentLevel: totalXP - accumXP,
    xpRequiredForLevel: getXPRequiredForLevel(level),
    nextLevelXP: getXPRequiredForLevel(level + 1),
  };
};
