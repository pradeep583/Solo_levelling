// Solo Leveling Rank System Configuration
const RANK_ORDER = ['E', 'D', 'C', 'B', 'A', 'S'];

// XP required to level up in each rank (per level: 1-99)
const LEVEL_UP_XP_BY_RANK = {
  'E': 100,  // E-rank: 100 XP per level (total 9900 XP for 99 levels)
  'D': 200,  // D-rank: 200 XP per level (more challenging)
  'C': 400,  // C-rank: 400 XP per level
  'B': 600,  // B-rank: 600 XP per level
  'A': 1000, // A-rank: 1000 XP per level
  'S': 2000, // S-rank: 2000 XP per level (endgame)
};

// Stat gains per level up within a rank
const STAT_GAINS_PER_LEVEL = {
  str: 1,
  agi: 1,
  vit: 1,
  int: 1,
  sen: 1,
  hp: 10,
  mp: 5,
};

// Rank promotion thresholds
const RANK_PROMOTION_REQUIREMENTS = {
  'E': { min_level: 99, min_xp: 9900 },      // Complete E-rank at level 99
  'D': { min_level: 99, min_xp: 29700 },     // Complete D-rank
  'C': { min_level: 99, min_xp: 69300 },     // Complete C-rank
  'B': { min_level: 99, min_xp: 129300 },    // Complete B-rank
  'A': { min_level: 99, min_xp: 229300 },    // Complete A-rank
  'S': { min_level: 1, min_xp: 429300 },     // S-rank awakened
};

export function checkLevelUp(player) {
  const currentRank = player.rank;
  const currentLevel = player.level_in_rank;
  const currentXP = player.total_xp;

  let leveledUp = false;
  let rankedUp = false;
  let newRank = currentRank;
  let newLevel = currentLevel;

  // Check if can level up within current rank
  const xpNeededPerLevel = LEVEL_UP_XP_BY_RANK[currentRank];
  const totalXpForCurrentRank = xpNeededPerLevel * (currentLevel - 1);
  const xpIntoRank = currentXP - totalXpForCurrentRank;

  if (xpIntoRank >= xpNeededPerLevel && currentLevel < 99) {
    newLevel = currentLevel + 1;
    leveledUp = true;

    // Apply stat gains
    player.strength += STAT_GAINS_PER_LEVEL.str;
    player.agility += STAT_GAINS_PER_LEVEL.agi;
    player.vitality += STAT_GAINS_PER_LEVEL.vit;
    player.intelligence += STAT_GAINS_PER_LEVEL.int;
    player.sense += STAT_GAINS_PER_LEVEL.sen;
    
    player.max_hp += STAT_GAINS_PER_LEVEL.hp;
    player.max_mp += STAT_GAINS_PER_LEVEL.mp;
    player.current_hp = player.max_hp;
    player.current_mp = player.max_mp;
    
    player.free_points += 1;
    player.level_in_rank = newLevel;
  }

  // Check if can rank up (when current rank is level 99)
  const nextRankIndex = RANK_ORDER.indexOf(currentRank) + 1;
  if (nextRankIndex < RANK_ORDER.length && newLevel === 99) {
    newRank = RANK_ORDER[nextRankIndex];
    newLevel = 1;
    rankedUp = true;
    player.rank = newRank;
    player.level_in_rank = 1;
    player.skill_points += 1;
    
    // Add bonus stats on rank promotion
    player.max_hp += 50;
    player.max_mp += 25;
    player.current_hp = player.max_hp;
    player.current_mp = player.max_mp;
  }

  return {
    leveledUp,
    rankedUp,
    newRank,
    newLevel,
  };
}

export function addQuestRewards(player, quest) {
  // Add stat gains from quest
  player.strength += quest.str_gain || 0;
  player.agility += quest.agi_gain || 0;
  player.vitality += quest.vit_gain || 0;
  player.intelligence += quest.int_gain || 0;
  player.sense += quest.sen_gain || 0;
  
  player.max_hp += quest.hp_gain || 0;
  player.max_mp += quest.mp_gain || 0;
  player.current_hp = Math.min(player.current_hp + (quest.hp_gain || 0), player.max_hp);
  player.current_mp = Math.min(player.current_mp + (quest.mp_gain || 0), player.max_mp);
}
