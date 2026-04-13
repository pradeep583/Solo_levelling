import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './QuestPanelInfo.css';

const QuestPanelInfo = ({ quest, timeRemaining = null, onClose }) => {
  const [displayTime, setDisplayTime] = useState(timeRemaining);

  useEffect(() => {
    if (!timeRemaining) return;

    const timer = setInterval(() => {
      setDisplayTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <motion.div
      className="quest-panel-info"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glow effects */}
      <div className="quest-glow quest-glow-1" />
      <div className="quest-glow quest-glow-2" />

      {/* Main container */}
      <div className="quest-container">
        {/* Header */}
        <div className="quest-header">
          <div className="quest-title">QUEST INFO</div>
          {onClose && (
            <button className="quest-close" onClick={onClose}>
              ✕
            </button>
          )}
        </div>

        {/* Divider */}
        <div className="quest-divider" />

        {/* Quest name and description */}
        <div className="quest-content">
          <div className="quest-name">{quest.name}</div>
          <div className="quest-description">{quest.description}</div>

          {/* Goal section */}
          <div className="quest-section">
            <div className="quest-section-title">GOAL</div>
            <div className="quest-goal-text">{quest.goal}</div>
          </div>

          {/* Rewards section */}
          {quest.rewards && (
            <div className="quest-section">
              <div className="quest-section-title">REWARDS</div>
              <div className="quest-rewards-grid">
                {quest.rewards.map((reward, idx) => (
                  <div key={idx} className="quest-reward-item">
                    <span className="reward-label">{reward.label}</span>
                    <span className="reward-value">+{reward.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stats section */}
          {quest.stats && (
            <div className="quest-stats">
              {quest.stats.map((stat, idx) => (
                <div key={idx} className="quest-stat-row">
                  <span className="stat-name">{stat.name}</span>
                  <span className="stat-value">
                    <span className="stat-base">{stat.current}</span>
                    <span className="stat-boost">+{stat.boost}</span>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="quest-divider" />

        {/* Timer if provided */}
        {displayTime !== null && (
          <div className="quest-timer-section">
            <div className="quest-timer">
              {formatTime(displayTime)}
            </div>
          </div>
        )}
      </div>

      {/* Border frame */}
      <div className="quest-frame" />
    </motion.div>
  );
};

export default QuestPanelInfo;
