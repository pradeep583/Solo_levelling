import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, ShieldCheck, Award } from 'lucide-react';
import './AchievementUnlockModal.css';

const AchievementUnlockModal = ({ achievement, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <motion.div
      className="achievement-unlock-overlay-hud"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="sl-scanlines" />
      
      {/* Background glow based on rarity */}
      <motion.div
        className={`achievement-unlock-glow ${achievement.rarity.toLowerCase()}-glow`}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <motion.div
        className={`sl-card-angled achievement-unlock-content-hud ${achievement.rarity.toLowerCase()}-frame`}
        initial={{ scale: 0.5, opacity: 0, rotateY: 90 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        transition={{ type: 'spring', damping: 15, stiffness: 100 }}
      >
        {/* Frame Corners */}
        <div className="sl-frame-corner sl-corner-tl" />
        <div className="sl-frame-corner sl-corner-tr" />
        <div className="sl-frame-corner sl-corner-bl" />
        <div className="sl-frame-corner sl-corner-br" />

        <div className="achievement-inner-hud">
          <div className="achievement-readout-hud sl-terminal-text">
            <span>[ SYSTEM_ACHIEVEMENT ]</span>
            <span>ID: {achievement.id.toString().padStart(4, '0')}</span>
          </div>

          <div className="achievement-icon-wrapper-hud">
            <motion.div
              className="achievement-icon-pulse-hud"
              animate={{ boxShadow: ['0 0 20px rgba(0,0,0,0)', '0 0 50px currentColor', '0 0 20px rgba(0,0,0,0)'] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {achievement.rarity === 'Legendary' ? <Trophy size={60} /> : <Award size={60} />}
            </motion.div>
          </div>

          <motion.div 
            className="achievement-status-tag-hud sl-terminal-text"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {achievement.rarity.toUpperCase()}_RECOGNITION_VALIDATED
          </motion.div>

          <motion.h2 
            className="achievement-name-hud"
            initial={{ opacity: 0, letterSpacing: '10px' }}
            animate={{ opacity: 1, letterSpacing: '2px' }}
            transition={{ delay: 0.6 }}
          >
            {achievement.name.toUpperCase()}
          </motion.h2>

          <motion.p 
            className="achievement-desc-hud sl-terminal-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {achievement.description.toUpperCase()}
          </motion.p>

          <div className="achievement-footer-hud sl-terminal-text">
            [ ID: QUEST_VALIDATION_COMPLETED ]
          </div>
        </div>
      </motion.div>

      <motion.div
        className="achievement-continue-hint sl-terminal-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.8, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 2 }}
      >
        TOUCH_ANYWHERE_TO_SYNCHRONIZE
      </motion.div>
    </motion.div>
  );
};

export default AchievementUnlockModal;
