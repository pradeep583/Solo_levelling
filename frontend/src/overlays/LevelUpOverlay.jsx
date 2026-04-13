import React from 'react';
import { motion } from 'framer-motion';

const RANK_NAMES = {
  'E': 'E-RANK HUNTER',
  'D': 'D-RANK HUNTER',
  'C': 'C-RANK HUNTER',
  'B': 'B-RANK HUNTER',
  'A': 'A-RANK HUNTER',
  'S': 'S-RANK AWAKENED',
};

const RANK_COLORS = {
  'E': '#808080',
  'D': '#00ff00',
  'C': '#00ffff',
  'B': '#0099ff',
  'A': '#ffff00',
  'S': '#ff00ff',
};

const getBgGlow = (rank) => {
  const glows = {
    'E': 'rgba(128, 128, 128, 0.3)',
    'D': 'rgba(0, 255, 0, 0.3)',
    'C': 'rgba(0, 255, 255, 0.3)',
    'B': 'rgba(0, 153, 255, 0.3)',
    'A': 'rgba(255, 255, 0, 0.3)',
    'S': 'rgba(255, 0, 255, 0.5)',
  };
  return glows[rank] || glows['E'];
};

const LevelUpOverlay = ({ level, rank = 'E', isRankUp = false, onClose }) => {
  const rankColor = RANK_COLORS[rank] || '#ffffff';
  const rankName = RANK_NAMES[rank] || 'HUNTER';
  const bgGlow = getBgGlow(rank);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] bg-black/97 flex flex-col items-center justify-center p-8 overflow-hidden"
      style={{
        background: `radial-gradient(circle at center, ${bgGlow}, black)`,
      }}
    >
      {/* Animated borders/glitch effect */}
      <motion.div
        className="absolute inset-0 border-2"
        style={{ borderColor: rankColor }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      <div className="flex flex-col items-center gap-6 text-center relative z-10">
        {/* Alert Type */}
        {isRankUp ? (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-orbitron text-[12px] text-[#ffaa00] tracking-[0.3em] font-bold"
          >
            ⚡ RANK PROMOTION ⚡
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-orbitron text-[12px] text-[var(--blue)] tracking-[0.3em] font-bold"
          >
            ◆ LEVEL UP ◆
          </motion.div>
        )}

        {/* Level/Rank Display */}
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: -180 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 6, stiffness: 120 }}
          className="text-center"
        >
          {isRankUp ? (
            <div>
              <div
                className="font-orbitron text-[80px] font-black leading-none mb-2"
                style={{
                  color: rankColor,
                  textShadow: `0 0 40px ${rankColor}, 0 0 80px ${rankColor}80`,
                }}
              >
                {rank}
              </div>
              <div className="font-orbitron text-[20px] text-[var(--blue)] tracking-wider">
                NEW RANK ACHIEVED
              </div>
            </div>
          ) : (
            <div>
              <div
                className="font-orbitron text-[100px] font-black leading-none mb-2"
                style={{
                  color: rankColor,
                  textShadow: `0 0 40px ${rankColor}, 0 0 80px ${rankColor}80`,
                }}
              >
                {level}
              </div>
              <div className="font-orbitron text-[14px] text-[var(--blue)] tracking-wider">
                LEVEL UP
              </div>
            </div>
          )}
        </motion.div>

        {/* Rank Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-orbitron text-[16px] tracking-wider"
          style={{ color: rankColor }}
        >
          {rankName}
        </motion.div>

        {/* Stat Bonuses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-rajdhani text-[12px] text-[var(--muted)]"
        >
          {isRankUp ? (
            <div className="space-y-1">
              <div>⬆️ ALL STATS +Bonus</div>
              <div>⬆️ HP/MP Fully Restored</div>
              <div>⬆️ SKILL POINT Gained</div>
            </div>
          ) : (
            <div className="space-y-1">
              <div>⬇ STR, AGI, VIT, INT, SEN +1</div>
              <div>⬇ MAX HP +10 · MAX MP +5</div>
              <div>⬇ FREE POINTS +1</div>
            </div>
          )}
        </motion.div>

        {/* Acknowledge Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 px-8 py-2 bg-transparent border-2 text-[var(--blue)] font-orbitron text-xs tracking-widest rounded-lg active:scale-95 transition-all"
          style={{
            borderColor: rankColor,
            color: rankColor,
            boxShadow: `0 0 15px ${rankColor}66`,
          }}
        >
          ACKNOWLEDGE
        </motion.button>
      </div>
    </motion.div>
  );
};

export default LevelUpOverlay;
