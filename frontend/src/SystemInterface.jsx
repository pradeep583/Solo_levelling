import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Shield, ListChecks, Trophy, Terminal, 
  AlertTriangle, CheckSquare, Lock, Unlock, Zap, TrendingUp,
  Heart, FlaskConical, Activity, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SystemBackground from './components/SystemBackground';
import './SystemInterface.css';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   DATA & CONSTANTS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const DEFAULT_PLAYER = { name: "PRADEEP", level: 4, totalXP: 20, streak: 0, title: "STRATEGIST", lastDate: "" };
const DEFAULT_STATS = { intelligence: 62, physique: 47, perception: 45, tech: 58, finance: 30, discipline: 50 };

const getWorkoutString = () => {
  const day = new Date().getDay();
  if (day === 0) return 'REST DAY: CORE & STRETCHING';
  if (day === 1) return 'WORKOUT: CHEST & TRICEPS';
  if (day === 2) return 'WORKOUT: BACK & BICEPS';
  if (day === 3) return 'ACTIVE RECOVERY / CARDIO';
  if (day === 4) return 'WORKOUT: LEGS & ABS';
  if (day === 5) return 'WORKOUT: SHOULDERS & ARMS';
  if (day === 6) return 'WORKOUT: FULL BODY EXPLOSIVE';
  return 'WORKOUT SESSION';
};

const DAILY_QUESTS = [
  { id: 'DQ-001', name: getWorkoutString(), xp: 20, stat: 'physique', val: 2 },
  { id: 'DQ-002', name: '150G PROTEIN GOAL', xp: 15, stat: 'physique', val: 1 },
  { id: 'DQ-003', name: 'STUDY TECH / DSA PROBLEM', xp: 25, stat: 'tech', val: 2 },
  { id: 'DQ-004', name: 'CHESS (IMPROVE INTELLIGENCE)', xp: 15, stat: 'intelligence', val: 1 },
  { id: 'DQ-005', name: 'CONSUME FINANCE INFO', xp: 15, stat: 'finance', val: 1 },
  { id: 'DQ-006', name: 'EYE CARE PROTOCOL (20-20-20)', xp: 5, stat: 'perception', val: 1 },
  { id: 'DQ-007', name: 'POSTURE CORRECTION', xp: 5, stat: 'discipline', val: 1 },
  { id: 'DQ-008', name: 'EXPLORE ONE THING & ACTIVE RECALL', xp: 20, stat: 'intelligence', val: 2 }
];

const WEEKLY_QUESTS_DB = [
  { id: 'WQ-001', name: 'TRAVEL VLOG OR EXPLORE A PLACE', xp: 100, stat: 'perception', val: 5 },
  { id: 'WQ-002', name: 'READ A CHAPTER IN A BOOK', xp: 80, stat: 'intelligence', val: 4 },
  { id: 'WQ-003', name: 'WATCH ONE MASTERPIECE MOVIE', xp: 60, stat: 'perception', val: 3 },
  { id: 'WQ-004', name: 'POST 1-2 YT SHORT EDITS', xp: 100, stat: 'tech', val: 5 },
  { id: 'WQ-005', name: 'IMPROVE RESUME & APPLY TO JOBS', xp: 150, stat: 'finance', val: 6 }
];

const SURPRISE_POOL = [
  { id: 'SQ-001', name: 'DEMON CASTLE: 100 PUSHUPS', desc: 'Failure is weakness.', xp: 50, stat: 'physique', val: 5 },
  { id: 'SQ-002', name: 'ARCHITECTS TRIAL: 3 DSA PROBLEMS', desc: 'Sharpen your mind.', xp: 50, stat: 'intelligence', val: 5 },
  { id: 'SQ-003', name: 'DOUBLE DUNGEON: BUILD A PROJECT', desc: 'Expand your arsenal.', xp: 50, stat: 'tech', val: 5 },
  { id: 'SQ-004', name: 'PENALTY ZONE: NO PHONE FOR 4 HOURS', desc: 'Reclaim your focus.', xp: 50, stat: 'discipline', val: 5 },
  { id: 'SQ-005', name: 'THE ICE ELF: NO SUGAR FOR 24H', desc: 'Purify your vessel.', xp: 40, stat: 'physique', val: 3 },
  { id: 'SQ-006', name: 'KING OF BEASTS: COLD SHOWER', desc: 'Master your shock response.', xp: 30, stat: 'discipline', val: 3 },
  { id: 'SQ-007', name: 'VULCANUS: 2H DEEP WORK BLK', desc: 'Forge greatness through focus.', xp: 60, stat: 'tech', val: 4 },
  { id: 'SQ-008', name: 'CERBERUS: 10KM RUN', desc: 'Hellhound endurance protocol.', xp: 100, stat: 'physique', val: 8 },
  { id: 'SQ-009', name: 'THE ANT KING: READ 50 PAGES', desc: 'Absorb knowledge with greed.', xp: 50, stat: 'intelligence', val: 5 },
  { id: 'SQ-010', name: 'BARAN: NO JUNK FOOD TODAY', desc: 'The King commands purity.', xp: 40, stat: 'physique', val: 4 },
  { id: 'SQ-011', name: 'KITE: 5 AM WAKE UP CALL', desc: 'The early hunter catches the S-rank.', xp: 80, stat: 'discipline', val: 6 },
  { id: 'SQ-012', name: 'YGRITTE: 20 MIN MEDITATION', desc: 'Calculated silence.', xp: 30, stat: 'perception', val: 4 },
  { id: 'SQ-013', name: 'TUSK: CLEAN YOUR ENTIRE ROOM', desc: 'Order in the domain.', xp: 40, stat: 'discipline', val: 3 },
  { id: 'SQ-014', name: 'BERU: LEARN 10 NEW WORDS', desc: 'Expand your linguistic lethality.', xp: 30, stat: 'intelligence', val: 2 }
];

const SECRET_QUESTS_DB = [
  { id: 'SCQ-001', name: 'THE HELL START', desc: '4 Consecutive Days of 100% Completion Found.', xp: 500, stat: 'discipline', val: 20 },
  { id: 'SCQ-002', name: 'LIMIT BREAKER', desc: 'Achieved S-Rank in 2 Stats Simultaneously.', xp: 1000, stat: 'physique', val: 30 },
  { id: 'SCQ-003', name: 'SHADOW MONARCH CANDIDATE', desc: 'Reached Level 30 without a single penalty.', xp: 2000, stat: 'intelligence', val: 50 }
];

