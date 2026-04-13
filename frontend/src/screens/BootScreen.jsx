import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const BootScreen = ({ onFinish }) => {
  const [progress, setProgress]     = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [done, setDone]              = useState(false);

  const statuses = [
    'INITIALIZING SYSTEM...',
    'LOADING PLAYER DATA...',
    'CALIBRATING STATS...',
    'SYNCING QUEST LOG...',
    'SYSTEM READY.',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setDone(true);
          setTimeout(onFinish, 600);
          return 100;
        }
        return prev + 1.5;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [onFinish]);

  useEffect(() => {
    const st = setInterval(() => {
      setStatusIndex(prev => Math.min(prev + 1, statuses.length - 1));
    }, 600);
    return () => clearInterval(st);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-[#020813] p-8"
    >
      {/* Background subtle radial pulse */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(41,182,246,0.06)_0%,transparent_70%)] pointer-events-none" />

      {/* Corner ornaments */}
      <span className="absolute top-6 left-6 w-6 h-6 border-t-2 border-l-2 border-[var(--blue)] opacity-50" />
      <span className="absolute top-6 right-6 w-6 h-6 border-t-2 border-r-2 border-[var(--blue)] opacity-50" />
      <span className="absolute bottom-6 left-6 w-6 h-6 border-b-2 border-l-2 border-[var(--blue)] opacity-50" />
      <span className="absolute bottom-6 right-6 w-6 h-6 border-b-2 border-r-2 border-[var(--blue)] opacity-50" />

      {/* System label */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="font-orbitron text-[10px] tracking-[0.6em] text-[var(--muted)] mb-8 uppercase"
      >
        [ System Interface ]
      </motion.div>

      {/* ARISE title */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="font-orbitron text-7xl font-black tracking-[0.3em] text-white mb-2"
        style={{ textShadow: '0 0 40px rgba(41,182,246,0.5), 0 0 80px rgba(41,182,246,0.2)' }}
      >
        ARISE
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="font-orbitron text-[10px] tracking-[0.4em] text-[var(--blue)] mb-12"
      >
        SOLO LEVELING SYSTEM
      </motion.div>

      {/* Progress bar */}
      <div className="w-64">
        <div className="h-1 bg-[var(--bg3)] border border-[var(--border)] overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[var(--blue2)] to-[var(--cyan)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.05 }}
          />
        </div>

        {/* status text */}
        <div className="flex justify-between items-center mt-2">
          <span className="font-jetbrainsmono text-[9px] text-[var(--muted)] tracking-widest">
            {statuses[statusIndex]}
          </span>
          <span className="font-jetbrainsmono text-[9px] text-[var(--blue)]">
            {Math.min(100, Math.round(progress))}%
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 font-jetbrainsmono text-[8px] text-[var(--muted2)] tracking-[0.3em] uppercase opacity-40">
        Hunters Guild — System v4.0.0
      </div>
    </motion.div>
  );
};

export default BootScreen;
