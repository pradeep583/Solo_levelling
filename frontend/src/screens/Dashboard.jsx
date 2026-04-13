import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Zap, Sword, Wind, Shield, Brain, Eye } from 'lucide-react';
import QuestsPanel from '../panels/QuestsPanel';
import './Dashboard.css';

const getRankColor = (rank) => {
  const colors = {
    'E': '#808080', 'D': '#00ff00', 'C': '#00ffff',
    'B': '#0099ff', 'A': '#ffff00', 'S': '#ff00ff',
  };
  return colors[rank] || '#ffffff';
};

const Dashboard = ({ player, quests, logs, onComplete, onUndo }) => {
  if (!player) return null;

  const rankColor = getRankColor(player.rank);
  const levelProgress = ((player.level_in_rank - 1) / 98) * 100;

  const stats = [
    { icon: Heart, label: 'HP', value: player.current_hp, max: player.max_hp, color: '#ff1744', current: true },
    { icon: Zap, label: 'MP', value: player.current_mp, max: player.max_mp, color: '#1e90ff', current: true },
  ];

  const attributes = [
    { icon: Sword, label: 'STR', value: player.strength, max: 50, color: '#ff6b6b' },
    { icon: Wind, label: 'AGI', value: player.agility, max: 50, color: '#51cf66' },
    { icon: Shield, label: 'VIT', value: player.vitality, max: 50, color: '#ffd93d' },
    { icon: Brain, label: 'INT', value: player.intelligence, max: 50, color: '#a78bfa' },
  ];

  const infos = [
    { label: 'Quests Done', value: player.total_quests_completed, color: '#00ffff' },
    { label: 'Free Points', value: player.free_points, color: '#ffd700' },
    { label: 'Streak', value: `${player.streak_days}d`, color: '#ff6b35' },
  ];

  return (
    <div className="dashboard-container">
      {/* Background gradient */}
      <div className="dashboard-bg-gradient" />
      
      {/* Content */}
      <div className="dashboard-content">
        
        {/* ========== HEADER ========== */}
        <header className="dashboard-header">
          <div className="dashboard-header-content">
            <div className="header-left">
              <motion.div 
                className="header-title-section"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div 
                  className="rank-badge"
                  style={{ 
                    borderColor: rankColor,
                    color: rankColor,
                    boxShadow: `0 0 20px ${rankColor}40, inset 0 0 10px ${rankColor}20`
                  }}
                >
                  {player.rank}-RANK
                </div>
                <div className="level-text">
                  LEVEL {player.level_in_rank}/99
                </div>
              </motion.div>
              <h1 className="header-name" style={{ color: rankColor }}>
                {player.name || 'HUNTER'}
              </h1>
            </div>
            <motion.div 
              className="header-xp-section"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="xp-label">Total Experience</div>
              <div className="xp-value" style={{ color: rankColor }}>
                {player.total_xp.toLocaleString()}
              </div>
            </motion.div>
          </div>
        </header>

        {/* ========== MAIN CONTENT ========== */}
        <div className="dashboard-main">

          {/* ========== HERO LEVEL SECTION ========== */}
          <motion.section
            className="level-hero-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="level-hero-overlay" />
            <div className="level-hero-content">
              <div className="level-progress-left">
                <div className="progress-label">Rank Progression</div>
                <div className="level-numbers">
                  <div className="level-current">{player.level_in_rank}</div>
                  <div className="level-divider">/</div>
                  <div className="level-max">99</div>
                </div>
                <div className="progress-bar">
                  <motion.div
                    className="progress-bar-fill"
                    style={{ color: rankColor }}
                    initial={{ width: 0 }}
                    animate={{ width: `${levelProgress}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>
              <motion.div 
                className="next-level-right"
                whileHover={{ scale: 1.05 }}
              >
                <div className="next-level-label">Next Level</div>
                <div className="next-level-value" style={{ color: rankColor }}>
                  {Math.ceil((99 - player.level_in_rank) * 1000 * Math.pow(1.15, 98 - player.level_in_rank)).toLocaleString()}
                </div>
                <div className="next-level-desc">XP Required</div>
              </motion.div>
            </div>
          </motion.section>

          {/* ========== STATS SECTION ========== */}
          <section>
            <div className="stats-section-title">
              <motion.div 
                className="stats-accent-bar"
                style={{ color: rankColor }}
                animate={{ boxShadow: [`0 0 10px ${rankColor}`, `0 0 20px ${rankColor}`, `0 0 10px ${rankColor}`] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              Battle Stats
            </div>
            
            {/* HP & MP Row */}
            <div className="hp-mp-row">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                const percentage = Math.round((stat.value / stat.max) * 100);
                return (
                  <motion.div 
                    key={stat.label}
                    className={`stat-card ${stat.label.toLowerCase()}`}
                    whileHover={{ 
                      borderColor: stat.color,
                      boxShadow: `0 0 30px ${stat.color}50`
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                  >
                    <div className="stat-card-overlay" />
                    <div className="stat-card-content">
                      <div className="stat-header">
                        <div className="stat-header-left">
                          <Icon className="stat-icon" style={{ color: stat.color }} />
                          <span className="stat-name" style={{ color: `${stat.color}b3` }}>{stat.label}</span>
                        </div>
                        <span className="stat-percentage" style={{ color: `${stat.color}80` }}>{percentage}%</span>
                      </div>
                      <div className="stat-values">
                        <div className="stat-value" style={{ color: stat.color }}>{stat.value}</div>
                        <div className="stat-max">/ {stat.max}</div>
                      </div>
                      <div className="stat-bar">
                        <motion.div
                          className="stat-bar-fill"
                          style={{ background: `linear-gradient(to right, ${stat.color}, ${stat.color}66)` }}
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.6 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Attributes Grid */}
            <div className="attributes-grid">
              {attributes.map((attr, idx) => {
                const Icon = attr.icon;
                const percentage = Math.min(100, (attr.value / attr.max) * 100);
                return (
                  <motion.div
                    key={attr.label}
                    className="stat-card attr"
                    whileHover={{ 
                      borderColor: attr.color,
                      y: -4,
                      boxShadow: `0 0 20px ${attr.color}40`
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + idx * 0.05 }}
                  >
                    <div className="stat-card-overlay" />
                    <div className="stat-card-content">
                      <div className="stat-header">
                        <Icon className="stat-icon" style={{ color: attr.color }} />
                        <span className="stat-name" style={{ color: `${attr.color}b3` }}>{attr.label}</span>
                      </div>
                      <div className="stat-value" style={{ color: attr.color }}>
                        {attr.value}
                      </div>
                      <div style={{ marginTop: '12px' }}>
                        <div className="stat-bar">
                          <motion.div
                            className="stat-bar-fill"
                            style={{ background: `linear-gradient(to right, ${attr.color}dd, ${attr.color}44)` }}
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Sense Stat */}
            <motion.div 
              className="stat-card sense-card"
              whileHover={{ 
                borderColor: '#00ffff',
                boxShadow: '0 0 30px rgba(0, 255, 255, 0.2)'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="stat-card-overlay" />
              <div className="stat-card-content">
                <div className="stat-header">
                  <div className="stat-header-left">
                    <Eye className="stat-icon" style={{ color: '#00ffff' }} />
                    <span className="stat-name" style={{ color: 'rgba(0, 212, 255, 0.7)' }}>Sense</span>
                  </div>
                  <span className="stat-percentage" style={{ color: 'rgba(0, 212, 255, 0.5)' }}>
                    {Math.round((player.sense / 50) * 100)}% Capacity
                  </span>
                </div>
                <div className="stat-values">
                  <div className="stat-value" style={{ color: '#00ffff' }}>{player.sense}</div>
                  <div className="stat-max">/ 50</div>
                </div>
                <div className="stat-bar">
                  <motion.div
                    className="stat-bar-fill"
                    style={{ background: 'linear-gradient(to right, #00ffff, #00d4ff)' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (player.sense / 50) * 100)}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                </div>
              </div>
            </motion.div>
          </section>

          {/* ========== INFO BAR ========== */}
          <motion.div 
            className="info-bar"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {infos.map((info, idx) => (
              <motion.div
                key={info.label}
                className="info-card"
                whileHover={{ y: -8, boxShadow: `0 0 30px ${info.color}40` }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.65 + idx * 0.05 }}
              >
                <div className="info-card-overlay" />
                <div className="info-card-content">
                  <div className="info-label">{info.label}</div>
                  <div className="info-value" style={{ color: info.color }}>
                    {info.value}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* ========== DUNGEONS SECTION ========== */}
          <motion.section
            className="dungeons-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="dungeons-title">
              <motion.div 
                style={{ backgroundColor: rankColor, width: '6px', height: '32px', borderRadius: '3px' }}
                animate={{ boxShadow: [`0 0 10px ${rankColor}`, `0 0 20px ${rankColor}`, `0 0 10px ${rankColor}`] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              Daily Dungeons
            </div>
            
            <QuestsPanel 
              player={player} 
              quests={quests} 
              logs={logs} 
              onComplete={onComplete} 
              onUndo={onUndo} 
            />
          </motion.section>

        </div>

        {/* Padding for bottom */}
        <div style={{ height: '80px' }} />
      </div>
    </div>
  );
};

export default Dashboard;
