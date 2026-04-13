import React, { useState } from 'react';
import { motion } from 'framer-motion';
import client from '../api/client';

const SettingsPanel = ({ player, refreshData, openEvaluation }) => {
  const [applying, setApplying] = useState(false);

  const applyPenalties = async () => {
    setApplying(true);
    try {
      await client.post('/penalties/apply');
      refreshData();
    } catch (e) {
      console.error(e);
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="font-orbitron text-xs text-[var(--muted)] tracking-widest mb-4">SYSTEM CORE</div>

      {/* Streak Info */}
      <div className="bg-[var(--bg3)] border border-[var(--border)] rounded-lg p-4">
        <div className="text-[10px] font-jetbrainsmono text-[var(--muted)] tracking-widest mb-2">CURRENT STREAK</div>
        <div className="font-orbitron text-2xl font-bold text-[var(--gold)]">
          {player.streak_days} DAYS
        </div>
      </div>

      {/* Night Checklist Button */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={openEvaluation}
        className="w-full bg-transparent border border-[var(--border2)] text-[var(--text)] font-rajdhani text-xs p-3 rounded-lg hover:border-[var(--blue)] hover:text-[var(--blue)] transition-all"
      >
        ☾ OPEN NIGHT CHECKLIST
      </motion.button>

      {/* Apply Penalties Button */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={applyPenalties}
        disabled={applying}
        className="w-full bg-transparent border border-[var(--border2)] text-[var(--red)] font-rajdhani text-xs p-3 rounded-lg hover:border-[var(--red)] transition-all disabled:opacity-50"
      >
        {applying ? '⏳ PROCESSING...' : '☠ APPLY PENALTIES NOW'}
      </motion.button>

      {/* Achievements Section */}
      <div className="mt-6">
        <div className="font-jetbrainsmono text-[10px] text-[var(--muted)] tracking-widest mb-3">ACHIEVEMENTS</div>
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className="aspect-square bg-[var(--bg3)] border border-[var(--border)] rounded-lg flex items-center justify-center opacity-30 text-2xl">
              🏆
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pt-4 opacity-20">
        <div className="text-[8px] font-jetbrainsmono tracking-widest">Player ID: {player.id}</div>
        <div className="text-[8px] font-jetbrainsmono tracking-widest">System v0.1.2-ALPHA</div>
      </div>
    </div>
  );
};

export default SettingsPanel;
