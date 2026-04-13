import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const QUOTES = [
  { text: "The obstacle is the way.", author: "Marcus Aurelius" },
  { text: "Do not explain yourself. Your results will.", author: "Ayanokoji" },
  { text: "Opportunities multiply as they are seized.", author: "Sun Tzu" },
  { text: "He who knows others is wise. He who knows himself is enlightened.", author: "Lao Tzu" },
  { text: "We are what we repeatedly do.", author: "Aristotle" },
  { text: "Discipline is choosing what you want most over what you want now.", author: "" },
  { text: "The most dangerous person listens, thinks, and observes.", author: "Bruce Lee" },
];

const STAT_CONFIG = {
  intelligence: { icon: '🧠', color: 'text-[var(--purple)]', barColor: 'bg-[var(--purple)]' },
  physique: { icon: '💪', color: 'text-[var(--red)]', barColor: 'bg-[var(--red)]' },
  social: { icon: '🤝', color: 'text-[var(--cyan)]', barColor: 'bg-[var(--cyan)]' },
  tech: { icon: '⚡', color: 'text-[var(--blue)]', barColor: 'bg-[var(--blue)]' },
  finance: { icon: '💰', color: 'text-[var(--gold)]', barColor: 'bg-[var(--gold)]' },
  discipline: { icon: '🔥', color: 'text-[var(--orange)]', barColor: 'bg-[var(--orange)]' },
};

const MorningScreen = ({ player, quests = [], logs = [], penaltySummary, onEnter }) => {
  const [time, setTime] = useState(new Date());
  
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  const quote = QUOTES[dayOfYear % QUOTES.length];

  const priorityTargets = quests
    .filter(q => !logs.find(l => l.quest_id === q.id)?.completed)
    .slice(0, 3);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-[var(--bg)] flex flex-col overflow-y-auto no-scrollbar z-50">
      {/* Scrollable Content */}
      <div className="flex-1 px-5 py-6 space-y-5">
        
        {/* 1. LIVE CLOCK */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-4">
          <div className="text-5xl font-orbitron font-bold text-[var(--blue)] tracking-tighter" style={{ lineHeight: 1 }}>
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
          </div>
          <div className="text-xs font-rajdhani text-[var(--muted)] mt-2">
            {time.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
          </div>
        </motion.div>

        {/* 2. PLAYER CARD */}
        <motion.div 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-[var(--bg3)] border border-[var(--border)] rounded-xl p-4 flex justify-between items-center"
        >
          <div>
            <div className="font-orbitron text-2xl font-bold text-[var(--gold)] leading-none">LV.{player.level}</div>
            <div className="font-rajdhani text-xs text-[var(--blue)] mt-1">STRATEGIST</div>
          </div>
          <div className="text-right">
            <div className="text-[var(--orange)] text-lg">🔥 {player.streak_days}</div>
            <div className="font-orbitron text-xs text-[var(--muted)] mt-1">{player.total_xp} XP</div>
          </div>
        </motion.div>

        {/* 3. PENALTY BOX */}
        {penaltySummary && penaltySummary.missed > 0 && (
          <motion.div 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-[rgba(239,83,80,0.08)] border border-[var(--red)] rounded lg p-4"
          >
            <div className="font-jetbrainsmono text-xs text-[var(--red)] tracking-widest mb-2">[ PENALTY REPORT ]</div>
            <div className="font-rajdhani text-xs text-[var(--red)]">
              Last night you missed {penaltySummary.missed} quests. -{penaltySummary.xp_lost} XP deducted.
            </div>
          </motion.div>
        )}

        {/* 4. QUOTE BOX */}
        <div className="border-l-4 border-l-[var(--purple)] pl-4 py-2 italic font-rajdhani text-xs text-[var(--muted)] leading-relaxed">
          "{quote.text}" {quote.author && <span className="font-normal">— {quote.author}</span>}
        </div>

        {/* 5. STAT OVERVIEW GRID */}
        <div className="grid grid-cols-3 gap-3">
          {['intelligence', 'physique', 'social', 'tech', 'finance', 'discipline'].map(key => {
            const stat = STAT_CONFIG[key];
            const value = player[key];
            return (
              <motion.div 
                key={key}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-[var(--bg3)] border border-[var(--border)] rounded-lg p-2 text-center"
              >
                <div className={`text-lg mb-1`}>{stat.icon}</div>
                <div className="font-rajdhani text-[9px] text-[var(--muted)] uppercase mb-1">
                  {key}
                </div>
                <div className={`font-orbitron text-lg font-bold ${stat.color}`}>
                  {value}
                </div>
                <div className="h-1 bg-[var(--bg2)] rounded mt-1 overflow-hidden">
                  <motion.div 
                    className={stat.barColor}
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ delay: 0.1, duration: 0.8 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 6. PRIORITY TARGETS */}
        <div>
          <div className="font-orbitron text-[9px] text-[var(--muted)] tracking-widest mb-2 uppercase">
            PRIORITY TARGETS
          </div>
          <div className="space-y-1">
            {priorityTargets.map((q, idx) => (
              <motion.div 
                key={q.id}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-[var(--bg2)] border border-[var(--border)] rounded p-2 flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-[var(--cyan)]" />
                <div className="flex-1 font-rajdhani text-xs">{q.name}</div>
                <div className="font-orbitron text-xs text-[var(--gold)]">+{q.xp_reward} XP</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Spacer */}
        <div className="h-4" />
      </div>

      {/* 7. ENTER BUTTON - Sticky Bottom */}
      <div className="sticky bottom-0 left-0 right-0 bg-[var(--bg)] border-t border-[var(--border)] p-5 mt-auto">
        <motion.button 
          whileHover={{ borderColor: 'var(--blue)', backgroundColor: 'rgba(79, 195, 247, 0.08)' }}
          whileTap={{ scale: 0.97 }}
          onClick={onEnter}
          className="w-full bg-transparent border border-[var(--blue)] text-[var(--blue)] font-orbitron text-xs tracking-widest py-3 rounded-lg transition-all"
        >
          ENTER THE SYSTEM →
        </motion.button>
      </div>
    </div>
  );
};

export default MorningScreen;
