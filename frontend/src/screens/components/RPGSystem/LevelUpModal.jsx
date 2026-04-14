import React from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, TrendingUp } from 'lucide-react';
import { getTitleByLevel } from '../../../utils/gameUtils';
import './LevelUpModal.css';

const LevelUpModal = ({ level, onClose }) => {
  const title = getTitleByLevel(level);

  return (
    <motion.div
      className="levelup-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="sl-scanlines" />
      
      {/* Cinematic Flash */}
      <motion.div 
        className="levelup-flash"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1, times: [0, 0.2, 1] }}
      />

      <motion.div
        className="sl-card-angled levelup-modal-content-enhanced"
        initial={{ scale: 0.8, opacity: 0, rotateY: 30 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        exit={{ scale: 0.8, opacity: 0, rotateY: -30 }}
        transition={{ type: 'spring', damping: 15, stiffness: 150 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Frame Corners */}
        <div className="sl-frame-corner sl-corner-tl" />
        <div className="sl-frame-corner sl-corner-tr" />
        <div className="sl-frame-corner sl-corner-bl" />
        <div className="sl-frame-corner sl-corner-br" />

        <div className="levelup-inner-hud">
          {/* Technical Readout Top */}
          <div className="levelup-readout-top sl-terminal-text">
            <span>[ SYSTEM_NOTICE ]</span>
            <span>ID: LVL_UP_V4.0</span>
          </div>

          <motion.div
            className="levelup-header-main"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            LEVEL_ASCENSION_PROTOCOL
          </motion.div>

          <div className="levelup-visual-center">
            <motion.div
              className="levelup-icon-pulse"
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronUp size={80} strokeWidth={3} color="var(--sl-gold)" />
            </motion.div>
            
            <motion.div
              className="levelup-number-huge"
              initial={{ opacity: 0, filter: 'blur(20px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {level}
            </motion.div>
          </div>

          <motion.div
            className="levelup-rank-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <span className="sl-terminal-text">RANK_CREDENTIAL:</span>
            <div className="rank-name-gold">{title}</div>
          </motion.div>

          <div className="levelup-status-strip">
            <div className="sl-terminal-text">[ STATUS: VALIDATED ]</div>
          </div>

          <div className="levelup-reward-box">
            <TrendingUp size={16} />
            <span className="sl-terminal-text">GLOBAL_STAT_UPPER_LIMIT_EXTENDED</span>
          </div>

          <motion.button
            className="sl-button levelup-continue-btn"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            onClick={onClose}
            whileHover={{ letterSpacing: '4px', backgroundColor: 'var(--sl-gold)', color: '#000' }}
          >
            CONTINUE_SYSTEM_OPERATIONS
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LevelUpModal;
