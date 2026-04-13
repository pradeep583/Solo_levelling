import React from 'react';
import { motion } from 'framer-motion';
import './SystemNotification.css';

const SystemNotification = ({ title, message, type = 'info', action = null, onClose }) => {
  return (
    <motion.div
      className="system-notification"
      initial={{ opacity: 0, scale: 0.9, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glow background effects */}
      <div className="notification-glow notification-glow-1" />
      <div className="notification-glow notification-glow-2" />

      {/* Main container */}
      <div className="notification-container">
        {/* Header with icon */}
        <div className="notification-header">
          <div className="notification-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <line x1="12" y1="16" x2="12" y2="12" strokeWidth="2" />
              <line x1="12" y1="8" x2="12.01" y2="8" strokeWidth="2" />
            </svg>
          </div>
          <div className="notification-title">{title}</div>
          {onClose && (
            <button className="notification-close" onClick={onClose}>
              ✕
            </button>
          )}
        </div>

        {/* Divider */}
        <div className="notification-divider" />

        {/* Message */}
        <div className="notification-message">{message}</div>

        {/* Action button if provided */}
        {action && (
          <>
            <div className="notification-divider" />
            <button className="notification-action" onClick={action.onClick}>
              {action.label}
            </button>
          </>
        )}
      </div>

      {/* Border frame effect */}
      <div className="notification-frame" />
    </motion.div>
  );
};

export default SystemNotification;
