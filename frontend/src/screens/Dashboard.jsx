import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Activity, ShieldAlert } from 'lucide-react';
import PlayerCard from './components/RPGSystem/PlayerCard';
import StatCard from './components/RPGSystem/StatCard';
import QuestCard from './components/RPGSystem/QuestCard';
import './Dashboard.css';

const Dashboard = ({ player, quests, onComplete }) => {
  if (!player) return null;

  const battleStats = [
    { key: 'physique', name: 'Physique', points: player.strength || 10, rank: player.rank || 'E' },
    { key: 'perception', name: 'Perception', points: player.agility || 10, rank: player.rank || 'E' },
    { key: 'intelligence', name: 'Intelligence', points: player.intelligence || 10, rank: player.rank || 'E' },
    { key: 'tech', name: 'Tech', points: player.vitality || 10, rank: player.rank || 'E' }
  ];

  return (
    <div className="dashboard-container">
      <div className="sl-scanlines" />
      <div className="dashboard-bg-overlay" />
      
      <div className="dashboard-content system-container">
        
        {/* ========== HUD HEADER ========== */}
        <header className="dashboard-hud-header">
          <div className="header-readout sl-terminal-text">
            <span>LOCATION: SOUTH_KOREA_SEOUL</span>
            <span>STATUS: [ONLINE]</span>
            <span>TIME: {new Date().toLocaleTimeString()}</span>
          </div>
          <div className="header-main-title sl-terminal-text">
            HUNTER_MANAGEMENT_SYSTEM v4.5
          </div>
        </header>

        <div className="dashboard-main-grid">
          {/* ========== LEFT PANEL: PROFILE ========== */}
          <div className="dashboard-left-column">
            <section className="dashboard-hero-hud">
              <div className="sl-frame-corner sl-corner-tl" />
              <div className="sl-frame-corner sl-corner-tr" />
              <PlayerCard player={player} />
            </section>

            {/* SYSTEM LOG TERMINAL */}
            <section className="sl-card-angled dashboard-terminal-hud">
              <div className="terminal-header-hud sl-terminal-text">
                <Terminal size={14} /> <span>SYSTEM_LOG</span>
              </div>
              <div className="terminal-body-hud sl-terminal-text">
                <p className="typing-text">&gt; LOG: RECENT_QUEST_SYNCHRONIZATION_SUCCESSFUL</p>
                <p className="typing-text">&gt; LOG: STREAK_MAINTAINED_AT_{player.streak}_DAYS</p>
                <p className="typing-text">&gt; LOG: STATUS_STABLE_WAITING_FOR_USER_INPUT...</p>
              </div>
              <div className="terminal-cursor" />
            </section>
          </div>

          {/* ========== RIGHT PANEL: PERFORMANCE & QUESTS ========== */}
          <div className="dashboard-right-column">
            <section className="dashboard-section-hud">
              <div className="section-header-hud sl-terminal-text">
                <Activity size={16} className="accent" /> <span>PERFORMANCE_READOUT</span>
              </div>
              <div className="status-grid-hud">
                {battleStats.map((stat) => (
                  <StatCard
                    key={stat.key}
                    icon={stat.key}
                    name={stat.name}
                    points={stat.points}
                    rank={stat.rank}
                  />
                ))}
              </div>
            </section>

            <section className="dashboard-section-hud">
              <div className="section-header-hud sl-terminal-text">
                <ShieldAlert size={16} className="accent" /> <span>ACTIVE_QUEST_PROTOCOLS</span>
              </div>
              <div className="quests-grid-summary-hud">
                {quests.slice(0, 4).map((quest) => (
                  <QuestCard
                    key={quest.id}
                    quest={quest}
                    completed={false}
                    onComplete={() => onComplete(quest.id)}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
