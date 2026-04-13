# 🌙 Solo Leveling System - Complete Guide

## Overview
This application has been transformed into a **Solo Leveling** themed personal achievement and progression system, starting from level 0 (E-rank, Level 1).

---

## 📊 Core Stats System

All characters start with **10 points** in each stat and begin at **E-rank, Level 1**.

### Five Core Attributes

| Stat | Icon | Description | Increases From |
|------|------|-------------|-----------------|
| **STR** (Strength) | 💪 | Physical power & force | Combat Dungeons |
| **AGI** (Agility) | ⚡ | Speed & reflexes | Agility Dungeons |
| **VIT** (Vitality) | ❤️ | Endurance & resilience | Endurance Dungeons |
| **INT** (Intelligence) | 🧠 | Strategic thinking | Intelligence Dungeons |
| **SEN** (Sense) | 👁️ | Intuition & awareness | Sense Dungeons |

### Health & Mana System

- **HP (Health Points)**: Starts at 100, +10 per level-up, +50 on rank promotion
- **MP (Mana Points)**: Starts at 50, +5 per level-up, +25 on rank promotion
- Both fully restore on rank promotion

---

## 🏆 Rank & Level System

### Rank Progression
```
E-Rank → D-Rank → C-Rank → B-Rank → A-Rank → S-Rank (Awakened)
```

### Level Structure
- **Levels per Rank**: 1-99
- **Level-up Requirements**:
  - E-Rank: 100 XP per level
  - D-Rank: 200 XP per level
  - C-Rank: 400 XP per level
  - B-Rank: 600 XP per level
  - A-Rank: 1,000 XP per level
  - S-Rank: 2,000 XP per level

### Rewards on Level-Up
- All core stats: +1 each
- Max HP: +10
- Max MP: +5
- Free Points: +1

### Rewards on Rank-Up (Every 99 Levels)
- Advance to next rank
- All core stats: +Bonus
- Max HP: +50
- Max MP: +25
- Skill Points: +1
- HP & MP fully restored

---

## 📋 Daily Dungeons System

Complete daily dungeons to gain XP and stat increases. Currently available:

### Available Dungeons (E-Rank)

1. **⚔️ Goblin Dungeon Raid** [Combat]
   - 50 XP | STR+5, AGI+2, VIT+3, INT+1, SEN+1 | HP+10, MP+5

2. **👁️ Cursed Cavern Exploration** [Sense]
   - 45 XP | STR+2, AGI+3, VIT+2, INT+5, SEN+5 | HP+5, MP+10

3. **🛡️ Ritual Dungeon Training** [Endurance]
   - 40 XP | STR+3, AGI+1, VIT+5, INT+2, SEN+1 | HP+15

4. **🧠 Ancient Library Study** [Intelligence]
   - 35 XP | STR+1, AGI+1, VIT+1, INT+8, SEN+2 | MP+15

5. **⚔️ Shadow Gate Guardian Trial** [Combat]
   - 55 XP | STR+6, AGI+4, VIT+2, INT+1, SEN+2 | HP+10, MP+5

6. **❤️ Healing Sanctuary** [Healing]
   - 30 XP | VIT+3, INT+4, SEN+5 | HP+20, MP+20

**Difficulty Ranks Available**: E-Rank (starting), with D, C, B, A, S-rank dungeons unlocking as you progress.

---

## 🎯 Achievements System

Track your progress with themed achievements:

### Rank Progres Achievements
- **E-RANK HUNTER**: Reach E-rank (starting)
- **D-RANK HUNTER**: Reach D-rank
- **C-RANK HUNTER**: Reach C-rank
- **B-RANK HUNTER**: Reach B-rank
- **A-RANK HUNTER**: Reach A-rank
- **S-RANK HUNTER** ⭐: Reach S-rank (Legend)

### Level Achievements
- **NOVICE**: Reach Level 10
- **SKILLED**: Reach Level 50
- **MASTER**: Reach Level 99

### Stat Achievements
- **IRON BODY**: VIT reaches 50
- **SHADOW AGILITY**: AGI reaches 50
- **GODLY STRENGTH**: STR reaches 100

