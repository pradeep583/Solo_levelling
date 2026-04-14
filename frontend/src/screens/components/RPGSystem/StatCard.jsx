import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Activity, Target, Cpu, TrendingUp, ShieldAlert } from 'lucide-react';
import './StatCard.css';

const StatCard = ({ icon, name, points, rank }) => {
  const IconMap = {
    intelligence: Brain,
    physique: Activity,
    perception: Target,
    tech: Cpu,
    finance: TrendingUp,
    discipline: ShieldAlert
  };

  const Icon = IconMap[icon] || Activity;

  return (
    <motion.div
      className={`sl-card-angled stat-card-enhanced stat-card-${rank.toLowerCase()}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4, borderColor: 'var(--cyan)' }}
    >
      <div className="sl-hud-corners" />
      
      {/* Header with icon and rank */}
      <div className="stat-card-header">
        <div className="stat-lucide-container">
          <Icon className="stat-lucide-icon" />
          <div className="stat-icon-scanner" />
        </div>
        <div 
          className="rank-chip"
          style={{ 
            borderColor: `var(--rank-${rank.toLowerCase()})`,
            color: `var(--rank-${rank.toLowerCase()})`
          }}
        >
          {rank}-RANK
        </div>
      </div>

      {/* Name */}
      <div className="stat-card-name" style={{ color: `var(--rank-${rank.toLowerCase()})` }}>
        {name.toUpperCase()}
      </div>

      {/* Points display */}
      <div className="stat-card-points">
        <span className="current-points">{points}</span>
        <span className="max-points">/ 100</span>
      </div>

      {/* Progress bar */}
      <div className="stat-card-bar-container">
        <motion.div
          className="stat-card-bar-fill"
          style={{ 
            backgroundColor: `var(--rank-${rank.toLowerCase()})`,
            boxShadow: `0 0 15px var(--rank-${rank.toLowerCase()})`
          }}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, points)}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>

      {/* bottom info */}
      <div className="stat-rank-info sl-terminal-text">
        [ SYSTEM_RECOGNITION: {rank === 'S' ? 'MONARCH' : rank === 'A' ? 'ELITE' : 'HUNTER'} ]
      </div>
    </motion.div>
  );
};

export default StatCard;
