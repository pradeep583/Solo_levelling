import React from 'react';
import { motion } from 'framer-motion';
import StatCard from '../components/RPGSystem/StatCard';
import PlayerCard from '../components/RPGSystem/PlayerCard';
import { getRankFromPoints } from '../../utils/gameUtils';

const StatusPage = ({ player, stats }) => {
  const statList = [
    { key: 'intelligence', icon: '🧠', name: 'Intelligence' },
    { key: 'physique', icon: '💪', name: 'Physique' },
    { key: 'perception', icon: '👁️', name: 'Perception' },
    { key: 'tech', icon: '📡', name: 'Tech' },
    { key: 'finance', icon: '💰', name: 'Finance' },
    { key: 'discipline', icon: '🔥', name: 'Discipline' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Player card */}
      <PlayerCard player={player} />

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {statList.map((stat, idx) => (
          <motion.div
            key={stat.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <StatCard
              icon={stat.icon}
              name={stat.name}
              points={stats[stat.key]}
              rank={getRankFromPoints(stats[stat.key])}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default StatusPage;
