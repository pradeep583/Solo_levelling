import React from 'react';
import { motion } from 'framer-motion';

const BOSSES = [
  { id: 1, name: 'The Blue Fang', desc: 'Consistently hit habits for 7 days.', icon: '👻', color: 'border-[var(--blue)]', maxSteps: 4, reward: '+100 XP, Title: Tracker' },
  { id: 2, name: 'Steel Monarch', desc: 'Reach 70 Physique and 70 Discipline.', icon: '🛡️', color: 'border-[var(--red)]', maxSteps: 3, reward: '+200 XP, Title: Unstoppable' },
  { id: 3, name: 'Shadow Architect', desc: 'Reach 70 Tech and 70 Intelligence.', icon: '👻', color: 'border-[var(--purple)]', maxSteps: 3, reward: '+200 XP, Title: Architect' },
  { id: 4, name: 'Golden Tycoon', desc: 'Reach 80 Finance and 80 Social.', icon: '🔥', color: 'border-[var(--gold)]', maxSteps: 5, reward: '+300 XP, Title: Tycoon' },
  { id: 5, name: 'The System Admin', desc: 'Complete all 9 quests for 14 days straight.', icon: '☠️', color: 'border-[var(--cyan)]', maxSteps: 4, reward: '+1000 XP, Title: Sovereign' },
];

const BossCard = ({ boss, currentSteps = 0, onProgress }) => {
  const isDefeated = currentSteps >= boss.maxSteps;

  return (
    <motion.div 
      whileHover={{ y: isDefeated ? 0 : -2 }}
      className={`bg-[var(--bg3)] border border-[var(--border)] border-l-4 ${boss.color} rounded-lg p-3 mb-2 transition-all ${isDefeated ? 'opacity-50' : ''}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm">{boss.icon}</span>
            <h4 className={`font-orbitron font-bold text-xs uppercase tracking-widest ${isDefeated ? 'text-[var(--green)] line-through' : 'text-[var(--text)]'}`}>
              {boss.name}
            </h4>
          </div>
          <p className="text-[10px] text-[var(--muted)] font-rajdhani">{boss.desc}</p>
        </div>
      </div>

      {/* Reward */}
      <div className="mb-2 pb-2 border-b border-[var(--border)]">
        <div className="text-[9px] font-jetbrainsmono text-[var(--muted)] tracking-widest mb-1">REWARD</div>
        <div className="text-[10px] font-orbitron text-[var(--gold)]">🗡️ {boss.reward}</div>
      </div>

      {/* Progress Dots */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {[...Array(boss.maxSteps)].map((_, i) => (
            <motion.button
              key={i}
              onClick={() => !isDefeated && onProgress(boss.id)}
              whileTap={{ scale: 0.9 }}
              className={`w-5 h-2 rounded cursor-pointer transition-all ${
                i < currentSteps 
                  ? 'bg-[var(--green)]' 
                  : 'bg-[var(--muted2)] hover:bg-[var(--muted)]'
              }`}
            />
          ))}
        </div>
        <span className="text-[9px] font-jetbrainsmono text-[var(--muted)]">
          {currentSteps}/{boss.maxSteps}
        </span>
      </div>
    </motion.div>
  );
};

const BossPanel = ({ bossProgress = {}, onBossProgress }) => {
  const defeatedCount = Object.values(bossProgress).filter(p => p >= 3).length; // Adjust based on logic

  return (
    <div className="space-y-6 pb-4 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-1 border-b border-[var(--border)] pb-4">
        <div className="flex items-center justify-between">
          <h3 className="font-orbitron font-black text-[10px] text-[var(--muted)] tracking-[0.4em] uppercase">DUNGEON BOSSES</h3>
          <div className="font-orbitron text-[10px] text-[var(--gold)] font-black tracking-widest">
            {defeatedCount} / {BOSSES.length} DEFEATED
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {BOSSES.map(boss => {
          const currentSteps = bossProgress[boss.id] || 0;
          const isDefeated = currentSteps >= boss.maxSteps;

          return (
            <motion.div 
              key={boss.id}
              whileHover={{ y: isDefeated ? 0 : -2 }}
              className={`glass-premium rounded-xl p-4 border-l-2 ${boss.color} relative overflow-hidden transition-all ${isDefeated ? 'opacity-40 grayscale pointer-events-none' : 'hover:border-r-[var(--gold)]/30'}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center text-3xl shadow-inner group-hover:border-[var(--blue)]/20 transition-colors">
                    {boss.icon}
                  </div>
                  <div>
                    <h4 className={`font-orbitron font-black text-sm tracking-wider uppercase ${isDefeated ? 'text-[var(--green)]' : 'text-[var(--text)]'}`}>
                      {boss.name}
                    </h4>
                    <p className="text-[10px] text-[var(--muted)] font-rajdhani font-bold uppercase tracking-tight">{boss.desc}</p>
                  </div>
                </div>
              </div>

              {/* Reward Section */}
              <div className="bg-[var(--bg2)]/50 rounded-lg p-2.5 border border-[var(--border)] mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[8px] font-orbitron font-black text-[var(--muted)] tracking-widest uppercase">Contract Reward</span>
                </div>
                <div className="font-orbitron text-[10px] text-[var(--gold)] font-bold flex items-center gap-2">
                  <Skull size={10} className="text-[var(--gold)]" />
                  {boss.reward}
                </div>
              </div>

              {/* Progress Dots */}
              <div className="flex items-center justify-between px-1">
                <div className="flex gap-1.5 flex-1 max-w-[180px]">
                  {[...Array(boss.maxSteps)].map((_, i) => (
                    <motion.button
                      key={i}
                      onClick={() => !isDefeated && onBossProgress(boss.id)}
                      whileTap={{ scale: 0.8 }}
                      className={`h-2 flex-1 rounded-sm cursor-pointer transition-all ${
                        i < currentSteps 
                          ? 'bg-[var(--green)] shadow-[0_0_8px_rgba(0,230,118,0.5)]' 
                          : 'bg-[var(--bg)] border border-[var(--border2)] hover:border-[var(--muted)]'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-[10px] font-jetbrainsmono text-[var(--muted)] font-bold">
                  {currentSteps} / {boss.maxSteps}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default BossPanel;
