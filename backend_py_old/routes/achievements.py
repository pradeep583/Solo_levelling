from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Achievement
from ..schemas import Achievement as AchievementSchema
from typing import List

router = APIRouter()

@router.get("/achievements", response_model=List[AchievementSchema])
def get_achievements(db: Session = Depends(get_db)):
    return db.query(Achievement).all()
