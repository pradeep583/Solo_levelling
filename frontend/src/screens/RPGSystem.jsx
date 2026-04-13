import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StatusPage from './pages/StatusPage';
import QuestsPage from './pages/QuestsPage';
import AchievementsPage from './pages/AchievementsPage';
import SystemPage from './pages/SystemPage';
import LevelUpModal from './components/RPGSystem/LevelUpModal';
import AchievementUnlockModal from './components/RPGSystem/AchievementUnlockModal';
import EnhancedPenaltyAlert from './components/RPGSystem/EnhancedPenaltyAlert';
import Toast from '../components/Toast';
import {
  initializeStorage,
  getPlayer,
  setPlayer,
  getStats,
  setStats,
  getTodayQuests,
  setTodayQuests,
  getAchievements,
  setAchievements,
  getLastDate,
  setLastDate,
} from '../utils/storageManager';
import { calculatePenalties, checkLevelUp, getTitleByLevel } from '../utils/gameUtils';
import { ACHIEVEMENTS } from '../utils/questData';
import './RPGSystem.css';

const RPGSystem = () => {
  const [currentPage, setCurrentPage] = useState('status');
  const [player, setPlayerState] = useState(getPlayer());
  const [stats, setStatsState] = useState(getStats());
  const [todayQuests, setTodayQuestsState] = useState(getTodayQuests());
  const [achievements, setAchievementsState] = useState(getAchievements());
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [newLevel, setNewLevel] = useState(null);
  const [toast, setToast] = useState(null);
  const [penalties, setPenalties] = useState([]);
  const [showAchievementUnlock, setShowAchievementUnlock] = useState(false);
  const [unlockedAchievement, setUnlockedAchievement] = useState(null);

  // Initialize on mount
  useEffect(() => {
    initializeStorage();
    checkPenalties();
  }, []);

  // Check for penalties from previous day
  const checkPenalties = () => {
    const lastDate = getLastDate();
    const currentStats = getStats();
    const pastQuests = lastDate
      ? JSON.parse(localStorage.getItem(`sl_quests_${lastDate}`) || 'null')
      : null;

    if (pastQuests) {
      const { penalties: calcPenalties, newStats } = calculatePenalties(
        lastDate,
        pastQuests,
        currentStats
      );

      if (calcPenalties.length > 0) {
        setPenalties(calcPenalties);
        setStatsState(newStats);
        setStats(newStats);

        // Update streak
        const completedCount = Object.values(pastQuests).filter(Boolean).length;
        const currentPlayer = getPlayer();
        if (completedCount < 7) {
          currentPlayer.streak = 0;
          setPlayer(currentPlayer);
          setPlayerState(currentPlayer);
        }
      }
    }

    setLastDate(new Date().toISOString().split('T')[0]);
  };

  // Sync player to storage
  useEffect(() => {
    setPlayer(player);
  }, [player]);

  // Sync stats to storage
  useEffect(() => {
    setStats(stats);
  }, [stats]);

  // Sync today's quests to storage
  useEffect(() => {
    setTodayQuests(todayQuests);
  }, [todayQuests]);

  // Sync achievements to storage
  useEffect(() => {
    setAchievements(achievements);
  }, [achievements]);

  // Handle quest completion
  const completeQuest = (questId, questData) => {
    // Mark quest as completed
    const updatedQuests = { ...todayQuests, [questId]: true };
    setTodayQuestsState(updatedQuests);

    // Add XP
    const updatedPlayer = { ...player, totalXP: player.totalXP + questData.xp };

    // Add stat points
    const updatedStats = { ...stats };
    if (questData.stats) {
      Object.entries(questData.stats).forEach(([stat, points]) => {
        updatedStats[stat] = Math.min(100, updatedStats[stat] + points);
      });
    } else if (questData.stat && questData.increment) {
      updatedStats[questData.stat] = Math.min(100, updatedStats[questData.stat] + questData.increment);
    }

    setStatsState(updatedStats);

    // Check if first quest (First Blood achievement)
    if (Object.values(todayQuests).every(v => !v)) {
      unlockAchievement('first_blood');
    }

    // Check if all quests completed (Iron Will)
    if (Object.values(updatedQuests).filter(Boolean).length === 10) {
      unlockAchievement('iron_will');
    }

    // Check for S rank (Monarch)
    Object.values(updatedStats).forEach(statPoints => {
      if (statPoints >= 90) {
        unlockAchievement('monarch');
      }
    });

    // Show toast
    showToast(`${questData.name} COMPLETE — +${questData.xp} XP`);

    // Check for level up
    if (checkLevelUp(updatedPlayer.totalXP, updatedPlayer.level)) {
      const newLvl = updatedPlayer.level + 1;
      updatedPlayer.level = newLvl;
      updatedPlayer.title = getTitleByLevel(newLvl);
      setNewLevel(newLvl);
      setShowLevelUpModal(true);
    }

    setPlayerState(updatedPlayer);
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  };

  const unlockAchievement = (achievementId) => {
    const achievement = ACHIEVEMENTS[achievementId];
    if (achievement && !achievements[achievementId]) {
      setUnlockedAchievement(achievement);
      setShowAchievementUnlock(true);
      const updatedAchievements = { ...achievements, [achievementId]: true };
      setAchievementsState(updatedAchievements);
    }
  };

  const closeAchievementModal = () => {
    setShowAchievementUnlock(false);
    setUnlockedAchievement(null);
  };

  const closeModal = () => {
    setShowLevelUpModal(false);
    setNewLevel(null);
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <div className="app-title">⚔️ RPG SYSTEM</div>
      </div>

      <div className="app-content">
        {/* Penalties alert (enhanced) */}
        <EnhancedPenaltyAlert penalties={penalties} />

        {/* Page content */}
        <AnimatePresence mode="wait">
          {currentPage === 'status' && <StatusPage key="status" player={player} stats={stats} />}
          {currentPage === 'quests' && (
            <QuestsPage
              key="quests"
              todayQuests={todayQuests}
              onCompleteQuest={completeQuest}
            />
          )}
          {currentPage === 'achievements' && (
            <AchievementsPage key="achievements" achievements={achievements} />
          )}
          {currentPage === 'system' && (
            <SystemPage
              key="system"
              player={player}
              onResetQuests={() => {
                // Reset today's quests and update streaks
                const completedCount = Object.values(todayQuests).filter(Boolean).length;
                if (completedCount >= 7) {
                  const updatedPlayer = { ...player, streak: (player.streak || 0) + 1 };
                  setPlayerState(updatedPlayer);

                  // Check 7-day warrior
                  if (updatedPlayer.streak >= 7) {
                    unlockAchievement('7_day_warrior');
                  }
                }

                // Reset quests
                setTodayQuestsState(getTodayQuests());
                showToast('Today\'s quests have been reset!');
              }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Bottom navigation */}
      <div className="bottom-nav">
        <button
          className={`nav-btn ${currentPage === 'status' ? 'active' : ''}`}
          onClick={() => setCurrentPage('status')}
        >
          <span className="nav-icon">⚔️</span>
          <span>STATUS</span>
        </button>
        <button
          className={`nav-btn ${currentPage === 'quests' ? 'active' : ''}`}
          onClick={() => setCurrentPage('quests')}
        >
          <span className="nav-icon">📋</span>
          <span>QUESTS</span>
        </button>
        <button
          className={`nav-btn ${currentPage === 'achievements' ? 'active' : ''}`}
          onClick={() => setCurrentPage('achievements')}
        >
          <span className="nav-icon">🏆</span>
          <span>ACHIEVEMENTS</span>
        </button>
        <button
          className={`nav-btn ${currentPage === 'system' ? 'active' : ''}`}
          onClick={() => setCurrentPage('system')}
        >
          <span className="nav-icon">⚙️</span>
          <span>SYSTEM</span>
        </button>
      </div>

      {/* Level up modal */}
      {showLevelUpModal && newLevel && (
        <LevelUpModal level={newLevel} onClose={closeModal} />
      )}

      {/* Toast */}
      {toast && <Toast message={toast} />}
    </div>
  );
};

export default RPGSystem;
