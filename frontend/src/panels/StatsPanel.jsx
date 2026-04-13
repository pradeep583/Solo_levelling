import React from 'react';
import { motion } from 'framer-motion';

const STAT_CONFIG = [
  { key: 'strength', icon: '💪', label: 'STR', abbr: 'Strength', desc: 'Physical power & force' },
  { key: 'agility', icon: '⚡', label: 'AGI', abbr: 'Agility', desc: 'Speed & reflexes' },
  { key: 'vitality', icon: '❤️', label: 'VIT', abbr: 'Vitality', desc: 'Endurance & resilience' },
  { key: 'intelligence', icon: '🧠', label: 'INT', abbr: 'Intelligence', desc: 'Strategic thinking' },
  { key: 'sense', icon: '👁️', label: 'SEN', abbr: 'Sense', desc: 'Intuition & awareness' },
];

const getRankColor = (rank) => {
  const rankColors = {
    'E': '#808080', // Gray
    'D': '#00ff00', // Green
    'C': '#00ffff', // Cyan
    'B': '#0099ff', // Blue
    'A': '#ffff00', // Yellow
    'S': '#ff00ff', // Magenta
  };
  return rankColors[rank] || '#ffffff';
};

const StatBar = ({ label, value, maxValue = 100, color, idx }) => {
  const percentage = Math.min(100, (value / maxValue) * 100);
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: idx * 0.04 }}
      className="flex items-center gap-3 px-4 py-2 border-b border-[rgba(41,182,246,0.1)] last:border-b-0 hover:bg-[rgba(41,182,246,0.04)] transition-colors"
    >
      <span className="font-orbitron text-[9px] font-bold w-8 text-right shrink-0" style={{ color }}>
        {label}
      </span>
      <div className="flex-1">
        <div className="h-1.5 bg-[var(--bg2)] border border-[var(--border)] overflow-hidden">
          <motion.div
            className="h-full"
            style={{ background: `linear-gradient(to right, ${color}aa, ${color})` }}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: idx * 0.04 }}
          />
        </div>
      </div>
      <span className="font-jetbrainsmono text-[8px] w-6 text-right shrink-0" style={{ color }}>
        {value}
      </span>
    </motion.div>
  );
};

const StatsPanel = ({ player, quests = [], logs = [] }) => {
  const rankColor = getRankColor(player?.rank || 'E');
  const levelProgress = ((player?.level_in_rank - 1) / 98) * 100; // 1-99 levels

  return (
    <div className="pb-4">
      {/* Panel header */}
      <div className="border border-[rgba(41,182,246,0.5)] bg-[rgba(5,18,36,0.85)] mb-4">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(41,182,246,0.3)] bg-[rgba(41,182,246,0.07)]">
          <div className="flex items-center gap-3">
            <span className="font-orbitron text-[11px] font-bold tracking-[0.25em] text-[var(--blue)]">
              [ STATUS ]
            </span>
            <span className="text-xs text-[var(--muted)]">●</span>
            <span className="font-orbitron text-[10px] font-black" style={{ color: rankColor }}>
              {player?.rank}-RANK
            </span>
          </div>
          <span className="font-orbitron text-[10px] text-[var(--muted)]">
            LV {player?.level_in_rank || 1} / 99
          </span>
        </div>

        {/* Level Progress Bar */}
        <div className="px-4 py-2 border-b border-[rgba(41,182,246,0.1)]">
          <div className="flex items-center justify-between mb-1">
            <span className="font-orbitron text-[8px] font-bold text-[var(--muted)]">RANK PROGRESSION</span>
            <span className="font-jetbrainsmono text-[8px] text-[var(--blue)]">
              {player?.total_xp || 0} XP
            </span>
          </div>
          <div className="h-2 bg-[var(--bg2)] border border-[var(--border)] overflow-hidden">
            <motion.div
              className="h-full"
              style={{ background: `linear-gradient(to right, ${rankColor}aa, ${rankColor})` }}
              initial={{ width: 0 }}
              animate={{ width: `${levelProgress}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* HP/MP Bars */}
        <div className="px-4 py-3 border-b border-[rgba(41,182,246,0.1)]">
          <div className="space-y-2">
            {/* HP */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-orbitron text-[9px] font-bold text-[#ff4444]">HP</span>
                <span className="font-jetbrainsmono text-[8px] text-[#ff4444]">
                  {player?.current_hp || 0} / {player?.max_hp || 100}
                </span>
              </div>
              <div className="h-2 bg-[var(--bg2)] border border-[#664444] overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-red-600 to-red-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${((player?.current_hp || 0) / (player?.max_hp || 100)) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* MP */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-orbitron text-[9px] font-bold text-[#4488ff]">MP</span>
                <span className="font-jetbrainsmono text-[8px] text-[#4488ff]">
                  {player?.current_mp || 0} / {player?.max_mp || 50}
                </span>
              </div>
              <div className="h-2 bg-[var(--bg2)] border border-[#444466] overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-600 to-blue-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${((player?.current_mp || 0) / (player?.max_mp || 50)) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Core Stats */}
        <div>
          {STAT_CONFIG.map((stat, idx) => (
            <StatBar
              key={stat.key}
              label={stat.label}
              value={player?.[stat.key] || 0}
              color={rankColor}
              idx={idx}
            />
          ))}
        </div>

        {/* Additional Info */}
        <div className="px-4 py-2 border-t border-[rgba(41,182,246,0.1)] grid grid-cols-3 gap-2 text-[8px] text-[var(--muted)]">
          <div className="font-jetbrainsmono">
            <div className="text-[var(--muted2)]">Quests Done</div>
            <div className="text-[var(--blue)] font-bold">{player?.total_quests_completed || 0}</div>
          </div>
          <div className="font-jetbrainsmono">
            <div className="text-[var(--muted2)]">Free Points</div>
            <div className="text-[#ffff00] font-bold">{player?.free_points || 0}</div>
          </div>
          <div className="font-jetbrainsmono">
            <div className="text-[var(--muted2)]">Streak</div>
            <div className="text-[#ff6600] font-bold">{player?.streak_days || 0} days</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;
