import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NightChecklist = ({ isOpen, quests, logs, onClose, onCommit }) => {
  const [localLogs, setLocalLogs] = useState({});

  useEffect(() => {
    if (isOpen) {
      const state = {};
      quests.forEach(q => {
        const isCompleted = logs.find(l => l.quest_id === q.id)?.completed || false;
        state[q.id] = isCompleted;
      });
      setLocalLogs(state);
    }
  }, [isOpen, quests, logs]);

  if (!isOpen) return null;

  const toggleQuest = (id) => {
    setLocalLogs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const currentXPEarned = quests.reduce((acc, q) => localLogs[q.id] ? acc + q.xp_reward : acc, 0);
  const currentPenaltyXP = quests.reduce((acc, q) => !localLogs[q.id] ? acc + Math.abs(q.penalty_xp) : acc, 0);
  const missedCount = Object.values(localLogs).filter(v => !v).length;

  const handleCommit = () => {
    onCommit(localLogs);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[50] bg-[rgba(7,7,30,0.97)] flex flex-col p-5 overflow-y-auto no-scrollbar"
      >
        {/* Header */}
        <div className="border-b border-[var(--border)] pb-4 mb-4 shrink-0">
          <div className="font-orbitron text-xs text-[var(--purple)] tracking-widest mb-1">[ DAILY REPORT ]</div>
          <h1 className="font-orbitron text-lg font-bold text-[var(--purple)] tracking-wide mb-1">NIGHT EVALUATION</h1>
          <p className="font-rajdhani text-[10px] text-[var(--muted)]">Verify completed targets before cycle close.</p>
        </div>

        {/* Quest List */}
        <div className="flex-1 space-y-1 mb-6">
          {quests.map((q, idx) => {
            const isChecked = localLogs[q.id];
            return (
              <motion.div 
                key={q.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.02 }}
                onClick={() => toggleQuest(q.id)}
                className={`bg-[var(--bg3)] border border-[var(--border)] rounded p-2 cursor-pointer flex items-center gap-3 transition-all ${
                  isChecked ? 'opacity-50 border-[var(--border2)]' : 'hover:border-[var(--border2)]'
                }`}
              >
                <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border ${
                  isChecked 
                    ? 'bg-[var(--green)] border-[var(--green)]' 
                    : 'border-[var(--muted2)]'
                }`}>
                  {isChecked && <span className="text-black text-[8px] font-bold">✓</span>}
                </div>
                <div className={`flex-1 font-rajdhani text-xs ${isChecked ? 'line-through text-[var(--muted)]' : 'text-[var(--text)]'}`}>
                  {q.name}
                </div>
                {!isChecked && (
                  <div className="text-[var(--red)] font-jetbrainsmono text-[9px]">
                    -{q.penalty_xp}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* XP Earned Display */}
        <div className="text-center py-6">
          <div className="font-orbitron text-3xl font-bold text-[var(--gold)] tracking-tight">
            {currentXPEarned}
          </div>
          <div className="font-rajdhani text-[10px] text-[var(--muted)] mt-1">XP EARNED TODAY</div>
        </div>

        {/* COMMIT Button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleCommit}
          className="w-full bg-[var(--purple)] text-white font-orbitron text-xs tracking-widest py-3 rounded-lg font-bold transition-all"
        >
          COMMIT DATA
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};

export default NightChecklist;
