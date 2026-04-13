import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './StatNotification.css';

const StatNotification = ({ stat, amount, onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const statIcons = {
    intelligence: '🧠',
    physique: '💪',
    perception: '👁️',
    tech: '📡',
    finance: '💰',
    discipline: '🔥',
  };

  const statLabels = {
    intelligence: 'Intelligence',
    physique: 'Physique',
    perception: 'Perception',
    tech: 'Tech',
    finance: 'Finance',
    discipline: 'Discipline',
  };

  return (
    <motion.div
      className="stat-notification"
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.8 }}
      transition={{ type: 'spring', damping: 20 }}
    >
      <div className="stat-notif-icon">{statIcons[stat]}</div>
      <div className="stat-notif-content">
        <div className="stat-notif-label">{statLabels[stat]}</div>
        <motion.div
          className="stat-notif-amount"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.6 }}
        >
          +{amount}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StatNotification;
