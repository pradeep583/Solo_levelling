# Solo Leveling UI Components - Implementation Guide

## Overview
Three authentic UI components recreating the Solo Leveling anime system design with precise neon cyan/blue glow effects and cyberpunk aesthetic.

---

## 1. SystemNotification Component

### Purpose
Display system-wide notifications (level-up, quest completion, rank change, etc.)

### Usage
```jsx
import SystemNotification from './components/SystemNotification';

<SystemNotification 
  title="LEVEL UP!"
  message="You have reached Level 25! Your status has increased."
  type="info"
  action={{
    label: 'CLAIM REWARD',
    onClick: () => handleReward()
  }}
  onClose={() => setShowNotification(false)}
/>
```

### Props
- `title` (string) - Header text (e.g., "NOTIFICATION")
- `message` (string) - Main notification text
- `type` (string) - Type of notification: 'info' (default), 'success', 'warning'
- `action` (object) - Optional action button
  - `label` (string) - Button text
  - `onClick` (function) - Button click handler
- `onClose` (function) - Close handler

### Features
- Animated glow effect
- Scan line effect overlay
- Pulsing icon
- Border frame effect
- Positioned center screen
- Auto-closes via button

---

## 2. QuestPanelInfo Component

### Purpose
Display detailed quest information including goal, rewards, stats, and countdown timer

### Usage
```jsx
import QuestPanelInfo from './components/QuestPanelInfo';

<QuestPanelInfo
  quest={{
    name: 'Goblin Dungeon',
    description: 'Clear the Dumpy Goblin Dungeon',
    goal: 'Defeat all Goblin spawns (8/8)',
    rewards: [
      { label: 'EXP', value: 2500 },
      { label: 'Gold', value: 15000 },
      { label: 'Items', value: 3 }
    ],
    stats: [
      { name: 'STR', current: 18, boost: 2 },
      { name: 'AGI', current: 12, boost: 1 }
    ]
  }}
  timeRemaining={3600}
  onClose={() => setShowQuest(false)}
/>
```

### Props
- `quest` (object) - Quest data
  - `name` (string) - Quest title
  - `description` (string) - Quest description
  - `goal` (string) - Quest objective
  - `rewards` (array) - Reward items
  - `stats` (array) - Stat bonuses
- `timeRemaining` (number) - Countdown seconds (optional)
- `onClose` (function) - Close handler

### Features
- Animated timer (HH:MM:SS format)
- Reward grid layout
- Stat boost indicators
- Glow effect borders
- Positioned center screen
- Auto-updating countdown

---

## 3. StatusPanel Component

### Purpose
Display player status in a compact side panel (HP, MP, attributes, etc.)

### Usage
```jsx
import StatusPanel from './components/StatusPanel';

<StatusPanel
  player={{
    rank: 'E',
    level_in_rank: 24,
    total_xp: 4850,
    current_hp: 85,
    max_hp: 100,
    current_mp: 62,
    max_mp: 65,
    strength: 18,
    agility: 12,
    vitality: 15,
    intelligence: 22,
    sense: 14,
    total_quests_completed: 47
  }}
  onClose={() => setShowStatus(false)}
/>
```

### Props
- `player` (object) - Player stats
- `onClose` (function) - Close handler

### Features
- Status grid (rank, level, exp, hp, mp, quests)
- Attribute bars (STR, AGI, VIT, INT, SEN)
- Hover effects
- Positioned bottom-right
- Animated enter
- Compact design

---

## Design Elements (All Components)

### Colors Used
- **Primary Cyan**: `#00d4ff` (Main glow)
- **Secondary Cyan**: `#00ffff` (Highlights)
- **Blue**: `#1e90ff` (Secondary accent)
- **Dark Background**: `rgba(5, 20, 40, 0.95)` to `rgba(10, 25, 50, 0.95)`

### Glow Effects
- Multiple layered borders with decreasing opacity
- Animated pulse effects
- Text shadows for neon appearance
- Box shadows for depth

