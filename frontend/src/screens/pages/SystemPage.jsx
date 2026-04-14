import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, RefreshCw, Trash2, Info } from 'lucide-react';
import { clearAllData } from '../../utils/storageManager';

const SystemPage = ({ player, onResetQuests }) => {
  const handleResetData = () => {
    if (window.confirm('Are you SURE? This will clear ALL data permanently!')) {
      clearAllData();
      window.location.reload();
    }
  };

  const systemData = [
    { label: 'PLAYER_NAME', value: player.name },
    { label: 'CURRENT_LEVEL', value: player.level },
    { label: 'CLASS_TITLE', value: player.title },
    { label: 'TOTAL_EXPERIENCE', value: `${player.totalXP} XP` },
    { label: 'STREAK_STABILITY', value: `${player.streak} DAYS` },
    { label: 'LAST_SYNCHRONIZED', value: new Date().toLocaleDateString() }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="system-page-hud"
    >
      {/* System Readout */}
      <div className="sl-card-angled system-hud-panel">
        <div className="sl-hud-corners" />
        <div className="panel-header-hud sl-terminal-text">
          <Terminal size={14} className="accent" />
          <span>SYSTEM_READOUT</span>
        </div>
        <div className="system-data-grid">
          {systemData.map((data, i) => (
            <div key={i} className="readout-item">
              <span className="readout-label sl-terminal-text">{data.label}</span>
              <span className="readout-value">{data.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Control Commands */}
      <div className="sl-card-angled system-hud-panel">
        <div className="sl-hud-corners" />
        <div className="panel-header-hud sl-terminal-text">
          <RefreshCw size={14} className="accent" />
          <span>COMMAND_INPUT</span>
        </div>
        <div className="system-actions-hud">
          <button className="hud-cmd-btn btn-cyan" onClick={onResetQuests}>
            [ FORCE_RELOAD_QUESTS ]
          </button>
          <button className="hud-cmd-btn btn-red" onClick={handleResetData}>
            [ PURGE_SYSTEM_DATA ]
          </button>
        </div>
      </div>

      {/* System Documentation */}
      <div className="sl-card-angled system-hud-panel">
        <div className="sl-hud-corners" />
        <div className="panel-header-hud sl-terminal-text">
          <Info size={14} className="accent" />
          <span>SYSTEM_DOCS</span>
        </div>
        <div className="docs-text-hud sl-terminal-text">
          <p>This is a Solo Leveling-inspired personal RPG system. Track your daily quests, level up, and improve your stats across 6 categories.</p>
          <p>PENALTY_PROTOCOL: Missed quests result in stat reduction on the next cycle.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default SystemPage;
