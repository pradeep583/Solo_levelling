import React from 'react';
import { motion } from 'framer-motion';
import './QuestCard.css';

const QuestCard = ({ quest, completed, onComplete }) => {
  return (
    <motion.div
      className={`quest-card-enhanced ${completed ? 'quest-completed' : ''}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onComplete}
    >
      {/* Completion glow */}
      {completed && <div className="quest-complete-glow" />}

      {/* Main content */}
      <div className="quest-card-main">
        {/* Left - Icon & Name */}
        <div className="quest-card-left">
          <div className="quest-card-icon">{quest.icon}</div>
          <div className="quest-card-info">
            <div className="quest-card-name">{quest.name}</div>
            <div className="quest-card-xp">+{quest.xp} XP</div>
          </div>
        </div>

        {/* Right - Status */}
        <div className="quest-card-right">
          <motion.div
            className={`quest-status-badge ${completed ? 'status-done' : 'status-todo'}`}
            animate={completed ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.4 }}
          >
            {completed ? (
              <>
                <span className="status-icon">✓</span>
                <span className="status-text">DONE</span>
              </>
            ) : (
              <>
                <span className="status-icon">→</span>
                <span className="status-text">TODO</span>
              </>
            )}
          </motion.div>
        </div>
      </div>

      {/* Completion checkmark animation */}
      {completed && (
        <motion.div
          className="quest-checkmark"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          ✓
        </motion.div>
      )}
    </motion.div>
  );
};

export default QuestCard;
