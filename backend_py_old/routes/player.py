from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Player, DailyLog, Quest
from ..schemas import Player as PlayerSchema
from datetime import date

router = APIRouter()

@router.get("/player", response_model=PlayerSchema)
def get_player(db: Session = Depends(get_db)):
    player = db.query(Player).first()
    if not player:
        raise HTTPException(status_code=404, detail="Player not found")
    
    # Check if we need to create logs for today
    today = date.today()
    existing_logs = db.query(DailyLog).filter(DailyLog.date == today).all()
    if not existing_logs:
        quests = db.query(Quest).filter(Quest.is_active == True).all()
        for q in quests:
            new_log = DailyLog(date=today, quest_id=q.id, completed=False)
            db.add(new_log)
        db.commit()
        db.refresh(player)

    return player
