import React from 'react';
import { motion } from 'framer-motion';

const CATEGORY_ICONS = {
  combat: '⚔️', endurance: '🛡️', intelligence: '🧠',
  agility: '⚡', sense: '👁️', healing: '❤️',
};

const CATEGORY_COLORS = {
  combat: '#ff4444', endurance: '#ff8800', intelligence: '#00ffff',
  agility: '#ffff00', sense: '#ff00ff', healing: '#00ff00',
};

const RANK_COLORS = {
  'E': '#808080', 'D': '#00ff00', 'C': '#00ffff',
  'B': '#0099ff', 'A': '#ffff00', 'S': '#ff00ff',
};

const DungeonCard = ({ quest, log, onComplete, onUndo }) => {
  const isCompleted = log?.completed || false;
  const catColor = CATEGORY_COLORS[quest.category] || '#ffffff';
  const rankColor = RANK_COLORS[quest.difficulty_rank] || '#808080';
  const totalStats = (quest.str_gain || 0) + (quest.agi_gain || 0) + 
                     (quest.vit_gain || 0) + (quest.int_gain || 0) + (quest.sen_gain || 0);

  const handleClick = () => {
    if (isCompleted) onUndo(quest.id);
    else onComplete(quest.id);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className={`w-full text-left p-4 border rounded transition-all ${
        isCompleted
          ? 'bg-gray-800/50 border-gray-700 opacity-60'
          : 'bg-gray-900/50 border-gray-700 hover:bg-gray-800/70 hover:border-gray-600'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          {/* Header: Rank + Category */}
          <div className="flex items-center gap-2 mb-2">
            <span 
              className="text-xs font-bold px-2 py-1 border rounded"
              style={{ color:rankColor, borderColor: rankColor }}
            >
              {quest.difficulty_rank}-RANK
            </span>
            <span 
              className="text-xs font-bold"
              style={{ color: catColor }}
            >
              {CATEGORY_ICONS[quest.category] || '?'} {quest.category.toUpperCase()}
            </span>
          </div>

          {/* Title */}
          <h3 className={`text-sm font-bold ${isCompleted ? 'line-through' : ''}`}>
            {quest.name}
          </h3>

          {/* Rewards */}
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
            <span className="bg-blue-900/50 px-2 py-1 rounded">+{quest.xp_reward} XP</span>
            {totalStats > 0 && (
              <span className="bg-yellow-900/50 px-2 py-1 rounded">+{totalStats} Stats</span>
            )}
            {quest.hp_gain > 0 && (
              <span className="bg-red-900/50 px-2 py-1 rounded">+{quest.hp_gain} HP</span>
            )}
            {quest.mp_gain > 0 && (
              <span className="bg-blue-900/50 px-2 py-1 rounded">+{quest.mp_gain} MP</span>
            )}
          </div>
        </div>

        {/* Checkbox */}
        <div className="text-2xl">
          {isCompleted ? '✓' : '☐'}
        </div>
      </div>
    </motion.button>
  );
};

const QuestsPanel = ({ player, quests, logs, onComplete, onUndo }) => {
  const dailyQuests = quests.filter(q => q.is_daily);
  const completed = dailyQuests.filter(q => logs.find(l => l.quest_id === q.id)?.completed).length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-400">
          {completed} / {dailyQuests.length} completed
        </span>
      </div>

      {/* Dungeon Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dailyQuests.map(quest => (
          <DungeonCard
            key={quest.id}
            quest={quest}
            log={logs.find(l => l.quest_id === quest.id)}
            onComplete={onComplete}
            onUndo={onUndo}
          />
        ))}
      </div>

      {dailyQuests.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No dungeons available
        </div>
      )}
    </div>
  );
};

export default QuestsPanel;
