import React from 'react';
import { motion } from 'framer-motion';
import { getXPToNextLevel, getRankFromPoints } from '../../../utils/gameUtils';
import './PlayerCard.css';

const PlayerCard = ({ player }) => {
  const xpToNext = getXPToNextLevel(player.totalXP, player.level);
  const xpRequired = player.level * 100;
  const xpInLevel = player.totalXP - (xpRequired - player.level * 100);
  const progress = ((xpRequired - xpToNext) / xpRequired) * 100;

  return (
    <motion.div
      className="player-card-enhanced"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Ornate top border */}
      <div className="player-card-ornate-top" />

      {/* Main content */}
      <div className="player-card-content">
        {/* Left section - Rank & Level */}
        <div className="player-card-left">
          <div className="player-level-display">
            <div className="player-level-number">{player.level}</div>
            <div className="player-level-label">LEVEL</div>
          </div>
        </div>

        {/* Center section - Info */}
        <div className="player-card-center">
          <div className="player-name">{player.name}</div>
          <div className="player-title">{player.title}</div>
          <div className="player-streak">
            <span className="streak-icon">🔥</span>
            <span className="streak-value">{player.streak}</span>
            <span className="streak-label">DAYS</span>
          </div>
        </div>

        {/* Right section - Stats summary */}
        <div className="player-card-right">
          <div className="player-stat-mini">
            <span className="mini-label">XP</span>
            <span className="mini-value">{player.totalXP}</span>
          </div>
        </div>
      </div>

      {/* XP Bar */}
      <div className="player-xp-section">
        <div className="xp-label">
          <span className="xp-current">{Math.floor(xpInLevel)}</span>
          <span className="xp-separator">/</span>
          <span className="xp-required">{xpRequired}</span>
        </div>
        <div className="xp-bar-container">
          <motion.div
            className="xp-bar-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
        <div className="xp-to-next">+{xpToNext} to Level {player.level + 1}</div>
      </div>

      {/* Ornate bottom border */}
      <div className="player-card-ornate-bottom" />
    </motion.div>
  );
};

export default PlayerCard;
