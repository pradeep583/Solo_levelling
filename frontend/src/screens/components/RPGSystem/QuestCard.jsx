import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, Eye, Video, BookOpen, Dumbbell, 
  Code, Cpu, Grid, TrendingUp, Map, CheckCircle 
} from 'lucide-react';
import './QuestCard.css';

const QuestCard = ({ quest, completed, onComplete }) => {
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
  const questRank = quest.rank || 'E';

  return (
    <motion.div
      className={`sl-card-angled quest-card-enhanced rank-${questRank.toLowerCase()} ${completed ? 'quest-completed' : ''}`}
      whileHover={{ y: -2, borderColor: 'var(--cyan)' }}
      whileTap={{ scale: 0.98 }}
      onClick={onComplete}
    >
      <div className="sl-hud-corners" />
      
      {/* HUD Scanner Line */}
      {!completed && <div className="quest-hud-scanner" />}

      <div className="quest-card-main">
        <div className="quest-card-left">
          <div className="quest-icon-wrapper">
            <Icon className="quest-lucide-icon" />
          </div>
          <div className="quest-card-info">
            <div className="quest-id-label sl-terminal-text">#TQ-{quest.id.toString().padStart(3, '0')}</div>
            <div className="quest-card-name">{quest.name}</div>
            <div className="quest-card-xp-badge">REWARD: +{quest.xp} XP</div>
          </div>
        </div>

        <div className="quest-card-right">
          <div className={`quest-rank-badge rank-${questRank.toLowerCase()}`}>{questRank}-RANK</div>
          <motion.div
            className={`quest-status-indicator ${completed ? 'status-cleared' : 'status-active'}`}
            animate={completed ? { scale: [1, 1.1, 1] } : {}}
          >
            {completed ? 'CLEARED' : 'ACTIVE'}
          </motion.div>
        </div>
      </div>

      {completed && (
        <motion.div
          className="quest-check-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <CheckCircle className="check-icon" />
        </motion.div>
      )}
    </motion.div>
  );
};

export default QuestCard;
