import React, { useState } from 'react';
import { motion } from 'framer-motion';
import QuestCard from '../components/RPGSystem/QuestCard';
import QuestDetailModal from '../components/RPGSystem/QuestDetailModal';
import { QUESTS } from '../../utils/questData';
import './QuestsPage.css';

const QuestsPage = ({ todayQuests, onCompleteQuest }) => {
  const questList = Object.values(QUESTS);
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [selectedQuestId, setSelectedQuestId] = useState(null);

  const handleQuestClick = (quest, questId) => {
    setSelectedQuest(quest);
    setSelectedQuestId(questId);
  };

  const handleCompleteQuest = () => {
    if (selectedQuestId && selectedQuest) {
      onCompleteQuest(selectedQuestId, selectedQuest);
      setSelectedQuest(null);
      setSelectedQuestId(null);
    }
  };

  const completedCount = Object.values(todayQuests).filter(Boolean).length;
  const completionRate = (completedCount / 10 * 100).toFixed(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="quests-page-wrapper"
    >
      {/* Header with progress */}
      <div className="sl-card-angled quests-header-hud">
        <div className="sl-hud-corners" />
        <div className="quests-hud-meta sl-terminal-text">[ PROTOCOL_STATUS: ACTIVE ]</div>
        
        <div className="quests-progress-hud">
          <div className="progress-info-row">
            <span className="sl-terminal-text">COMPLETION_RATE</span>
            <span className="percentage-reading sl-terminal-text">{completionRate}%</span>
          </div>
          
          <div className="hud-progress-gauge">
            <motion.div
              className="hud-gauge-fill"
              initial={{ width: 0 }}
              animate={{ width: `${completionRate}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
          
          <div className="quests-count-hud sl-terminal-text">
            <span>UNITS_CLEARED: {completedCount} / 10</span>
          </div>
        </div>
      </div>

      {/* Quest list */}
      <div className="quests-flex-container">
        {questList.map((quest, idx) => (
          <motion.div
            key={quest.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.03 }}
            onClick={() => handleQuestClick(quest, quest.id)}
            className="quest-item-clickable"
          >
            <QuestCard
              quest={quest}
              completed={todayQuests[quest.id]}
              onComplete={() => handleQuestClick(quest, quest.id)}
            />
          </motion.div>
        ))}
      </div>

      {/* Quest detail modal */}
      <QuestDetailModal
        quest={selectedQuest}
        isOpen={!!selectedQuest}
        onClose={() => {
          setSelectedQuest(null);
          setSelectedQuestId(null);
        }}
        onComplete={handleCompleteQuest}
        completed={selectedQuestId ? todayQuests[selectedQuestId] : false}
      />
    </motion.div>
  );
};

export default QuestsPage;
