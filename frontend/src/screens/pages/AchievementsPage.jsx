import React from 'react';
import { motion } from 'framer-motion';
import AchievementCard from '../components/RPGSystem/AchievementCard';
import { ACHIEVEMENTS } from '../../utils/questData';

const AchievementsPage = ({ achievements }) => {
  const achievementList = Object.values(ACHIEVEMENTS);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {achievementList.map((achievement, idx) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
          >
            <AchievementCard
              achievement={achievement}
              unlocked={achievements[achievement.id]}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AchievementsPage;
