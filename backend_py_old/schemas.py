from pydantic import BaseModel
from datetime import date, datetime
from typing import List, Optional
from .models import CategoryEnum, ConditionTypeEnum

class PlayerBase(BaseModel):
    name: str
    total_xp: int
    level: int
    intelligence: int
    physique: int
    social: int
    tech: int
    finance: int
    discipline: int
    streak_days: int
    last_active_date: Optional[date]

class Player(PlayerBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class QuestBase(BaseModel):
    name: str
    description: Optional[str]
    category: CategoryEnum
    xp_reward: int
    stat_key: str
    stat_gain: int
    penalty_xp: int
    penalty_stat: int
    is_active: bool
    order_index: int

class Quest(QuestBase):
    id: int

    class Config:
        from_attributes = True

class DailyLogBase(BaseModel):
    date: date
    quest_id: int
    completed: bool
    completed_at: Optional[datetime]
    xp_earned: int
    penalty_applied: bool

class DailyLog(DailyLogBase):
    id: int
    quest: Optional[Quest]

    class Config:
        from_attributes = True

class AchievementBase(BaseModel):
    name: str
    description: str
    icon: str
    unlocked_at: Optional[datetime]
    condition_type: ConditionTypeEnum
    condition_value: int

class Achievement(AchievementBase):
    id: int

    class Config:
        from_attributes = True

class StatHistoryItem(BaseModel):
    date: date
    value: int

class StatHistory(BaseModel):
    stat_key: str
    history: List[StatHistoryItem]