const ACHIEVEMENTS_DB = [
  { id: 'ACH-001', name: 'AWAKENED PLAYER', desc: 'Complete your first quest.' },
  { id: 'ACH-002', name: 'COURAGE OF THE WEAK', desc: 'Complete all daily quests in a single day.' },
  { id: 'ACH-003', name: 'SYSTEM ADMIN', desc: 'Maintain a 7-day completion streak.' },
  { id: 'ACH-004', name: 'NECROMANCER CANDIDATE', desc: 'Reach level 10.' },
  { id: 'ACH-005', name: 'DEMON SLAYER', desc: 'Complete 5 Weekly Quests.' },
  { id: 'ACH-006', name: 'ARCHITECT\'S FAVOR', desc: 'Reach S-Rank in Intelligence.' },
  { id: 'ACH-007', name: 'VESSEL OF THE SOVEREIGN', desc: 'Reach S-Rank in Physique.' },
  { id: 'ACH-008', name: 'SHADOW MONARCH', desc: 'Reach Level 30.' },
  { id: 'ACH-009', name: 'GHOST PROTOCOL', desc: 'Complete a Secret Surprise quest.' }
];

const getWeekStr = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - d.getDay() + (d.getDay() === 0 ? -6 : 1)); // Monday anchoring
  return d.toISOString().split('T')[0];
};

const LEVEL_TITLES = {
  1: 'NOVICE', 2: 'APPRENTICE', 3: 'SEEKER', 4: 'STRATEGIST', 5: 'ANALYST', 
  6: 'TACTICIAN', 8: 'EXPERT', 10: 'MASTER', 15: 'ELITE', 20: 'SHADOW MONARCH'
};

const getLevelTitle = (lvl) => {
  const keys = Object.keys(LEVEL_TITLES).map(Number).sort((a,b)=>b-a);
  for (let k of keys) { if (lvl >= k) return LEVEL_TITLES[k]; }
  return 'UNRANKED';
};

const getRankBadge = (lvl) => {
  if(lvl>=30) return 'S';
  if(lvl>=20) return 'A';
  if(lvl>=15) return 'B';
  if(lvl>=10) return 'C';
  if(lvl>=5) return 'D';
  return 'E';
};

const getStatRank = (val) => {
  if (val >= 90) return 'S';
  if (val >= 75) return 'A';
  if (val >= 60) return 'B';
  if (val >= 45) return 'C';
  if (val >= 30) return 'D';
  return 'E';
};

