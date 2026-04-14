import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Brain, Eye, Cpu, TrendingUp, Zap } from 'lucide-react';
import './StatNotification.css';

const StatNotification = ({ stat, amount, onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const statIcons = {
    intelligence: Brain,
    physique: Dumbbell,
    perception: Eye,
    tech: Cpu,
    finance: TrendingUp,
    discipline: Zap,
  };

  const Icon = statIcons[stat] || Zap;

  return (
    <motion.div
      className="stat-notif-hud sl-card-angled"
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.9 }}
      transition={{ type: 'spring', damping: 15 }}
    >
      <div className="sl-frame-corner sl-corner-tl" />
      <div className="sl-frame-corner sl-corner-br" />
      
      <div className="stat-notif-inner-hud">
        <div className="stat-notif-icon-hud">
          <Icon size={18} color="var(--cyan)" />
        </div>
        <div className="stat-notif-text-hud sl-terminal-text">
          <span className="stat-notif-label-hud">STAT_UP:</span>
          <span className="stat-notif-value-hud">+{amount} {stat.toUpperCase()}</span>
        </div>
      </div>
      
      <div className="stat-notif-scanner" />
    </motion.div>
  );
};

export default StatNotification;
