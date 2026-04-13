import React from 'react';
import { motion } from 'framer-motion';
import { clearAllData } from '../../utils/storageManager';

const SystemPage = ({ player, onResetQuests }) => {
  const handleResetData = () => {
    if (window.confirm('Are you SURE? This will clear ALL data permanently!')) {
      clearAllData();
      window.location.reload();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* System info */}
      <div className="panel">
        <h2 style={{ fontSize: '16px', marginBottom: '12px', color: '#00d4ff' }}>
          SYSTEM INFO
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
          <div>
            <strong style={{ color: '#7a8399' }}>Player Name:</strong> {player.name}
          </div>
          <div>
            <strong style={{ color: '#7a8399' }}>Current Level:</strong> {player.level}
          </div>
          <div>
            <strong style={{ color: '#7a8399' }}>Title:</strong> {player.title}
          </div>
          <div>
            <strong style={{ color: '#7a8399' }}>Total XP:</strong> {player.totalXP}
          </div>
          <div>
            <strong style={{ color: '#7a8399' }}>Streak:</strong> {player.streak} days
          </div>
          <div>
            <strong style={{ color: '#7a8399' }}>Current Date:</strong>{' '}
            {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="panel">
        <h2 style={{ fontSize: '16px', marginBottom: '12px', color: '#00d4ff' }}>ACTIONS</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button
            onClick={onResetQuests}
            style={{
              width: '100%',
              padding: '10px',
              borderColor: '#00d4ff',
              color: '#00d4ff',
            }}
          >
            Reset Today's Quests
          </button>
          <button
            onClick={handleResetData}
            className="btn-danger"
            style={{
              width: '100%',
              padding: '10px',
            }}
          >
            Clear All Data
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="panel">
        <h2 style={{ fontSize: '16px', marginBottom: '12px', color: '#00d4ff' }}>ABOUT</h2>
        <p style={{ fontSize: '12px', lineHeight: '1.8', color: '#b0b8d0' }}>
          This is a Solo Leveling-inspired personal RPG system. Track your daily quests, level up,
          unlock achievements, and improve your stats across 6 categories.
        </p>
        <p style={{ fontSize: '12px', lineHeight: '1.8', color: '#b0b8d0', marginTop: '12px' }}>
          Complete quests to earn XP and stat points. Penalties are applied for missed quests on
          the next day. Reach higher ranks (D → C → B → A → S) in each stat!
        </p>
      </div>
    </motion.div>
  );
};

export default SystemPage;
