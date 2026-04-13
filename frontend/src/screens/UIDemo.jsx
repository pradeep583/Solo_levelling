import React, { useState } from 'react';
import SystemNotification from '../components/SystemNotification';
import QuestPanelInfo from '../components/QuestPanelInfo';
import StatusPanel from '../components/StatusPanel';

/**
 * SOLO LEVELING UI COMPONENTS DEMO
 * 
 * This file demonstrates how to use the three main UI components
 * to create an authentic Solo Leveling notification system.
 */

const UIDemo = () => {
  const [showSystemNotification, setShowSystemNotification] = useState(false);
  const [showQuestPanel, setShowQuestPanel] = useState(false);
  const [showStatusPanel, setShowStatusPanel] = useState(false);

  // Example player data
  const demoPlayer = {
    name: 'Sung Jinwoo',
    rank: 'E',
    level_in_rank: 24,
    total_xp: 4850,
    current_hp: 85,
    max_hp: 100,
    current_mp: 62,
    max_mp: 65,
    strength: 18,
    agility: 12,
    vitality: 15,
    intelligence: 22,
    sense: 14,
    total_quests_completed: 47,
    streak_days: 5,
  };

  // Example quest data
  const demoQuest = {
    name: 'Goblin Dungeon',
    description: 'Clear the Dumpy Goblin Dungeon',
    goal: 'Defeat all Goblin spawns in the dungeon (8/8)',
    rewards: [
      { label: 'EXP', value: 2500 },
      { label: 'Gold', value: 15000 },
      { label: 'Items', value: 3 },
    ],
    stats: [
      { name: 'STR', current: 18, boost: 2 },
      { name: 'AGI', current: 12, boost: 1 },
      { name: 'VIT', current: 15, boost: 2 },
      { name: 'INT', current: 22, boost: 3 },
    ],
  };

  return (
    <div style={{ padding: '40px', backgroundColor: '#000', minHeight: '100vh', color: '#fff' }}>
      <h1 style={{ marginBottom: '40px', color: '#00d4ff' }}>Solo Leveling UI Components</h1>

      {/* Buttons to trigger components */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '60px' }}>
        <button
          onClick={() => setShowSystemNotification(true)}
          style={{
            padding: '12px 24px',
            backgroundColor: 'rgba(0, 212, 255, 0.1)',
            border: '2px solid rgba(0, 212, 255, 0.6)',
            color: '#00d4ff',
            cursor: 'pointer',
            fontWeight: 'bold',
            borderRadius: '4px',
          }}
        >
          System Notification
        </button>

        <button
          onClick={() => setShowQuestPanel(true)}
          style={{
            padding: '12px 24px',
            backgroundColor: 'rgba(30, 144, 255, 0.1)',
            border: '2px solid rgba(30, 144, 255, 0.6)',
            color: '#1e90ff',
            cursor: 'pointer',
            fontWeight: 'bold',
            borderRadius: '4px',
          }}
        >
          Quest Panel
        </button>

        <button
          onClick={() => setShowStatusPanel(true)}
          style={{
            padding: '12px 24px',
            backgroundColor: 'rgba(0, 212, 255, 0.1)',
            border: '2px solid rgba(0, 212, 255, 0.6)',
            color: '#00d4ff',
            cursor: 'pointer',
            fontWeight: 'bold',
            borderRadius: '4px',
          }}
        >
          Status Panel
        </button>
      </div>

      {/* Component documentation */}
      <div
        style={{
          backgroundColor: 'rgba(5, 20, 40, 0.8)',
          border: '1px solid rgba(0, 212, 255, 0.3)',
          padding: '24px',
          borderRadius: '8px',
          marginBottom: '40px',
        }}
      >
        <h2 style={{ color: '#00d4ff', marginBottom: '16px' }}>Usage Guide</h2>

        <div style={{ color: '#b0b8d0', lineHeight: '1.8', fontSize: '14px' }}>
          <h3 style={{ color: '#00ffff', marginTop: '16px' }}>1. SystemNotification</h3>
          <p>
            Display system-wide notifications with optional action buttons. Perfect for level-up alerts,
            quest completions, and important events.
          </p>

          <h3 style={{ color: '#00ffff', marginTop: '16px' }}>2. QuestPanelInfo</h3>
          <p>
            Show detailed quest information including goal, rewards, stat boosts, and countdown timer.
            Ideal for quest details and requirements.
          </p>

          <h3 style={{ color: '#00ffff', marginTop: '16px' }}>3. StatusPanel</h3>
          <p>
            Display player status information including rank, level, HP/MP, and attribute stats. Usually
            positioned in bottom-right corner.
          </p>
        </div>
      </div>

      {/* Import examples */}
      <div
        style={{
          backgroundColor: 'rgba(5, 20, 40, 0.8)',
          border: '1px solid rgba(0, 212, 255, 0.3)',
          padding: '24px',
          borderRadius: '8px',
          fontFamily: 'monospace',
          fontSize: '12px',
          color: '#00d4ff',
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
        }}
      >
        {`// Import components
import SystemNotification from './components/SystemNotification';
import QuestPanelInfo from './components/QuestPanelInfo';
import StatusPanel from './components/StatusPanel';

// Use in your component
<SystemNotification 
  title="QUEST COMPLETE" 
  message="You have successfully completed the Dungeon!"
  action={{ label: 'CONTINUE', onClick: handleContinue }}
  onClose={() => setShowNotification(false)}
/>

<QuestPanelInfo 
  quest={questData} 
  timeRemaining={3600}
  onClose={() => setShowQuest(false)}
/>

<StatusPanel 
  player={playerData} 
  onClose={() => setShowStatus(false)}
/>`}
      </div>

      {/* Render components */}
      {showSystemNotification && (
        <SystemNotification
          title="LEVEL UP!"
          message="You have reached Level 25! Your status has increased."
          action={{
            label: 'CLAIM REWARD',
            onClick: () => {
              alert('Reward claimed!');
              setShowSystemNotification(false);
            },
          }}
          onClose={() => setShowSystemNotification(false)}
        />
      )}

      {showQuestPanel && (
        <QuestPanelInfo
          quest={demoQuest}
          timeRemaining={26347}
          onClose={() => setShowQuestPanel(false)}
        />
      )}

      {showStatusPanel && <StatusPanel player={demoPlayer} onClose={() => setShowStatusPanel(false)} />}
    </div>
  );
};

export default UIDemo;
