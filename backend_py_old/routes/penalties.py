from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Player, DailyLog, Quest
from datetime import date, timedelta

router = APIRouter()

@router.post("/penalties/apply")
def apply_penalties(db: Session = Depends(get_db)):
    # Run for yesterday's logs if not already applied
    yesterday = date.today() - timedelta(days=1)
    logs = db.query(DailyLog).filter(DailyLog.date == yesterday).all()
    
    if not logs:
        # If no logs exist for yesterday, check if we should have some
        # This usually happens if the user didn't open the app yesterday
        # We'll create them now to apply penalties
        quests = db.query(Quest).filter(Quest.is_active == True).all()
        for q in quests:
            new_log = DailyLog(date=yesterday, quest_id=q.id, completed=False)
            db.add(new_log)
        db.commit()
        logs = db.query(DailyLog).filter(DailyLog.date == yesterday, DailyLog.penalty_applied == False).all()
    else:
        logs = [l for l in logs if not l.penalty_applied]

    player = db.query(Player).first()
    penalty_summary = {"missed": 0, "xp_lost": 0, "stats_lost": {}}
    
    all_completed = True
    for log in logs:
        if not log.completed:
            all_completed = False
            quest = db.query(Quest).filter(Quest.id == log.quest_id).first()
            
            # XP Penalty
            xp_loss = abs(quest.penalty_xp)
            player.total_xp = max(0, player.total_xp - xp_loss)
            penalty_summary["xp_lost"] += xp_loss
            
            # Stat Penalty
            stat_loss = abs(quest.penalty_stat)
            if stat_loss > 0:
                cur_stat = getattr(player, quest.stat_key)
                setattr(player, quest.stat_key, max(1, cur_stat - stat_loss))
                penalty_summary["stats_lost"][quest.stat_key] = penalty_summary["stats_lost"].get(quest.stat_key, 0) + stat_loss
            
            log.penalty_applied = True
            penalty_summary["missed"] += 1
        else:
            log.penalty_applied = True # Marked as processed

    if all_completed and len(logs) > 0:
        player.streak_days += 1
        player.total_xp += 25 # Streak bonus
        penalty_summary["streak_bonus"] = 25
    elif not all_completed:
        player.streak_days = 0

    db.commit()
    return penalty_summary
