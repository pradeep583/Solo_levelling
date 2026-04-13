import React from 'react';
import { motion } from 'framer-motion';

const EvaluationScreen = ({ logs, quests, player, onAcknowledge }) => {
  const completedCount = logs.filter(l => l.completed).length;
  const totalCount = quests.length;
  const percentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const getRank = (p) => {
    if (p >= 100) return { label: 'S', color: 'text-[var(--gold)]', desc: 'Sovereign Presence' };
    if (p >= 80) return { label: 'A', color: 'text-[var(--blue)]', desc: 'Elite Hunter' };
    if (p >= 60) return { label: 'B', color: 'text-[var(--purple)]', desc: 'Advanced Tactician' };
    if (p >= 40) return { label: 'C', color: 'text-[var(--green)]', desc: 'Novice Hunter' };
    return { label: 'D', color: 'text-[var(--red)]', desc: 'Status: Vulnerable' };
  };

  const rank = getRank(percentage);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-[var(--bg)] flex flex-col items-center justify-center p-6 text-center"
    >
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <div className="text-[10px] font-jetbrainsmono text-[var(--purple)] tracking-widest mb-2">SYSTEM EVALUATION</div>
        <h2 className="text-3xl font-orbitron font-black text-[var(--text)] uppercase tracking-tight">DAILY REPORT</h2>
      </motion.div>

      <div className="relative mb-12">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 12, delay: 0.5 }}
          className={`w-40 h-40 rounded-full border-4 border-dashed border-[var(--border)] flex items-center justify-center relative`}
        >
          <span className={`text-8xl font-orbitron font-black ${rank.color}`}>{rank.label}</span>
          <motion.div
             animate={{ rotate: 360 }}
             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
             className="absolute inset-0 border border-white/5 rounded-full"
          />
        </motion.div>
      </div>

      <div className="space-y-3 w-full max-w-xs mb-8">
        <div className="bg-[var(--bg3)] p-3 rounded-lg border border-[var(--border)]">
          <div className="text-[10px] font-jetbrainsmono text-[var(--muted)] uppercase mb-1">COMPLETION RATE</div>
          <div className="font-orbitron text-xl font-bold text-[var(--blue)]">{Math.round(percentage)}%</div>
          <div className="text-xs text-[var(--muted)] font-rajdhani mt-1">{completedCount} / {totalCount} targets</div>
        </div>
        <div className="bg-[var(--bg3)] p-3 rounded-lg border border-[var(--border)]">
          <div className="text-[10px] font-jetbrainsmono text-[var(--muted)] uppercase mb-1">XP EARNED</div>
          <div className="font-orbitron text-xl font-bold text-[var(--gold)]">+{logs.filter(l => l.completed).reduce((acc, l) => acc + l.xp_earned, 0)}</div>
        </div>
      </div>

      {percentage < 100 && (
        <div className="mb-8 text-[var(--red)] text-[10px] font-jetbrainsmono tracking-widest animated-pulse">
          ☠ PENALTIES APPLIED TO MISSED TARGETS
        </div>
      )}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onAcknowledge}
        className="bg-[var(--blue)] text-[var(--bg)] font-orbitron font-black px-8 py-3 rounded-lg tracking-widest text-xs"
      >
        ACKNOWLEDGE
      </motion.button>
    </motion.div>
  );
};

export default EvaluationScreen;
