import React from 'react';
import { motion } from 'framer-motion';
import './StatusPanel.css';

const StatusPanel = ({ player, onClose }) => {
  const statusItems = [
    { label: 'Rank', value: player.rank },
    { label: 'Level', value: `${player.level_in_rank}/99` },
    { label: 'EXP', value: player.total_xp.toLocaleString() },
    { label: 'HP', value: `${player.current_hp}/${player.max_hp}` },
    { label: 'MP', value: `${player.current_mp}/${player.max_mp}` },
    { label: 'Quests', value: player.total_quests_completed },
  ];

  const attributes = [
    { label: 'STR', value: player.strength },
    { label: 'AGI', value: player.agility },
    { label: 'VIT', value: player.vitality },
    { label: 'INT', value: player.intelligence },
    { label: 'SEN', value: player.sense },
  ];

  return (
    <motion.div
      className="status-panel"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
    >
      {/* Glow effects */}
      <div className="status-glow status-glow-1" />
      <div className="status-glow status-glow-2" />

      {/* Main container */}
      <div className="status-container">
        {/* Header */}
        <div className="status-header">
          <div className="status-title">STATUS</div>
          {onClose && (
            <button className="status-close" onClick={onClose}>
              ✕
            </button>
          )}
        </div>

        {/* Divider */}
        <div className="status-divider" />

        {/* Main stats grid */}
        <div className="status-grid">
          {statusItems.map((item, idx) => (
            <motion.div
              key={item.label}
              className="status-item"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <div className="status-item-label">{item.label}</div>
              <div className="status-item-value">{item.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="status-divider" />

        {/* Attributes */}
        <div className="attributes-section">
          <div className="attributes-title">ATTRIBUTES</div>
          <div className="attributes-grid">
            {attributes.map((attr, idx) => (
              <motion.div
                key={attr.label}
                className="attribute-item"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="attribute-label">{attr.label}</div>
                <div className="attribute-value">{attr.value}</div>
                <div className="attribute-bar">
                  <motion.div
                    className="attribute-bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${(attr.value / 50) * 100}%` }}
                    transition={{ delay: 0.3 + idx * 0.05 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Frame */}
      <div className="status-frame" />
    </motion.div>
  );
};

export default StatusPanel;