### Quest Achievements
- **FIRST CLEAR**: Complete 1 dungeon
- **DUNGEON SLAYER**: Complete 50 dungeons
- **GATE KEEPER**: Complete 250 dungeons

### Streak Achievements
- **CONSISTENT HUNTER**: 7-day streak
- **DEDICATED HUNTER**: 30-day streak

### Skill Achievements
- **BLADE MASTERY**: Unlock Power Strike
- **MANA AWAKENING**: Unlock Berserk

---

## 🔥 Progression Mechanics

### XP Gain
- Gain XP from completing dungeons
- Different dungeons award different XP amounts
- Accumulate XP within your current rank

### Stat Allocation
- **Free Points**: Earned on level-up (can distribute manually)
- **Skill Points**: Earned on rank promotion (for skill unlocking)

### Streaks
- Complete dungeons daily to build your streak
- Streaks are tracked and rewarded with achievements

---

## ⚔️ Skills & Abilities (Locked Until Rank-Up)

Skills unlock as you progress through ranks:

### E-Rank Skills
- **Slash** - Basic attack (unlocked at start)

### D-Rank Skills (Unlocked when reaching D-Rank)
- **Power Strike** - Execute a powerful slash
- **Shadow Step** - Increase AGI temporarily

### C-Rank Skills
- **Mana Heart** - Passive MP regeneration
- **Blessing** - Heal and buff allies

### B-Rank Skills
- **Aura Blade** - Channel mana into weapon

### A-Rank Skills
- **Ruler's Authority** - Dominate the battlefield

### S-Rank Skills
- Exclusive awakened abilities

---

## 🎮 UI Components

### Status Panel
Displays your current rank, level, XP progress, HP/MP, and all five core stats with visual progress bars.

### Daily Dungeons Panel
Lists all available dungeons for the day with difficulty ranks, categories, XP rewards, and stat gains.

### Level-Up Overlay
Dragon-themed visual notification when you level up or get promoted to a new rank with stat bonuses displayed.

### Achievement Tracker
Displays unlocked achievements with rarity levels (Common, Uncommon, Rare, Legendary).

---

## 🔄 Starting Fresh

The system begins with:
- **Player**: Sung Jinwoo
- **Rank**: E
- **Level**: 1
- **Total XP**: 0
- **All Stats**: 10
- **HP**: 100/100
- **MP**: 50/50

---

## 📈 Long-Term Progression Goals

1. **Reach D-Rank**: Unlock new dungeons and D-rank skills
2. **Reach C-Rank**: Access C-rank dungeons and support skills
3. **Reach B-Rank**: Unlock powerful active abilities
4. **Reach A-Rank**: Master-level hunter status
5. **Reach S-Rank**: Become an awakened hunter (endgame)

---

## 🛠️ Backend Architecture

### Key Models
- **Player**: Ranks, levels, stats, HP/MP, progression
- **Quest**: Dungeons with rewards and difficulty ranks
- **Skill**: Abilities with unlock conditions
- **Achievement**: Progress milestones
- **DailyLog**: Track completed dungeons
- **ShadowDungeon**: Alternative dungeon runs

### API Endpoints
- `GET /player` - Get current player stats
- `GET /quests` - Get available dungeons
- `GET /log/today` - Get today's completed dungeons
- `POST /log/complete/:quest_id` - Complete a dungeon
- `POST /log/undo/:quest_id` - Undo dungeon completion

---

## 🌟 Customization & Future Features

- **Free Points Distribution**: Manually allocate stat points to specific stats
- **Skill Tree**: Unlock and upgrade skills with skill points
- **Boss Battles**: Special elite dungeons with boss encounters
- **Prestige System**: Reset progression for hardcore mode
- **Dungeons Rotation**: Special weekly/monthly limited dungeons
- **PvP Rankings**: Compare ranks with other hunters

---

## 📝 Notes

- All data starts from zero in the fresh Solo Leveling system
- The application is themed around the popular manhwa "Solo Leveling"
- Progress is persistent and stored in SQLite
- Daily dungeons reset each day to maintain streaks and consistency
- The system rewards consistent daily play with increasing difficulty

---

**Last Updated**: April 13, 2026
**System Version**: 1.0.0 - Solo Leveling Awakening
