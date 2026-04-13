from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Quest, DailyLog
from ..schemas import Quest as QuestSchema, DailyLog as DailyLogSchema
from datetime import date
from typing import List

router = APIRouter()

@router.get("/quests", response_model=List[QuestSchema])
def get_quests(db: Session = Depends(get_db)):
    return db.query(Quest).filter(Quest.is_active == True).order_by(Quest.order_index).all()

@router.get("/log/today", response_model=List[DailyLogSchema])
def get_today_log(db: Session = Depends(get_db)):
    today = date.today()
    return db.query(DailyLog).filter(DailyLog.date == today).all()
