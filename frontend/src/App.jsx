import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import client from './api/client';
import BootScreen from './screens/BootScreen';
import MorningScreen from './screens/MorningScreen';
import Dashboard from './screens/Dashboard';
import EvaluationScreen from './screens/EvaluationScreen';
import LevelUpOverlay from './overlays/LevelUpOverlay';
import NightChecklist from './overlays/NightChecklist';
import SungJinWooNotification from './overlays/SungJinWooNotification';
import ParticleCanvas from './components/ParticleCanvas';
import Toast from './components/Toast';
import RPGSystem from './screens/RPGSystem'

function App() {
  const [useRPG, setUseRPG] = useState(false)

  if (useRPG) {
    return (
      <>
        <button 
          onClick={() => setUseRPG(false)}
          style={{
            position: 'fixed',
            top: 10,
            right: 10,
            zIndex: 9999,
            padding: '8px 16px',
            background: '#00d4ff',
            color: '#000',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '12px'
          }}
        >
          ← BACK TO DASHBOARD
        </button>
        <RPGSystem />
      </>
    )
  }

  return (
    <>
      {/* Your existing Dashboard code */}
      
      {/* Add this button */}
      <button 
        onClick={() => setUseRPG(true)}
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 100,
          padding: '10px 16px',
          background: '#00d4ff',
          color: '#000',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '14px'
        }}
      >
        🎮 RPG SYSTEM
      </button>
    </>
  )
}

export default App