const getRankColor = (rank) => `var(--rank-${rank.toLowerCase()})`;
const getTodayStr = () => new Date().toISOString().split('T')[0];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MAIN SYSTEM COMPONENT
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export default function SystemInterface() {
  const [booting, setBooting] = useState(!sessionStorage.getItem('boot_done'));
  const [bootText, setBootText] = useState('');
  
  const [player, setPlayer] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('sl_player'));
      return (saved && typeof saved === 'object') ? saved : DEFAULT_PLAYER;
    } catch (e) { return DEFAULT_PLAYER; }
  });
  
  const [stats, setStats] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('sl_stats'));
      return (saved && typeof saved === 'object') ? saved : DEFAULT_STATS;
    } catch (e) { return DEFAULT_STATS; }
  });
  
  const [quests, setQuests] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(`sl_quests_${getTodayStr()}`));
      // SCHEMA VERSION CHECK: If data is using old QTG- IDs, force reset to new DQ- schema
      if (Array.isArray(saved) && saved.length > 0 && !saved[0].id.startsWith('QTG-')) return saved;
      return DAILY_QUESTS.map(q => ({ ...q, completed: false }));
    } catch(e) {
      return DAILY_QUESTS.map(q => ({ ...q, completed: false }));
    }
  });

  const [weeklyQuests, setWeeklyQuests] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(`sl_weekly_${getWeekStr()}`));
      if (Array.isArray(saved) && saved.length > 0) return saved;
      // New Weekly Architecture Force-Init
      return WEEKLY_QUESTS_DB.map(q => ({ ...q, completed: false }));
    } catch(e) {
      return WEEKLY_QUESTS_DB.map(q => ({ ...q, completed: false }));
    }
  });
  
  const [surprise, setSurprise] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(`sl_surprise_${getTodayStr()}`)) || null;
    } catch (e) { return null; }
  });
  const [sysLogs, setSysLogs] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('sl_logs'));
      return Array.isArray(saved) ? saved : [];
    } catch (e) { return []; }
  });
  
  const [achievements, setAchievements] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('sl_achievements'));
      return Array.isArray(saved) ? saved : [];
    } catch (e) { return []; }
  });
  
  const [activeTab, setActiveTab] = useState('STATUS');
  const [toasts, setToasts] = useState([]);
  const [showSurpriseModal, setShowSurpriseModal] = useState(false);
  const [levelUpData, setLevelUpData] = useState(null);
  const [activePenalties, setActivePenalties] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  const isCursed = activePenalties.length > 0;


  /* Engine Setup & Penalties */
  useEffect(() => {
    const today = getTodayStr();
    let savedQuests = quests; // Re-use eager state
    
    // Only run penalty engine if today is a completely new day relative to lastDate
    const lastDate = localStorage.getItem('sl_last_date');
    if (lastDate && lastDate !== today) {
      // New day detected
      savedQuests = DAILY_QUESTS.map(q => ({ ...q, completed: false }));
      localStorage.setItem(`sl_quests_${today}`, JSON.stringify(savedQuests));
      
      // Run penalty engine relative to lastDate
      let oldQuests = [];
        try {
          const parsed = JSON.parse(localStorage.getItem(`sl_quests_${lastDate}`));
          if (Array.isArray(parsed)) oldQuests = parsed;
        } catch (e) { oldQuests = []; }
        
        let completedCount = 0;
        let pAlerts = [];
        let newStats = { ...stats };
        
        oldQuests.forEach(q => {
          if (q.completed) completedCount++;
          else {
            newStats[q.stat] = Math.max(0, (newStats[q.stat] || 0) - q.val);
            pAlerts.push(`MISSED: [${q.name}] — ${q.stat.toUpperCase()} PENALIZED: -${q.val} PTS`);
          }
        });

        // Special Surprise Missed?
        let oldSurprise = null;
        try {
          oldSurprise = JSON.parse(localStorage.getItem(`sl_surprise_${lastDate}`));
        } catch (e) { oldSurprise = null; }
        if (oldSurprise && oldSurprise.accepted && !oldSurprise.completed) {
          newStats[oldSurprise.stat] = Math.max(0, (newStats[oldSurprise.stat] || 0) - 3);
          pAlerts.push(`MISSED: SPECIAL PROTOCOL — ${oldSurprise.stat.toUpperCase()} PENALIZED: -3 PTS`);
          setPlayer(p => ({ ...p, totalXP: Math.max(0, p.totalXP - 15) }));
        }

        let newStreak = player.streak;
        if (completedCount >= 7) newStreak++;
        else if (completedCount < 5) newStreak = 0;
        
        if (pAlerts.length > 0) {
          setStats(newStats);
          setPenaltyAlerts(pAlerts);
          addLog("SYSTEM_ALERT // PUNISHMENT_PROTOCOL EXECUTED FOR YESTERDAY.");
        }
        
        setPlayer(p => ({ ...p, streak: newStreak }));
      localStorage.setItem('sl_last_date', today);
    }

    // --- WEEKLY PENALTY ENGINE ---
    const thisWeek = getWeekStr();
    const lastWeek = localStorage.getItem('sl_last_week');
    if (lastWeek && lastWeek !== thisWeek) {
      let oldWeekly = [];
      try {
        const parsed = JSON.parse(localStorage.getItem(`sl_weekly_${lastWeek}`));
        if (Array.isArray(parsed)) oldWeekly = parsed;
      } catch(e) { oldWeekly = []; }

      let missedCount = 0;
      let wAlerts = [];
      let wStats = { ...stats };
      
      oldWeekly.forEach(q => {
        if (!q.completed) {
          missedCount++;
          wStats[q.stat] = Math.max(0, (wStats[q.stat] || 0) - 5);
          wAlerts.push(`WEEKLY_MISSED: [${q.name}] | ${q.stat.toUpperCase()} EXTRACTED: -5 PTS`);
        }
      });

      if (missedCount > 0) {
        setStats(wStats);
        setActivePenalties(prev => [...prev, ...wAlerts]);
        setPlayer(p => ({ ...p, totalXP: Math.max(0, p.totalXP - (missedCount * 50)) }));
        addLog(`WEEKLY_PENALTY // ${missedCount} PROTOCOLS FAILED. SYSTEM_LOCK ENGAGED.`);
      }
      localStorage.setItem('sl_last_week', thisWeek);
    } else if (!lastWeek) {
      localStorage.setItem('sl_last_week', thisWeek);
    }

    setQuests(savedQuests || DAILY_QUESTS.map(q => ({ ...q, completed: false })));

    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line
  }, []);

  // Save hooks & Backend Integration Sync
  useEffect(() => {
    localStorage.setItem('sl_player', JSON.stringify(player));
    localStorage.setItem('sl_stats', JSON.stringify(stats));
    localStorage.setItem(`sl_quests_${getTodayStr()}`, JSON.stringify(quests));
    localStorage.setItem(`sl_weekly_${getWeekStr()}`, JSON.stringify(weeklyQuests));
    localStorage.setItem('sl_logs', JSON.stringify(sysLogs));
    localStorage.setItem('sl_achievements', JSON.stringify(achievements));
    if (surprise) localStorage.setItem(`sl_surprise_${getTodayStr()}`, JSON.stringify(surprise));

    // Future Best Practices: Background sync to nodejs
    const syncToMainframe = async () => {
      try {
        await fetch('http://localhost:8000/api/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ player, stats, quests, weeklyQuests, achievements })
        });
      } catch (e) {
        // Silent fail on backend disconnect to ensure strict frontend UX
      }
    };
    
    // Throttle sync slightly to avoid spam
    const timeoutId = setTimeout(syncToMainframe, 500);
    return () => clearTimeout(timeoutId);
  }, [player, stats, quests, weeklyQuests, sysLogs, achievements, surprise]);

  /* Achievement Engine */
  useEffect(() => {
    let unlocked = [...achievements];
    let newUnlocks = false;
    const checkObj = {
      'ACH-001': quests.some(q => q.completed),
      'ACH-002': quests.filter(q=>q.completed).length === 10,
      'ACH-003': player.streak >= 7,
      'ACH-007': player.level >= 10,
      'ACH-008': Object.values(stats).some(val => getStatRank(val) === 'S'),
      'ACH-009': surprise?.completed
    };

    Object.keys(checkObj).forEach(id => {
      if (checkObj[id] && !unlocked.includes(id)) {
        unlocked.push(id);
        newUnlocks = true;
        showToast(`ACHIEVEMENT DECODED // ${ACHIEVEMENTS_DB.find(a=>a.id === id).name}`, 'rank-s');
        addLog(`ACHIEVEMENT DECODED: ${id}`);
      }
    });

    if (newUnlocks) setAchievements(unlocked);
  }, [player.level, player.streak, quests, stats, surprise]);

  /* Secret Protocol Engine */
  useEffect(() => {
    // SCQ-001: The Hell Start (4 days 100%)
    const streak100 = parseInt(localStorage.getItem('sl_100_streak') || "0");
    const allDoneToday = quests.every(q => q.completed);
    
    // This logic would run at day transition usually, but for demo we check here
    if (allDoneToday && streak100 >= 3) {
       const id = 'SCQ-001';
       if (!achievements.includes(id)) {
           setAchievements(prev => [...prev, id]);
           applyRewards(500, 'discipline', 20);
           showToast("SECRET PROTOCOL FOUND // THE HELL START", 'gold');
           addLog("SECRET_QUEST_CLEARED: THE HELL START. REWARDED: +500 XP, +20 DIS");
       }
    }
  }, [quests, achievements]);


  /* Surprise Quest Triggers */
  useEffect(() => {
    if (booting || surprise) return;
    const hour = currentTime.getHours();
    
    // Trigger 1: Time based
    if ((hour >= 6 && hour < 8) || (hour === 12) || (hour >= 22)) {
      setTimeout(() => triggerSurprise(), 3000);
      return;
    }
    
    // Trigger 2: Completion based
    if (quests.filter(q => q.completed).length === 5) {
      triggerSurprise();
      return;
    }

    // Trigger 3: Random
    const randomMs = Math.floor(Math.random() * (25 * 60 * 1000 - 8 * 60 * 1000)) + 8 * 60 * 1000;
    const to = setTimeout(() => triggerSurprise(), randomMs);
    return () => clearTimeout(to);
  }, [currentTime, quests, booting]);

  const triggerSurprise = () => {
    if (surprise) return;
    const sq = SURPRISE_POOL[Math.floor(Math.random() * SURPRISE_POOL.length)];
    setSurprise({ ...sq, accepted: false, completed: false });
    setShowSurpriseModal(true);
    showToast("SPECIAL PROTOCOL INCOMING...", "danger");
  };

  /* Helper Actions */
  const addLog = (msg) => {
    const entry = `[${new Date().toLocaleTimeString('en-US', {hour12:false})}] ${msg}`;
    setSysLogs(prev => [...prev.slice(-49), entry]); // Keep last 50
  };

  const showToast = (msg, type = 'cyan') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev.slice(-1), { id, msg, type }]); // Keep max 2
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 2500);
  };

  const handleQuestComplete = (qId, type = 'daily') => {
    if (type === 'special') {
      setSurprise(prev => ({...prev, completed: true}));
      applyRewards(surprise.xp, surprise.stat, surprise.val);
      showToast(`PROTOCOL CLEARED | +${surprise.xp} PTS`, 'success');
      addLog(`COMPLETED: SPECIAL PROTOCOL`);
      return;
    }

    if (type === 'weekly') {
      setWeeklyQuests(weeklyQuests.map(q => {
        if (q.id === qId && !q.completed) {
          applyRewards(q.xp, q.stat, q.val);
          showToast(`WEEKLY CLEARED | +${q.xp} PTS`, 'success');
          addLog(`COMPLETED: ${q.name}`);
          return { ...q, completed: true };
        }
        return q;
      }));
      return;
    }

    setQuests(quests.map(q => {
      if (q.id === qId && !q.completed) {
        applyRewards(q.xp, q.stat, q.val);
        showToast(`PROTOCOL CLEARED | +${q.xp} PTS`, 'success');
        addLog(`COMPLETED: ${q.name}`);
        return { ...q, completed: true };
      }
      return q;
    }));
  };

  const applyRewards = (xpAmt, statKey, statAmt) => {
    setStats(prev => ({ ...prev, [statKey]: Math.min(100, prev[statKey] + statAmt) }));
    setPlayer(prev => {
      let newXp = prev.totalXP + xpAmt;
      let newLvl = prev.level;
      let reqXp = newLvl * 100;
      
      let leveledUp = false;
      while (newXp >= reqXp) {
        newXp -= reqXp;
        newLvl++;
        reqXp = newLvl * 100;
        leveledUp = true;
      }

      if (leveledUp) {
        const newTitle = getLevelTitle(newLvl);
        setLevelUpData({ level: newLvl, title: newTitle });
        showToast(`LEVEL THRESHOLD BREACHED // LVL ${newLvl}`, 'gold');
        addLog(`LEVEL UP: ${prev.level} -> ${newLvl}`);
        // Base stat boost on level up logic
        setStats(s => {
           let n = {...s};
           Object.keys(n).forEach(k => n[k] = Math.min(100, n[k] + 1));
           return n;
        });
        return { ...prev, level: newLvl, totalXP: newXp, title: newTitle };
      }
      return { ...prev, totalXP: newXp };
    });
  };

  const acceptSurprise = () => {
    setSurprise(prev => ({...prev, accepted: true}));
    setShowSurpriseModal(false);
    addLog("ACCEPTED: SPECIAL PROTOCOL. PENALTY ASSIGNED ON FAILURE.");
  };

  const declineSurprise = () => {
    setPlayer(p => ({ ...p, totalXP: Math.max(0, p.totalXP - 10) }));
    setStats(s => ({ ...s, [surprise.stat]: Math.max(0, s[surprise.stat] - 2) }));
    setShowSurpriseModal(false);
    addLog(`DECLINED: SPECIAL PROTOCOL. PENALTY [-10 XP, -2 ${surprise.stat.toUpperCase()}] APPLIED.`);
    showToast(`PENALTY APPLIED // ${surprise.stat}: -2`, 'danger');
  };

  /* Boot Sequence Effect */
  useEffect(() => {
    if (!booting) return;
    const lines = [
      "> SYSTEM_BOOT SEQUENCE INITIATED...",
      "> HUNTER_DATABASE: CONNECTED",
      "> AUTHENTICATING... ID: " + player.name,
      "> ATTRIBUTE_MATRIX: LOADED",
      "> QUEST_PROTOCOLS: SYNCHRONIZED",
      "> PENALTY_ENGINE: ARMED",
      "> [####################] 100%",
      "> WARNING: THIS SYSTEM OBSERVES ALL ACTIONS.",
      "> ACCESS GRANTED."
    ];
    let fullText = "";
    let activeLine = 0;
    let charIdx = 0;
    
    // Need a stable ref to not recreate interval constantly
    let intId = setInterval(() => {
      if (activeLine >= lines.length) {
        clearInterval(intId);
        setTimeout(() => {
          setBooting(false);
          sessionStorage.setItem('boot_done', 'true');
        }, 600);
        return;
      }
      
      const lineStr = lines[activeLine];
      if (charIdx === 0 && fullText !== "") fullText += "\n";
      
      fullText += lineStr[charIdx];
      setBootText(fullText);
      charIdx++;
      
      if (charIdx >= lineStr.length) {
        activeLine++;
        charIdx = 0;
        clearInterval(intId);
        setTimeout(() => {
          intId = setInterval(typeChar, 35);
        }, 300);
      }
    }, 35);

    const typeChar = () => {
       if (activeLine >= lines.length) {
        clearInterval(intId);
        setTimeout(() => {
          setBooting(false);
          sessionStorage.setItem('boot_done', 'true');
        }, 600);
        return;
      }
      const lineStr = lines[activeLine];
      if (charIdx === 0 && fullText !== "") fullText += "\n";
      fullText += lineStr[charIdx];
      setBootText(fullText);
      charIdx++;
      
      if (charIdx >= lineStr.length) {
        activeLine++;
        charIdx = 0;
        clearInterval(intId);
        setTimeout(() => {
          intId = setInterval(typeChar, 35);
        }, 300);
      }
    }
    
    return () => clearInterval(intId);
  }, [booting, player.name]);

  /* Renderer Helpers */

  const renderBoot = () => (
    <div className="modal-overlay" style={{ background: 'var(--void)', opacity: 1 }}>
      <div style={{ color: 'var(--success)', whiteSpace: 'pre-wrap', lineHeight: 1.6, maxWidth: 600, width: '100%', padding: '20px' }}>
        {bootText}
      </div>
    </div>
  );

  const reqXp = player.level * 100;
  const xpPct = Math.min(100, Math.floor((player.totalXP / reqXp) * 100));

  // --- Animation Variants ---
  const containerVars = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, staggerChildren: 0.1 } }
  };
  const itemVars = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  const renderPenaltyModal = () => (
    <div className="modal-overlay" style={{ background: 'rgba(10, 0, 0, 0.95)', border: '2px solid var(--danger)' }}>
       <div className="sys-panel" style={{ width: 500, padding: 30, textAlign: 'center', borderColor: 'var(--danger)' }}>
          <div style={{ color: 'var(--danger)', fontSize: 14, fontWeight: 'bold', marginBottom: 20, animation: 'glitch 2s infinite' }}>[!] PENALTY_PROTOCOL_ENFORCEMENT [!]</div>
          <div style={{ textAlign: 'left', background: 'rgba(239, 68, 68, 0.1)', padding: 15, borderRadius: 4, maxHeight: 200, overflowY: 'auto', marginBottom: 20 }}>
             {activePenalties.map((p, idx) => (
                <div key={idx} style={{ color: 'var(--danger)', fontSize: 11, marginBottom: 5 }}>{p}</div>
             ))}
          </div>
          <p style={{ fontSize: 13, color: 'var(--grey)', marginBottom: 30 }}>You have failed to fulfill the System's requirements. Direct attribute extraction has been executed. High-tier protocols (RANK / SYS) are locked.</p>
          <button className="sys-btn" style={{ width: '100%', borderColor: 'var(--danger)', color: 'var(--danger)' }} 
            onClick={() => {
              if (window.confirm("REDEMPTION PROTOCOLS: COMPLETE 50 SQUATS/PUSHUPS NOW.\nPress OK ONLY once physical redemption is in progress.")) {
                setActivePenalties([]);
                addLog("REDEMPTION_PROTOCOL: INITIATED. SYSTEM_LIMITS PARTIALLY LIFTED.");
              }
            }}>
            [ACKNOWLEDGE & BEGIN REDEMPTION]
          </button>
       </div>
    </div>
  );

  const renderStatus = () => {
    return (
    <motion.div variants={containerVars} initial="hidden" animate="visible" style={{ padding: '40px 20px', height: '100%', overflowY: 'auto' }}>
      {/* Top Box: HP / MP / Fatigue (from stats.jpg) */}
      <motion.div variants={itemVars} className="sys-panel" style={{ padding: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', border: '1px solid var(--cyan)', boxShadow: 'inset 0 0 10px rgba(0, 229, 255, 0.2)' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: 10, width: '40%' }}>
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} style={{ display: 'flex' }}><Heart size={24} color="var(--cyan)" /></motion.div>
            <div style={{ width: '100%' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 'bold' }}>
                  <span>HP</span>
                  <span>100<span style={{fontSize: 10, color: 'var(--grey)'}}>/100</span></span>
               </div>
               <div style={{ height: 6, background: 'var(--muted)', marginTop: 4, borderRadius: 3, border: '1px solid var(--border-dim)', overflow: 'hidden' }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1, ease: 'easeOut' }} style={{ height: '100%', background: 'var(--cyan)', boxShadow: '0 0 5px var(--cyan)' }} />
               </div>
            </div>
         </div>
         <div style={{ display: 'flex', alignItems: 'center', gap: 10, width: '40%' }}>
            <motion.div animate={{ y: [-2, 2, -2] }} transition={{ duration: 3, repeat: Infinity }} style={{ display: 'flex' }}><FlaskConical size={24} color="var(--cyan)" /></motion.div>
            <div style={{ width: '100%' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 'bold' }}>
                  <span>MP</span>
                  <span>10<span style={{fontSize: 10, color: 'var(--grey)'}}>/10</span></span>
               </div>
               <div style={{ height: 6, background: 'var(--muted)', marginTop: 4, borderRadius: 3, border: '1px solid var(--border-dim)', overflow: 'hidden' }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }} style={{ height: '100%', background: 'var(--cyan)', boxShadow: '0 0 5px var(--cyan)' }} />
               </div>
            </div>
         </div>
         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: 13, fontWeight: 'bold', gap: 4 }}>
            <motion.div animate={{ rotate: [0, -360] }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }} style={{ display: 'flex', alignSelf: 'center', color: 'var(--grey)' }}><Activity size={20} /></motion.div>
            <div style={{color:'var(--grey)'}}>FATIGUE: 0</div>
         </div>
      </motion.div>

      {/* Identity Card Mini */}
      <motion.div variants={itemVars} style={{ textAlign: 'center', marginBottom: 20 }}>
         {isCursed && (
           <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ fontSize: 10, color: 'var(--danger)', fontWeight: 'bold', marginBottom: 5 }}>!! PENALTY_PROTOCOL_ACTIVE !!</motion.div>
         )}
         <div className="font-orbitron text-glow" style={{ fontSize: 28, letterSpacing: 2 }}>{player.name}</div>
         <div style={{ fontSize: 12, color: isCursed ? 'var(--danger)' : 'var(--cyan)', marginBottom: 5 }}>LEVEL {player.level} [ {player.title} ] {isCursed && "(CURSED)"}</div>
      </motion.div>

      {/* Bottom Box: Stats Grid (from stats.jpg) */}
      <motion.div variants={itemVars} className="sys-panel" style={{ padding: '30px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: 25, border: '1px solid var(--cyan)', boxShadow: 'inset 0 0 10px rgba(0, 229, 255, 0.2)', position: 'relative' }}>
        {Object.entries(stats).map(([k, v], idx) => {
          return (
            <motion.div key={k} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + idx * 0.1 }} style={{ display: 'flex', alignItems: 'center', gap: 15, fontSize: 18, fontWeight: 'bold' }}>
               <div style={{ color: 'var(--cyan)', textShadow: '0 0 5px var(--cyan)', display: 'flex' }}><Zap size={16} /></div>
               <div style={{ textTransform: 'uppercase', width: 80 }}>{k.substring(0, 3)}:</div>
               <div className="text-glow">{v}</div>
            </motion.div>
          )
        })}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} style={{ position: 'absolute', bottom: 15, right: 25, fontSize: 12, color: 'var(--white)', textAlign: 'right', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ lineHeight: 1.1, color: 'var(--grey)' }}>TOTAL<br/>SYSTEM<br/>POINTS:</span>
          <span className="font-orbitron text-glow" style={{ fontSize: 28, color: 'var(--cyan)' }}>{player.totalXP}</span>
        </motion.div>
      </motion.div>
    </motion.div>
    );
  };

  const renderQuests = () => {
    const sortedDaily = [...quests].sort((a,b) => {
      if (a.completed === b.completed) return a.id.localeCompare(b.id);
      return a.completed ? 1 : -1;
    });
    const sortedWeekly = [...weeklyQuests].sort((a,b) => {
      if (a.completed === b.completed) return a.id.localeCompare(b.id);
      return a.completed ? 1 : -1;
    });

    return (
      <motion.div variants={containerVars} initial="hidden" animate="visible" style={{ padding: '30px 20px', height: '100%', overflowY: 'auto' }}>
        
        {/* Quest Info Header */}
        <motion.div variants={itemVars} style={{ textAlign: 'center', marginBottom: 20, position: 'relative' }}>
           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 15 }}>
              <div style={{ width: 40, height: 40, border: '2px solid var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, boxShadow: '0 0 10px rgba(255,255,255,0.5)' }}>!</div>
              <div className="font-orbitron" style={{ fontSize: 24, fontWeight: 'bold', border: '2px solid var(--white)', padding: '5px 20px', boxShadow: '0 0 10px rgba(255,255,255,0.5)', letterSpacing: 2 }}>QUEST INFO</div>
              <div style={{ position: 'absolute', right: 0, top: 0, color: 'var(--danger)', fontSize: 18, cursor: 'pointer' }}>✕</div>
           </div>
           
           <div className="text-glow" style={{ fontSize: 15, color: 'var(--cyan)' }}>[SYSTEM PROTOCOLS ONLINE]</div>
        </motion.div>

        <motion.div variants={itemVars} style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--cyan), transparent)', margin: '20px 0', opacity: 0.5 }} />

        <motion.div variants={itemVars} className="font-orbitron" style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', marginBottom: 20, letterSpacing: 2 }}>DAILY GOALS</motion.div>

        {/* Daily Quests List */}
        <div style={{ padding: '0 40px', display: 'flex', flexDirection: 'column', gap: 15, marginBottom: 30 }}>
           {sortedDaily.map((q, idx) => (
             <motion.div key={q.id} custom={idx} variants={itemVars} whileHover={{ x: 5, backgroundColor: 'rgba(0, 229, 255, 0.05)' }} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: q.completed ? 0.4 : 1, padding: '8px 12px', borderRadius: 4, transition: 'background-color 0.2s' }}>
                <div style={{ fontSize: 16, fontWeight: 'bold', textDecoration: q.completed ? 'line-through' : 'none', color: q.completed ? 'var(--grey)' : 'var(--white)' }}>{q.name}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                   <div style={{ fontSize: 14 }}>[{q.completed ? q.val : 0}/{q.val}]</div>
                   <motion.div whileTap={{ scale: 0.8 }} style={{ color: q.completed ? 'var(--cyan)' : 'var(--grey)', cursor: q.completed ? 'default' : 'pointer' }} onClick={() => handleQuestComplete(q.id, 'daily')}>
                      {q.completed ? <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}><CheckSquare size={18} /></motion.div> : <div style={{width: 14, height: 14, border: '1px solid var(--grey)'}} />}
                   </motion.div>
                </div>
             </motion.div>
           ))}
        </div>

        <motion.div variants={itemVars} style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--cyan), transparent)', margin: '20px 0', opacity: 0.5 }} />

        <motion.div variants={itemVars} className="font-orbitron" style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', marginBottom: 20, letterSpacing: 2, color: 'var(--rank-s)' }}>WEEKLY GOALS</motion.div>
        
        {/* Weekly Quests List */}
        <div style={{ padding: '0 40px', display: 'flex', flexDirection: 'column', gap: 15, marginBottom: 40 }}>
           {sortedWeekly.map((q, idx) => (
             <motion.div key={q.id} custom={idx} variants={itemVars} whileHover={{ x: 5, backgroundColor: 'rgba(217, 70, 239, 0.05)' }} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: q.completed ? 0.4 : 1, padding: '8px 12px', borderRadius: 4, transition: 'background-color 0.2s' }}>
                <div style={{ fontSize: 16, fontWeight: 'bold', textDecoration: q.completed ? 'line-through' : 'none', color: q.completed ? 'var(--grey)' : 'var(--rank-s)' }}>{q.name}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                   <div style={{ fontSize: 14 }}>[{q.completed ? q.val : 0}/{q.val}]</div>
                   <motion.div whileTap={{ scale: 0.8 }} style={{ color: q.completed ? 'var(--rank-s)' : 'var(--grey)', cursor: q.completed ? 'default' : 'pointer' }} onClick={() => handleQuestComplete(q.id, 'weekly')}>
                      {q.completed ? <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}><CheckSquare size={18} /></motion.div> : <div style={{width: 14, height: 14, border: '1px solid var(--grey)'}} />}
                   </motion.div>
                </div>
             </motion.div>
           ))}
        </div>

        <motion.div variants={itemVars} style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--cyan), transparent)', margin: '10px 0 20px', opacity: 0.5 }} />
        
        {/* Warning Text */}
        <motion.div variants={itemVars} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} style={{ color: 'var(--danger)', fontSize: 12, textAlign: 'center', padding: '0 20px', textShadow: '0 0 5px rgba(239, 68, 68, 0.5)' }}>
           WARNING: Failure to complete daily quests will result in automated system penalty extraction.
        </motion.div>
      </motion.div>
    );
  };

  const renderRank = () => (
    <motion.div variants={containerVars} initial="hidden" animate="visible" style={{ padding: 20, height: '100%', overflowY: 'auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 }}>
        {ACHIEVEMENTS_DB.map((a, idx) => {
          const unlocked = achievements.includes(a.id);
          return (
            <motion.div key={a.id} variants={itemVars} whileHover={{ scale: unlocked ? 1.02 : 1 }} className="sys-panel sys-panel-angled" style={{ 
              padding: 15, opacity: unlocked ? 1 : 0.6, 
              borderLeft: unlocked ? '3px solid var(--cyan-dim)' : 'none',
              filter: unlocked ? 'drop-shadow(0 0 10px var(--cyan-glow))' : 'grayscale(1)' 
            }}>
              <div className="corner-brackets" />
              <div style={{ color: unlocked ? 'var(--cyan)' : 'var(--grey)', marginBottom: 10 }}><Trophy size={16}/></div>
              <div className="font-orbitron" style={{ fontSize: 12, color: unlocked?'var(--white)':'var(--muted)', marginBottom: 6 }}>
                {unlocked ? a.name : '??? ?????? ??????????'}
              </div>
              {unlocked && <div style={{ fontSize: 10, color: 'var(--grey)', marginBottom: 15 }}>{a.desc}</div>}
              <div style={{ position: 'absolute', bottom: 10, left: 15, fontSize: 9, color: unlocked ? 'var(--success)' : 'var(--danger)' }}>
                STATUS: {unlocked ? '[UNLOCKED]' : '[ENCRYPTED]'}
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  );

  const renderSys = () => (
    <motion.div variants={containerVars} initial="hidden" animate="visible" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 20, height: '100%', overflowY: 'auto' }}>
      
      {/* SYSTEM_LOG */}
      <motion.div variants={itemVars}>
         <div style={{ fontSize: 11, color: 'var(--grey)', marginBottom: 10 }}>[ SYSTEM_LOG ]</div>
         <div className="sys-panel sys-panel-angled" style={{ padding: 15, height: 200, overflowY: 'auto', display: 'flex', flexDirection: 'column-reverse' }}>
           <div className="corner-brackets"/>
           <div style={{ color: 'var(--success)', fontSize: 11, display: 'flex', flexDirection: 'column', gap: 5 }}>
             <AnimatePresence>
               {sysLogs.slice().reverse().map((l, i) => (
                  <motion.div key={l+i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} style={{ marginBottom: 2 }}>{l}</motion.div>
               ))}
             </AnimatePresence>
           </div>
         </div>
      </motion.div>

      {/* CONTROLS */}
      <motion.div variants={itemVars}>
         <div style={{ fontSize: 11, color: 'var(--grey)', marginBottom: 10 }}>[ DEBUG_CONTROLS ]</div>
         <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="sys-btn" onClick={() => { if(window.confirm('RESET QUESTS?')) { localStorage.removeItem(`sl_quests_${getTodayStr()}`); window.location.reload(); } }}>[RESET TODAY'S QUESTS]</motion.button>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="sys-btn" onClick={() => setLevelUpData({level: player.level+1, title: getLevelTitle(player.level+1)})}>[TRIGGER DEMO LEVEL UP]</motion.button>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="sys-btn" onClick={() => triggerSurprise()}>[TRIGGER SURPRISE QUEST]</motion.button>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="sys-btn" style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }} onClick={() => {
              setActivePenalties(["MANUAL_OVERRIDE: PENALTY_PROTOCOL_ENFORCED", "DISCIPLINE EXTRACTED: -5 PTS"]);
              setStats(s => ({ ...s, discipline: Math.max(0, s.discipline - 5) }));
              showToast("PENALTY_PROTOCOL_ENFORCED", "danger");
            }}>[FORCE_PENALTY_PROTOCOL]</motion.button>
         </div>
      </motion.div>
    </motion.div>
  );

  return (
    <>
      <SystemBackground />
      <div className="system-wrapper">
        
        {/* Header Strip */}
        <div style={{ height: 60, borderBottom: '1px solid var(--border-dim)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 30px', fontSize: 13, background: 'rgba(4, 8, 18, 0.4)' }}>
          <span className="font-orbitron text-glow" style={{ color: 'var(--cyan)', fontSize: 16, letterSpacing: 2 }}>SYSTEM_INTERFACE</span>
          <span style={{ color: 'var(--success)', filter: 'drop-shadow(0 0 5px var(--success))' }}>● ONLINE</span>
          <span className="text-glow" style={{ color: 'var(--white)' }}>{currentTime.toLocaleTimeString('en-US', {hour12:false})} <span style={{color:'var(--cyan)', padding: '0 8px'}}>|</span> {getTodayStr()}</span>
        </div>

        {/* Dynamic Content */}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          {activeTab === 'STATUS' && renderStatus()}
          {activeTab === 'QUESTS' && renderQuests()}
          {activeTab === 'RANK' && renderRank()}
          {activeTab === 'SYS' && renderSys()}
        </div>

        {/* Bottom Nav */}
        <div style={{ display: 'flex', height: 70, borderTop: '2px solid var(--border-dim)', background: 'linear-gradient(0deg, rgba(3, 6, 12, 0.9) 0%, transparent 100%)' }}>
          {['STATUS', 'QUESTS', 'RANK', 'SYS'].map((tab, idx) => {
            const isActive = activeTab === tab;
            let Icon = Shield;
            if(tab === 'QUESTS') Icon = ListChecks;
            if(tab === 'RANK') Icon = Trophy;
            if(tab === 'SYS') Icon = Terminal;
            
            return (
              <div 
                key={tab}
                onClick={() => {
                  if (isCursed && (tab === 'RANK' || tab === 'SYS')) {
                    showToast("SYSTEM_LOCKED // PENALTY_PROTOCOL_ACTIVE", "danger");
                    return;
                  }
                  setActiveTab(tab);
                }}
                style={{ 
                   flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                   color: isActive ? 'var(--cyan)' : 'var(--grey)',
                   borderTop: isActive ? '3px solid var(--cyan)' : '3px solid transparent',
                   transition: 'all 0.2s',
                   background: isActive ? 'radial-gradient(ellipse at top, rgba(0, 229, 255, 0.15) 0%, transparent 70%)' : 'transparent',
                   textShadow: isActive ? '0 0 10px var(--cyan)' : 'none',
                   cursor: (isCursed && (tab === 'RANK' || tab === 'SYS')) ? 'not-allowed' : 'pointer',
                   filter: (isCursed && (tab === 'RANK' || tab === 'SYS')) ? 'grayscale(1) brightness(0.5)' : 'none'
                }}
              >
                <Icon size={24} style={{ marginBottom: 6, filter: isActive ? 'drop-shadow(0 0 8px var(--cyan))' : 'none' }}/>
                <span className="font-orbitron" style={{ fontSize: 11, letterSpacing: 1 }}>{tab}</span>
                {(isCursed && (tab === 'RANK' || tab === 'SYS')) && <Lock size={10} style={{ position: 'absolute', top: 5, right: '15%', color: 'var(--danger)' }} />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Overlays */}
      {booting && renderBoot()}
      {isCursed && renderPenaltyModal()}

      {/* Level Up Modal */}
      {levelUpData && (
        <div className="modal-overlay" onClick={() => setLevelUpData(null)}>
           <div className="sys-panel sys-panel-angled" style={{ width: 400, padding: 40, textAlign: 'center', background: 'var(--void)', zIndex: 1010 }}>
              <div className="corner-brackets" style={{ margin: -10 }}/>
              <div style={{ fontSize: 12, color: 'var(--grey)', marginBottom: 20 }}>SYSTEM_NOTIFICATION</div>
              <div style={{ height: 1, background: 'var(--border-dim)', marginBottom: 20 }} />
              
              <div className="font-orbitron" style={{ fontSize: 56, color: 'var(--cyan)', textShadow: '0 0 20px var(--cyan)', lineHeight: 1 }}>LEVEL UP</div>
              
              <div style={{ position: 'relative', height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px 0' }}>
                 <div style={{ position: 'absolute', width: 140, height: 140, border: '2px solid var(--cyan)', opacity: 0.2, animation: 'glitch 4s infinite' }} />
                 <div style={{ position: 'absolute', width: 110, height: 110, border: '2px solid var(--cyan)', opacity: 0.5, animation: 'glitch 3s infinite reverse' }} />
                 <div className="font-orbitron" style={{ fontSize: 80, color: 'var(--white)', zIndex: 2 }}>{levelUpData.level}</div>
              </div>

              <div style={{ fontSize: 14, color: 'var(--grey)', marginBottom: 10 }}>TITLE UPDATED: [{levelUpData.title}]</div>
              <div style={{ fontSize: 12, color: 'var(--cyan)', marginBottom: 30 }}>+[1] across attributes</div>
              <div style={{ height: 1, background: 'var(--border-dim)', marginBottom: 20 }} />
              <button className="sys-btn" style={{ width: '100%' }} onClick={() => setLevelUpData(null)}>[CONTINUE]</button>
           </div>
        </div>
      )}

      {/* Surprise Quest Modal (from Courage of the Weak reference) */}
      {showSurpriseModal && surprise && !surprise.accepted && (
        <div className="modal-overlay" style={{ animation: 'pulseGlow 2s infinite' }}>
           <div style={{ width: 500, padding: 40, background: 'var(--panel)', border: '2px solid rgba(0, 229, 255, 0.4)', boxShadow: '0 0 40px rgba(0, 0, 0, 0.8), inset 0 0 20px rgba(0, 229, 255, 0.1)', position: 'relative', overflow: 'hidden' }}>
              
              {/* Fake ornate corners (since we can't load external vectors easily, CSS circles/borders) */}
              <div style={{ position: 'absolute', top: 5, left: 5, width: 30, height: 30, borderTop: '2px solid var(--cyan)', borderLeft: '2px solid var(--cyan)', borderRadius: '10px 0 0 0' }} />
              <div style={{ position: 'absolute', top: 5, right: 5, width: 30, height: 30, borderTop: '2px solid var(--cyan)', borderRight: '2px solid var(--cyan)', borderRadius: '0 10px 0 0' }} />
              <div style={{ position: 'absolute', bottom: 5, left: 5, width: 30, height: 30, borderBottom: '2px solid var(--cyan)', borderLeft: '2px solid var(--cyan)', borderRadius: '0 0 0 10px' }} />
              <div style={{ position: 'absolute', bottom: 5, right: 5, width: 30, height: 30, borderBottom: '2px solid var(--cyan)', borderRight: '2px solid var(--cyan)', borderRadius: '0 0 10px 0' }} />

              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                 <div style={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid var(--white)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>!</div>
                 <div style={{ fontSize: 22, fontWeight: 'bold', letterSpacing: 1 }}>NOTICE</div>
              </div>

              <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--cyan), transparent)', margin: '0 -20px 30px -20px', opacity: 0.6 }} />
              
              <div style={{ textAlign: 'center', fontSize: 16, lineHeight: 1.6, marginBottom: 40 }}>
                 <div>[THE SYSTEM HAS ISSUED</div>
                 <div>A SPECIAL QUEST:</div>
                 <div style={{ color: '#d946ef', fontWeight: 'bold', textShadow: '0 0 10px rgba(217, 70, 239, 0.5)', marginTop: 5 }}>"{surprise.name}"]</div>
              </div>
              
              <div style={{ color: 'var(--grey)', fontSize: 13, textAlign: 'center', marginBottom: 30 }}>{surprise.desc}</div>
              
              <div style={{ display: 'flex', gap: 15 }}>
                <button className="sys-btn" style={{ flex: 1, borderColor: 'var(--cyan)', color: 'var(--cyan)' }} onClick={acceptSurprise}>[ACCEPT]</button>
                <button className="sys-btn" style={{ flex: 1, borderColor: 'var(--grey)', color: 'var(--grey)' }} onClick={declineSurprise}>[DECLINE]</button>
              </div>
           </div>
        </div>
      )}

      {/* Toast Notifier */}
      <div style={{ position: 'fixed', bottom: 60, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 5000, pointerEvents: 'none' }}>
        {toasts.map(t => (
          <div key={t.id} style={{ 
            width: '85%', maxWidth: 600, background: 'var(--panel)', padding: 12, 
            border: '1px solid var(--border-dim)', borderLeft: `3px solid var(--${t.type})`,
            color: 'var(--white)', fontSize: 11, animation: 'glitch 0.2s',
            boxShadow: `0 0 10px rgba(var(--${t.type}), 0.2)`
          }}>
            {t.msg}
          </div>
        ))}
      </div>
    </>
  );
}
