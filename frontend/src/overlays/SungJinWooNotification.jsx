import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SungJinWooNotification = ({ isOpen, title, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[300] flex items-center justify-center bg-black/75 p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 12 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: -12 }}
          transition={{ type: 'spring', damping: 22, stiffness: 300 }}
          onClick={e => e.stopPropagation()}
          className="relative w-full max-w-[320px]"
        >
          {/* Glow aura behind the box */}
          <div className="absolute -inset-4 bg-[rgba(41,182,246,0.06)] blur-2xl pointer-events-none" />

          {/* Main panel */}
          <div className="relative border border-[rgba(41,182,246,0.7)] bg-gradient-to-b from-[#081f3a] to-[#040f1e]">
            {/* Corner ornaments — like the anime */}
            <span className="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 border-[var(--cyan)]" />
            <span className="absolute -top-px -right-px w-4 h-4 border-t-2 border-r-2 border-[var(--cyan)]" />
            <span className="absolute -bottom-px -left-px w-4 h-4 border-b-2 border-l-2 border-[var(--cyan)]" />
            <span className="absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 border-[var(--cyan)]" />

            {/* Icon + label */}
            <div className="flex items-center justify-center gap-2 pt-6 pb-3">
              <div className="w-6 h-6 border border-[var(--blue)] flex items-center justify-center">
                <span className="font-orbitron text-[10px] font-black text-[var(--blue)]">!</span>
              </div>
              <span className="font-orbitron text-[11px] font-black tracking-[0.4em] text-white">
                ALARM
              </span>
            </div>

            {/* Thin separator */}
            <div className="mx-6 h-px bg-[rgba(41,182,246,0.3)]" />

            {/* Message */}
            <div className="px-7 py-5 text-center">
              {title && (
                <p className="font-orbitron text-xs font-bold text-[var(--blue)] tracking-wider mb-3">
                  {title}
                </p>
              )}
              <p className="font-rajdhani text-sm text-white leading-relaxed tracking-wide">
                {message}
              </p>
            </div>

            {/* Thin separator */}
            <div className="mx-6 h-px bg-[rgba(41,182,246,0.3)]" />

            {/* Acknowledge button */}
            <div className="px-6 py-4">
              <motion.button
                whileHover={{ backgroundColor: 'rgba(41,182,246,0.2)' }}
                whileTap={{ scale: 0.97 }}
                onClick={onClose}
                className="w-full border border-[var(--blue)] text-[var(--blue)] font-orbitron text-[10px] font-bold tracking-[0.35em] py-2.5 transition-colors"
              >
                ACKNOWLEDGE
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SungJinWooNotification;
