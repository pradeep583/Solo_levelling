import React from 'react';

const AchievementCard = ({ achievement, unlocked }) => {
  return (
    <div
      className="card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        opacity: unlocked ? 1 : 0.5,
        borderColor: unlocked ? 'rgba(212, 175, 55, 0.6)' : 'rgba(0, 212, 255, 0.2)',
        ...( unlocked && {
          boxShadow: '0 0 20px rgba(212, 175, 55, 0.2)',
          background: 'rgba(212, 175, 55, 0.05)',
        }),
      }}
    >
      <div style={{ fontSize: '32px', marginBottom: '8px' }}>{achievement.icon}</div>
      <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#00d4ff', marginBottom: '4px' }}>
        {achievement.name}
      </div>
      <div style={{ fontSize: '10px', color: '#7a8399', lineHeight: '1.4' }}>
        {achievement.description}
      </div>
      <div
        style={{
          marginTop: '8px',
          fontSize: '10px',
          fontWeight: 'bold',
          color: unlocked ? '#d4af37' : '#7a8399',
          textTransform: 'uppercase',
        }}
      >
        {unlocked ? '⭐ UNLOCKED' : '🔒 LOCKED'}
      </div>
    </div>
  );
};

export default AchievementCard;
