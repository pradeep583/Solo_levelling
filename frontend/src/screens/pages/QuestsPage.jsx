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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="quests-page-wrapper"
    >
      {/* Header with progress */}
      <div className="quests-header">
        <div className="quests-title">DAILY QUESTS</div>
        <div className="quests-progress">
          <span className="progress-number">{completedCount}/10</span>
          <div className="progress-bar-mini">
            <div
              className="progress-fill-mini"
              style={{ width: `${(completedCount / 10) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Quest list */}
      <div className="quests-list">
        {questList.map((quest, idx) => (
          <motion.div
            key={quest.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.03 }}
            onClick={() => handleQuestClick(quest, quest.id)}
            style={{ cursor: 'pointer' }}
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
