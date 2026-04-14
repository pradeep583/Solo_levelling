import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, Eye, Video, BookOpen, Dumbbell, 
  Code, Cpu, Grid, TrendingUp, Map, AlertTriangle, X 
} from 'lucide-react';
import './QuestDetailModal.css';

const QuestDetailModal = ({ quest, isOpen, onClose, onComplete, completed }) => {
  if (!isOpen) return null;

  const IconMap = {
    posture: User,
    eye: Eye,
    video: Video,
    book: BookOpen,
    workout: Dumbbell,
    code: Code,
    tech: Cpu,
    strategy: Grid,
    finance: TrendingUp,
    travel: Map
  };

  const Icon = IconMap[quest.icon] || Grid;

  return (
    <motion.div
      className="quest-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="sl-card-angled quest-modal-content-enhanced"
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sl-hud-corners" />
        
        {/* HUD Scanner Line */}
        <div className="modal-hud-scan" />

        <div className="quest-modal-header-hud">
          <div className="header-left-hud">
            <span className="sl-terminal-text">[ QUEST_INFO ]</span>
          </div>
          <button className="hud-close-btn" onClick={onClose}><X /></button>
        </div>

        <div className="quest-modal-body-hud">
          <div className="quest-visual-header">
            <div className="quest-icon-main-wrapper">
              <Icon className="quest-lucide-large" />
              <div className="icon-ripple" />
            </div>
            <div className="quest-title-block">
              <div className="quest-id sl-terminal-text">PROTOCOL_ID: #TQ-{quest.id.toString().padStart(3, '0')}</div>
              <h2 className="quest-name-hud">{quest.name}</h2>
            </div>
          </div>

          <div className="quest-log-box sl-terminal-text">
            [ SYSTEM_LOG: Daily Quest "{quest.name}" has been initialized. Failure to comply will result in a penalty protocol. ]
          </div>

          <div className="quest-stats-hud-grid">
            <div className="hud-stat-box">
              <span className="stat-label-hud">GOAL_PROGRESS</span>
              <span className="stat-value-hud">{completed ? '[100/100] CLEARED' : '[0/100] ACTIVE'}</span>
            </div>
            <div className="hud-stat-box">
              <span className="stat-label-hud">XP_REWARD</span>
              <span className="stat-value-hud">+{quest.xp} XP</span>
            </div>
          </div>

          <div className="hud-warning-strip">
            <AlertTriangle className="warning-hud-icon" />
            <span className="sl-terminal-text">WARNING: DEBTORS WILL BE PUNISHED.</span>
          </div>
        </div>

        <div className="quest-modal-actions-hud">
          <motion.button
            className={`hud-btn-primary ${completed ? 'btn-disabled' : ''}`}
            onClick={onComplete}
            disabled={completed}
            whileHover={!completed ? { scale: 1.02, backgroundColor: 'var(--cyan)' } : {}}
            whileTap={{ scale: 0.98 }}
          >
            {completed ? '[ PROTOCOL_EXECUTED ]' : '[ EXECUTE_PROTOCOL ]'}
          </motion.button>
          <button className="hud-btn-secondary" onClick={onClose}>
            [ DISMISS ]
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default QuestDetailModal;
