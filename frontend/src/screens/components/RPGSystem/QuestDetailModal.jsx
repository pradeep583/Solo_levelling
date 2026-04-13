import React from 'react';
import { motion } from 'framer-motion';
import './QuestDetailModal.css';

const QuestDetailModal = ({ quest, isOpen, onClose, onComplete, completed }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      className="quest-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="quest-modal-content"
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ornate Corners */}
        <div className="quest-corner quest-corner-tl" />
        <div className="quest-corner quest-corner-tr" />
        <div className="quest-corner quest-corner-bl" />
        <div className="quest-corner quest-corner-br" />

        {/* Header with Icon */}
        <div className="quest-modal-header">
          <div className="quest-icon-large">{quest.icon}</div>
          <div className="quest-modal-title">QUEST INFO</div>
          <button className="quest-close-btn" onClick={onClose}>✕</button>
        </div>

        {/* Divider */}
        <div className="quest-divider" />

        {/* Quest Name & Description */}
        <div className="quest-modal-description">
          <div className="quest-name-large">{quest.name}</div>
          <div className="quest-description-text">[Daily Quest: {quest.name} has arrived.]</div>
        </div>

        {/* Goals Section */}
        <div className="quest-section">
          <div className="section-title">━━ GOALS ━━</div>
          <div className="goals-list">
            <div className="goal-item">
              <span className="goal-name">Objective</span>
              <span className="goal-progress">[100/100] ✓</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="quest-divider" />

        {/* Rewards Section */}
        <div className="quest-section">
          <div className="section-title">━━ REWARDS ━━</div>
          <div className="rewards-container">
            <div className="reward-box">
              <span className="reward-label">+XP</span>
              <span className="reward-amount">{quest.xp}</span>
            </div>
            <div className="reward-box">
              <span className="reward-label">+Stat</span>
              <span className="reward-amount">
                {quest.stats
                  ? Object.entries(quest.stats)
                      .map(([s, p]) => `${p}`)
                      .join(', ')
                  : quest.increment}
              </span>
            </div>
          </div>
        </div>

        {/* Warning if applicable */}
        <div className="quest-warning">
          <span className="warning-icon">⚠️</span>
          <span>Failure to complete the daily quest will result in an appropriate penalty.</span>
        </div>

        {/* Divider */}
        <div className="quest-divider" />

        {/* Action Buttons */}
        <div className="quest-actions">
          <motion.button
            className="btn-quest-accept"
            onClick={onComplete}
            disabled={completed}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {completed ? '✓ COMPLETED' : 'ACCEPT QUEST'}
          </motion.button>
          <motion.button
            className="btn-quest-cancel"
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            DECLINE
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default QuestDetailModal;
