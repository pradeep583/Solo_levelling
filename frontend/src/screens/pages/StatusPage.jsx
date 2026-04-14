import React from 'react';
import { motion } from 'framer-motion';
import StatCard from '../components/RPGSystem/StatCard';
import PlayerCard from '../components/RPGSystem/PlayerCard';
import { getRankFromPoints } from '../../utils/gameUtils';

const StatusPage = ({ player, stats }) => {
  const statList = [
    { key: 'intelligence', icon: 'intelligence', name: 'Intelligence' },
    { key: 'physique', icon: 'physique', name: 'Physique' },
    { key: 'perception', icon: 'perception', name: 'Perception' },
    { key: 'tech', icon: 'tech', name: 'Tech' },
    { key: 'finance', icon: 'finance', name: 'Finance' },
    { key: 'discipline', icon: 'discipline', name: 'Discipline' },
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
      <div className="status-grid">
        {statList.map((stat, idx) => (
          <StatCard
            key={stat.key}
            icon={stat.icon}
            name={stat.name}
            points={stats[stat.key]}
            rank={getRankFromPoints(stats[stat.key])}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default StatusPage;
