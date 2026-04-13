from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Player, DailyLog, Quest, Achievement
from ..schemas import Player as PlayerSchema
from datetime import date, datetime

router = APIRouter()

LEVEL_THRESHOLDS = [
    (1, 0, "AWAKENED"),
    (2, 100, "NOVICE"),
    (3, 300, "HUNTER"),
    (4, 600, "STRATEGIST"),
    (5, 1000, "OPERATOR"),
    (6, 1600, "TACTICIAN"),
    (7, 2500, "SHADOW"),
    (8, 4000, "MONARCH"),
]

def check_level_up(player: Player):
    # Determine level based on total_xp
    current_level = player.level
    new_level = current_level
    for lvl, xp, title in LEVEL_THRESHOLDS:
        if player.total_xp >= xp:
            new_level = lvl
    
    if new_level > current_level:
        # All stats +1 bonus per level gained
        diff = new_level - current_level
        player.intelligence += diff
        player.physique += diff
        player.social += diff
        player.tech += diff
        player.finance += diff
        player.discipline += diff
        player.level = new_level
        return True
    return False

@router.post("/log/complete/{quest_id}")
def complete_quest(quest_id: int, db: Session = Depends(get_db)):
    today = date.today()
    log_entry = db.query(DailyLog).filter(DailyLog.date == today, DailyLog.quest_id == quest_id).first()
    if not log_entry:
        raise HTTPException(status_code=404, detail="Log entry not found")
    
    if log_entry.completed:
        return {"message": "Already completed"}

    quest = db.query(Quest).filter(Quest.id == quest_id).first()
    player = db.query(Player).first()

    log_entry.completed = True
    log_entry.completed_at = datetime.now()
    log_entry.xp_earned = quest.xp_reward

    # Update player stats
    player.total_xp += quest.xp_reward
    
    stat_val = getattr(player, quest.stat_key)
    setattr(player, quest.stat_key, min(100, stat_val + quest.stat_gain))
    
    level_up = check_level_up(player)
    
    db.commit()
    db.refresh(player)
    
    return {"message": "Quest completed", "player": player, "level_up": level_up}

@router.post("/log/undo/{quest_id}")
def undo_quest(quest_id: int, db: Session = Depends(get_db)):
    today = date.today()
    log_entry = db.query(DailyLog).filter(DailyLog.date == today, DailyLog.quest_id == quest_id).first()
    if not log_entry or not log_entry.completed:
        raise HTTPException(status_code=400, detail="Cannot undo")

    quest = db.query(Quest).filter(Quest.id == quest_id).first()
    player = db.query(Player).first()

    log_entry.completed = False
    log_entry.completed_at = None
    
    # Revert stats (ensure floor at 0 for XP and 1 for stats)
    player.total_xp = max(0, player.total_xp - quest.xp_reward)
    stat_val = getattr(player, quest.stat_key)
    setattr(player, quest.stat_key, max(1, stat_val - quest.stat_gain))
    
    # Note: We don't downgrade level if XP drops below threshold (standard RPG mechanic)
    
    db.commit()
    return {"message": "Quest completion undone"}
