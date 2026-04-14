import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Target, Activity } from 'lucide-react';
import './DailyLoginOverlay.css';

const DailyLoginOverlay = ({ player, onComplete }) => {
  const [stage, setStage] = useState('boot-sequence');
  
  useEffect(() => {
    // Stage sequence
    const timers = [
      setTimeout(() => setStage('identity-verification'), 1200),
      setTimeout(() => setStage('stability-check'), 2800),
      setTimeout(() => setStage('ready'), 4500),
    ];
    
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  if (stage === 'finish') {
    return null;
  }

  return (
    <motion.div 
      className="daily-login-overlay-enhanced"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="sl-scanlines" />
      
      <div className="login-hud-corners">
        <div className="sl-frame-corner sl-corner-tl" />
        <div className="sl-frame-corner sl-corner-tr" />
        <div className="sl-frame-corner sl-corner-bl" />
        <div className="sl-frame-corner sl-corner-br" />
      </div>

      <div className="daily-login-content-hud">
        <AnimatePresence mode="wait">
          {stage === 'boot-sequence' && (
            <motion.div 
              key="boot"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -50 }}
              className="login-phase-container"
            >
              <div className="boot-terminal-text sl-terminal-text">
                <p>&gt; INITIALIZING_SYSTEM_KERNEL...</p>
                <p>&gt; LOADING_HUNTER_DATABASE [OK]</p>
                <p>&gt; SYNCHRONIZING_STAT_ARRAYS...</p>
              </div>
              <div className="boot-loading-bar">
                <motion.div 
                  className="boot-loading-fill"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1 }}
                />
              </div>
            </motion.div>
          )}

          {stage === 'identity-verification' && (
            <motion.div 
              key="identity"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="login-phase-container center"
            >
              <div className="id-rank-hex sl-terminal-text">{player.rank}-RANK</div>
              <motion.h1 
                className="login-player-name-hud"
                initial={{ letterSpacing: '20px', opacity: 0 }}
                animate={{ letterSpacing: '4px', opacity: 1 }}
              >
                {player.name.toUpperCase()}
              </motion.h1>
              <div className="login-status-tag sl-terminal-text">IDENTITY_VERIFIED // HUNTER_V1.0</div>
            </motion.div>
          )}

          {stage === 'stability-check' && (
            <motion.div 
              key="stability"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="login-phase-container"
            >
              <div className="stability-header-hud sl-terminal-text">CURRENT_SYSTEM_STABILITY:</div>
              <div className="streak-stats-row">
                <div className="streak-stat-box">
                  <Zap size={24} color="var(--sl-gold)" />
                  <div className="streak-value-hud">{player.streak}</div>
                  <div className="sl-terminal-text streak-unit">DAYS</div>
                </div>
                <div className="streak-desc-hud sl-terminal-text">
                  CONTINUOUS_CONNECTION_RECOGNIZED
                </div>
              </div>

              <motion.button 
                className="sl-button login-continue-btn-hud"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => onComplete()}
              >
                ENTER_THE_SYSTEM
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative center grid */}
      <div className="login-center-grid" />
    </motion.div>
  );
};

export default DailyLoginOverlay;
