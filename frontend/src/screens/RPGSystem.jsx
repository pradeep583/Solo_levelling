import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, ListChecks, Trophy, Terminal, Info 
} from 'lucide-react';
import StatusPage from './pages/StatusPage';
import QuestsPage from './pages/QuestsPage';
import AchievementsPage from './pages/AchievementsPage';
import SystemPage from './pages/SystemPage';
import LevelUpModal from './components/RPGSystem/LevelUpModal';
import AchievementUnlockModal from './components/RPGSystem/AchievementUnlockModal';
import EnhancedPenaltyAlert from './components/RPGSystem/EnhancedPenaltyAlert';
import DailyLoginOverlay from './components/RPGSystem/DailyLoginOverlay';
import StatNotification from './components/RPGSystem/StatNotification';
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
  const [showLoginOverlay, setShowLoginOverlay] = useState(true);
  const [activeStatNotifications, setActiveStatNotifications] = useState([]);

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
    const updatedQuests = { ...todayQuests, [questId]: true };
    setTodayQuestsState(updatedQuests);

    const updatedPlayer = { ...player, totalXP: player.totalXP + questData.xp };
    const updatedStats = { ...stats };
    const newNotifications = [];

    if (questData.stats) {
      Object.entries(questData.stats).forEach(([stat, points]) => {
        updatedStats[stat] = Math.min(100, updatedStats[stat] + points);
        newNotifications.push({ stat, amount: points });
      });
    } else if (questData.stat && questData.increment) {
      updatedStats[questData.stat] = Math.min(100, updatedStats[questData.stat] + questData.increment);
      newNotifications.push({ stat: questData.stat, amount: questData.increment });
    }

    setStatsState(updatedStats);
    if (newNotifications.length > 0) {
      setActiveStatNotifications(prev => [...prev, ...newNotifications]);
    }

    if (Object.values(todayQuests).every(v => !v)) {
      unlockAchievement('first_blood');
    }

    if (Object.values(updatedQuests).filter(Boolean).length === 10) {
      unlockAchievement('iron_will');
    }

    Object.values(updatedStats).forEach(statPoints => {
      if (statPoints >= 90) {
        unlockAchievement('monarch');
      }
    });

    showToast(`QUEST_PROTOCOL_COMPLETE: +${questData.xp} XP`);

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
    <div className="app-main system-hud-theme">
      {/* Global Immersion Layers */}
      <div className="sl-scanlines" />
      <div className="sl-hud-corners" />

      <AnimatePresence>
        {showLoginOverlay && (
          <DailyLoginOverlay 
            player={player} 
            onComplete={() => setShowLoginOverlay(false)} 
          />
        )}
      </AnimatePresence>

      <div className="hud-system-header sl-terminal-text">
        <div className="header-glitch-title" data-text="SYSTEM_INTERFACE">SYSTEM_INTERFACE</div>
        <div className="header-status-dot" />
        <div className="header-readout">[ LOCATION: SEOUL_HQ // ID: HUNTER_LEVEL_{player.level} ]</div>
      </div>

      <div className="app-content">
        <EnhancedPenaltyAlert penalties={penalties} />

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
                const completedCount = Object.values(todayQuests).filter(Boolean).length;
                if (completedCount >= 7) {
                  const updatedPlayer = { ...player, streak: (player.streak || 0) + 1 };
                  setPlayerState(updatedPlayer);
                  if (updatedPlayer.streak >= 7) {
                    unlockAchievement('7_day_warrior');
                  }
                }
                setTodayQuestsState(getTodayQuests());
                showToast('REABLING_PROTOCOLS: Today\'s quests reset');
              }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Technical Bottom Navigation */}
      <div className="sl-bottom-hud">
        <button
          className={`hud-nav-btn ${currentPage === 'status' ? 'active' : ''}`}
          onClick={() => setCurrentPage('status')}
        >
          <Shield className="nav-hud-icon" />
          <span className="sl-terminal-text">STATUS</span>
        </button>
        <button
          className={`hud-nav-btn ${currentPage === 'quests' ? 'active' : ''}`}
          onClick={() => setCurrentPage('quests')}
        >
          <ListChecks className="nav-hud-icon" />
          <span className="sl-terminal-text">QUESTS</span>
        </button>
        <button
          className={`hud-nav-btn ${currentPage === 'achievements' ? 'active' : ''}`}
          onClick={() => setCurrentPage('achievements')}
        >
          <Trophy className="nav-hud-icon" />
          <span className="sl-terminal-text">RANK</span>
        </button>
        <button
          className={`hud-nav-btn ${currentPage === 'system' ? 'active' : ''}`}
          onClick={() => setCurrentPage('system')}
        >
          <Terminal className="nav-hud-icon" />
          <span className="sl-terminal-text">SYS</span>
        </button>
      </div>

      {/* Overlays */}
      {showLevelUpModal && newLevel && (
        <LevelUpModal level={newLevel} onClose={closeModal} />
      )}
      
      {showAchievementUnlock && unlockedAchievement && (
        <AchievementUnlockModal 
          achievement={unlockedAchievement} 
          onClose={closeAchievementModal} 
        />
      )}

      {toast && <Toast message={toast} />}

      <div className="stat-notifications-container">
        <AnimatePresence>
          {activeStatNotifications.map((notif, index) => (
            <StatNotification
              key={`stat-notif-${index}`}
              stat={notif.stat}
              amount={notif.amount}
              onComplete={() => {
                setActiveStatNotifications(prev => prev.filter((_, i) => i !== index));
              }}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RPGSystem;
