import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import './AchievementUnlockModal.css';

const AchievementUnlockModal = ({ achievement, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <motion.div
      className="achievement-unlock-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Background glow */}
      <motion.div
        className="achievement-bg-glow"
        animate={{
          boxShadow: [
            '0 0 50px rgba(212, 175, 55, 0.1)',
            '0 0 100px rgba(212, 175, 55, 0.3)',
            '0 0 50px rgba(212, 175, 55, 0.1)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Center content */}
      <motion.div
        className="achievement-unlock-content"
        initial={{ scale: 0, opacity: 0, rotateZ: -10 }}
        animate={{ scale: 1, opacity: 1, rotateZ: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      >
        {/* Ornate frame */}
        <div className="achievement-frame-top" />
        <div className="achievement-frame-bottom" />

        {/* Icon */}
        <motion.div
          className="achievement-icon-unlock"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {achievement.icon}
        </motion.div>

        {/* UNLOCKED text */}
        <motion.div
          className="achievement-status"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          ⭐ ACHIEVEMENT UNLOCKED ⭐
        </motion.div>

        {/* Name */}
        <motion.div
          className="achievement-name-unlock"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {achievement.name}
        </motion.div>

        {/* Description */}
        <motion.div
          className="achievement-desc-unlock"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          {achievement.description}
        </motion.div>

        {/* Particle effects */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="achievement-particle"
            initial={{
              x: 0,
              y: 0,
              opacity: 1,
            }}
            animate={{
              x: (Math.random() - 0.5) * 200,
              y: (Math.random() - 0.5) * 200,
              opacity: 0,
            }}
            transition={{ duration: 2, delay: 0.2 + i * 0.1 }}
          />
        ))}
      </motion.div>

      {/* Click hint */}
      <motion.div
        className="achievement-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 3, delay: 1 }}
      >
        Click to continue
      </motion.div>
    </motion.div>
  );
};

export default AchievementUnlockModal;
