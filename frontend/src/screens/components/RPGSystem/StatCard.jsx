import React from 'react';
import { motion } from 'framer-motion';
import { getRankColor } from '../../../utils/gameUtils';
import './StatCard.css';

const StatCard = ({ icon, name, points, rank }) => {
  const rankColor = getRankColor(rank);
  const rankClass = rank.toLowerCase();

  return (
    <motion.div
      className={`stat-card-enhanced stat-card-${rankClass}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Top accent line */}
      <div className="stat-card-accent-top" />

      {/* Header with icon and rank */}
      <div className="stat-card-header">
        <div className="stat-card-icon">{icon}</div>
        <div className={`rank-chip stat-chip-${rankClass}`}>{rank}</div>
      </div>

      {/* Name */}
      <div className="stat-card-name">{name}</div>

      {/* Points display */}
      <div className={`stat-card-points rank-${rankClass}`}>
        {points}
      </div>

      {/* Mini label */}
      <div className="stat-card-label">/100</div>

      {/* Progress bar */}
      <div className="stat-card-bar-container">
        <motion.div
          className={`stat-card-bar-fill rank-${rankClass}`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, points)}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>

      {/* Rank info */}
      <div className="stat-rank-info">
        {rank === 'S' && <span>SUPREME RANK</span>}
        {rank === 'A' && <span>ADVANCED RANK</span>}
        {rank === 'B' && <span>COMPETENT RANK</span>}
        {rank === 'C' && <span>DEVELOPING RANK</span>}
        {rank === 'D' && <span>BEGINNER RANK</span>}
      </div>

      {/* Bottom accent line */}
      <div className="stat-card-accent-bottom" />
    </motion.div>
  );
};

export default StatCard;
