import React from 'react';
import { motion } from 'framer-motion';
import { getXPToNextLevel } from '../../../utils/gameUtils';
import './PlayerCard.css';

const PlayerCard = ({ player }) => {
  const xpToNext = getXPToNextLevel(player.totalXP, player.level);
  const xpRequired = player.level * 100;
  const progress = Math.min(100, (player.totalXP / xpRequired) * 100);
  
  const rank = player.rank || (player.level < 5 ? 'E' : player.level < 10 ? 'D' : player.level < 15 ? 'C' : player.level < 20 ? 'B' : 'A');

  return (
    <motion.div
      className="sl-card-angled player-card-enhanced"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="sl-hud-corners" />
      
      {/* Background scanlines for card */}
      <div className="player-card-bg-noise" />

      <div className="player-card-content">
        {/* Rank Identity */}
        <div className={`player-rank-hexagon rank-${rank.toLowerCase()}`}>
          <div className="rank-text">{rank}</div>
          <div className="rank-sub">RANK</div>
        </div>

        {/* Info Column */}
        <div className="player-main-info">
          <div className="player-meta-id sl-terminal-text">[ ID: HUNTER_ {player.name.toUpperCase()} ]</div>
          <div className="player-name-glitch" data-text={player.name}>{player.name}</div>
          <div className="player-class-title">{player.title || 'NOVICE HUNTER'}</div>
          
          <div className="player-stats-row">
            <div className="mini-stat">
              <span className="mini-label">LEVEL</span>
              <span className="mini-value-gold">{player.level}</span>
            </div>
            <div className="mini-stat">
              <span className="mini-label">STREAK</span>
              <span className="mini-value-cyan">{player.streak}D</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modernized HUD XP Gauge */}
      <div className="player-xp-hud">
        <div className="xp-label-row">
          <span className="xp-title sl-terminal-text">EXPERIENCE_GAUGE</span>
          <span className="xp-countdown">NEXT_LVL: -{xpToNext} XP</span>
        </div>
        
        <div className="xp-gauge-container">
          <motion.div
            className="xp-gauge-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
          {/* Gauge Markers */}
          <div className="gauge-markers">
            {[...Array(10)].map((_, i) => <div key={i} className="marker" />)}
          </div>
        </div>

        <div className="xp-values-row">
          <span className="xp-current">{Math.floor(player.totalXP)}</span>
          <span className="xp-divider">/</span>
          <span className="xp-target">{xpRequired}</span>
        </div>
      </div>

      <div className="player-card-footer">
        <div className="system-status-blink" />
        <span className="sl-terminal-text">CONNECTION: STABLE // ACCESS: GRANTED</span>
      </div>
    </motion.div>
  );
};

export default PlayerCard;
