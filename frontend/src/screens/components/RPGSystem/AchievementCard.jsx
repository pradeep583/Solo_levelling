import React from 'react';
import { motion } from 'framer-motion';
import { 
  Droplets, Shield, Sword, Terminal, 
  Activity, TrendingUp, Ghost, Crown, Lock 
} from 'lucide-react';
import './AchievementCard.css';

const AchievementCard = ({ achievement, unlocked }) => {
  const IconMap = {
    blood: Droplets,
    shield: Shield,
    sword: Sword,
    terminal: Terminal,
    physique: Activity,
    finance: TrendingUp,
    shadow: Ghost,
    crown: Crown
  };

  const Icon = IconMap[achievement.icon] || Trophy;
  const isLegendary = achievement.rarity === 'Legendary';

  return (
    <motion.div
      className={`sl-card-angled achievement-card-enhanced ${unlocked ? 'achievement-unlocked' : 'achievement-locked'} ${isLegendary ? 'legendary-rarity' : ''}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={unlocked ? { y: -5, borderColor: 'var(--cyan)' } : {}}
    >
      <div className="sl-hud-corners" />
      
      {/* HUD scanner line for unlocked */}
      {unlocked && <div className="achievement-scan-line" />}

      {/* Icon Section */}
      <div className="achievement-icon-wrapper">
        <Icon className={`achievement-lucide-icon ${unlocked ? 'icon-active' : 'icon-dim'}`} />
        {isLegendary && unlocked && <div className="legendary-glimmer" />}
      </div>

      {/* Info */}
      <div className="achievement-info-main">
        <div className="achievement-name-card">{achievement.name}</div>
        <div className="achievement-desc-card">{achievement.description}</div>
      </div>

      {/* Status HUD readout */}
      <div className="achievement-status-hud sl-terminal-text">
        {unlocked ? (
          <span className="status-readout-cleared">STATUS: [UNLOCKED]</span>
        ) : (
          <div className="status-readout-locked">
            <Lock className="lock-mini-icon" />
            <span>STATUS: [ENCRYPTED]</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AchievementCard;
