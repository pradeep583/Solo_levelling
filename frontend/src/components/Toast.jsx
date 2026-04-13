import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Toast = ({ message, type = 'info', onClear }) => {
  useEffect(() => {
    const timer = setTimeout(onClear, 2500);
    return () => clearTimeout(timer);
  }, [onClear]);

  const config = {
    info: { bg: 'bg-[var(--bg3)]', border: 'border-[var(--blue)]', text: 'text-[var(--blue)]' },
    success: { bg: 'bg-[var(--bg3)]', border: 'border-[var(--gold)]', text: 'text-[var(--gold)]' },
    error: { bg: 'bg-[var(--bg3)]', border: 'border-[var(--red)]', text: 'text-[var(--red)]' },
  };

  const { bg, border, text } = config[type] || config.info;

  return (
    <motion.div
      initial={{ opacity: 0, translateY: -8 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: -8 }}
      transition={{ duration: 0.25 }}
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-[70] max-w-sm w-full ${bg} ${border} border rounded-lg p-3 font-jetbrainsmono text-xs ${text} whitespace-nowrap`}
    >
      {message}
    </motion.div>
  );
};

export default Toast;
