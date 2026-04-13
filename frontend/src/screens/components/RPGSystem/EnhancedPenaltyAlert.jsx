import React from 'react';
import { motion } from 'framer-motion';
import './EnhancedPenaltyAlert.css';

const EnhancedPenaltyAlert = ({ penalties }) => {
  if (!penalties || penalties.length === 0) return null;

  return (
    <motion.div
      className="penalty-alert-container"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="penalty-header">
        <div className="penalty-icon">⚠️</div>
        <div className="penalty-title">PENALTIES APPLIED</div>
      </div>

      {/* Divider */}
      <div className="penalty-divider" />

      {/* Penalties List */}
      <div className="penalties-list">
        {penalties.map((penalty, idx) => (
          <motion.div
            key={idx}
            className="penalty-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <span className="penalty-quest">{penalty.quest}</span>
            <span className="penalty-value">
              -{penalty.amount} {penalty.stat}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Warning info */}
      <div className="penalty-info">
        Complete more quests tomorrow to avoid further penalties.
      </div>
    </motion.div>
  );
};

export default EnhancedPenaltyAlert;