### Typography
- Font: 'JetBrains Mono' for monospace (timers)
- Text shadow: Cyan glow on primary text
- Letter spacing: 1-2.5px for headers
- Font weight: 900 for titles, 800 for values

### Borders & Frames
- 2px solid borders with rgba colors
- Corner frame effects (gradients)
- Scan line overlay using repeating-linear-gradient
- Rounded corners (8px)

---

## Integration Steps

### 1. Add to your component
```jsx
import { useState } from 'react';
import SystemNotification from './components/SystemNotification';

export default function MyComponent() {
  const [showNotif, setShowNotif] = useState(false);

  return (
    <>
      <button onClick={() => setShowNotif(true)}>Show Notification</button>
      {showNotif && (
        <SystemNotification
          title="TEST"
          message="This is a test notification"
          onClose={() => setShowNotif(false)}
        />
      )}
    </>
  );
}
```

### 2. Trigger notifications on events
```jsx
// On quest complete
onQuestComplete = () => {
  setShowNotification({
    title: 'QUEST COMPLETE',
    message: `You completed: ${quest.name}`,
    action: { label: 'CLAIM', onClick: claimRewards }
  });
};

// On level up
onLevelUp = () => {
  setShowNotification({
    title: 'LEVEL UP',
    message: `You are now Level ${player.level_in_rank}!`,
    action: { label: 'CONTINUE', onClick: continueGame }
  });
};
```

---

## Customization

### Change Colors
Edit the CSS files and replace:
- `#00d4ff` → Your cyan color
- `#1e90ff` → Your blue color
- `rgba(5, 20, 40, 0.95)` → Your dark background

### Adjust Animation Speed
Edit animation durations:
```css
/* In .css files */
animation: glow-pulse 2s ease-in-out infinite; /* Change 2s */
transition: all 0.3s; /* Change 0.3s */
```

### Position Changes
For StatusPanel bottom-right position:
```css
.status-panel {
  bottom: 40px;  /* Adjust vertical position */
  right: 40px;   /* Adjust horizontal position */
}
```

---

## Browser Support
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (may need vendor prefixes for older versions)

---

## Performance Notes
- Uses CSS animations (GPU accelerated)
- Framer Motion for enter/exit animations
- Minimal re-renders with proper state management
- Backdrop filter blur may impact performance on low-end devices

---

## Files Included
1. `SystemNotification.jsx` - Component
2. `SystemNotification.css` - Styles
3. `QuestPanelInfo.jsx` - Component
4. `QuestPanelInfo.css` - Styles
5. `StatusPanel.jsx` - Component
6. `StatusPanel.css` - Styles
7. `UIDemo.jsx` - Example usage

---

## Example: Complete Integration

```jsx
import { useState } from 'react';
import SystemNotification from './components/SystemNotification';
import QuestPanelInfo from './components/QuestPanelInfo';
import StatusPanel from './components/StatusPanel';

export default function Dashboard({ player, quests }) {
  const [notification, setNotification] = useState(null);
  const [questDetail, setQuestDetail] = useState(null);

  const handleQuestComplete = (quest) => {
    setNotification({
      title: 'QUEST COMPLETE',
      message: `${quest.name} completed! +${quest.experience} EXP`,
      action: {
        label: 'NEXT',
        onClick: () => setNotification(null)
      }
    });
  };

  return (
    <>
      {notification && (
        <SystemNotification
          title={notification.title}
          message={notification.message}
          action={notification.action}
          onClose={() => setNotification(null)}
        />
      )}

      {questDetail && (
        <QuestPanelInfo
          quest={questDetail}
          onClose={() => setQuestDetail(null)}
        />
      )}

      <StatusPanel player={player} />

      <button onClick={() => setQuestDetail(quests[0])}>
        View Quest Details
      </button>
    </>
  );
}
```

---

## Need Help?
Refer to the UIDemo.jsx file for complete working examples of all three components.
