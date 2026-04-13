import React from 'react';
import { motion } from 'framer-motion';
import { getTitleByLevel } from '../../../utils/gameUtils';
import './LevelUpModal.css';

const LevelUpModal = ({ level, onClose }) => {
  const title = getTitleByLevel(level);

  return (
    <motion.div
      className="levelup-modal-overlay"
      initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
      animate={{ opacity: 1, backdropFilter: 'blur(10px)' }}
      exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
      onClick={onClose}
    >
      {/* Background glow */}
      <motion.div
        className="levelup-glow"
        animate={{
          boxShadow: [
            '0 0 50px rgba(139, 195, 74, 0.1)',
            '0 0 150px rgba(139, 195, 74, 0.3)',
            '0 0 50px rgba(139, 195, 74, 0.1)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Main modal */}
      <motion.div
        className="levelup-modal-content"
        initial={{ scale: 0.5, opacity: 0, rotateY: 90 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        exit={{ scale: 0.5, opacity: 0, rotateY: 90 }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ornate corners */}
        <div className="levelup-corner levelup-corner-tl" />
        <div className="levelup-corner levelup-corner-tr" />
        <div className="levelup-corner levelup-corner-bl" />
        <div className="levelup-corner levelup-corner-br" />

        {/* Content */}
        <div className="levelup-inner">
          {/* Header */}
          <motion.div
            className="levelup-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            ⭐ LEVEL UP! ⭐
          </motion.div>

          {/* Level number */}
          <motion.div
            className="levelup-level"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, type: 'spring' }}
          >
            {level}
          </motion.div>

          {/* Subtitle */}
          <motion.div
            className="levelup-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            New Rank Unlocked
          </motion.div>

          {/* Title */}
          <motion.div
            className="levelup-title"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            {title}
          </motion.div>

          {/* Divider */}
          <motion.div
            className="levelup-divider"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1 }}
          />

          {/* Stats boost info */}
          <motion.div
            className="levelup-stats-boost"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            ✨ ALL STATS +5 ✨
          </motion.div>

          {/* Button */}
          <motion.button
            className="levelup-btn"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            CONTINUE →
          </motion.button>

          {/* Particle effects */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="levelup-particle"
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{
                x: (Math.random() - 0.5) * 250,
                y: (Math.random() - 0.5) * 250,
                opacity: 0,
              }}
              transition={{ duration: 2.5, delay: 0.3 + i * 0.1 }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LevelUpModal;
