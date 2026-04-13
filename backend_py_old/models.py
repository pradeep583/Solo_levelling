from sqlalchemy import Column, Integer, String, Boolean, Date, DateTime, Enum, ForeignKey, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
from .database import Base

class CategoryEnum(str, enum.Enum):
    body = "body"
    mind = "mind"
    tech = "tech"
    finance = "finance"
    social = "social"
    create = "create"

class ConditionTypeEnum(str, enum.Enum):
    level = "level"
    streak = "streak"
    stat = "stat"
    quests_completed = "quests_completed"

class Player(Base):
    __tablename__ = "player"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, default="Pradeep")
    total_xp = Column(Integer, default=600)
    level = Column(Integer, default=4)
    
    # Stats
    intelligence = Column(Integer, default=62)
    physique = Column(Integer, default=45)
    social = Column(Integer, default=55)
    tech = Column(Integer, default=58)
    finance = Column(Integer, default=30)
    discipline = Column(Integer, default=50)
    
    streak_days = Column(Integer, default=0)
    last_active_date = Column(Date, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class PlayerSettings(Base):
    __tablename__ = "player_settings"
    id = Column(Integer, primary_key=True, index=True)
    player_id = Column(Integer, ForeignKey("player.id"))
    night_time = Column(String, default="21:00")
    penalty_enabled = Column(Boolean, default=True)

class StatSnapshot(Base):
    __tablename__ = "stat_snapshots"
    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, index=True)
    player_id = Column(Integer, ForeignKey("player.id"))
    intelligence = Column(Integer, default=0)
    physique = Column(Integer, default=0)
    social = Column(Integer, default=0)
    tech = Column(Integer, default=0)
    finance = Column(Integer, default=0)
    discipline = Column(Integer, default=0)

class Quest(Base):
    __tablename__ = "quests"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String, nullable=True)
    category = Column(Enum(CategoryEnum))
    xp_reward = Column(Integer)
    stat_key = Column(String) # e.g., 'physique'
    stat_gain = Column(Integer)
    penalty_xp = Column(Integer)
    penalty_stat = Column(Integer)
    is_active = Column(Boolean, default=True)
    is_weekly = Column(Boolean, default=False)
    order_index = Column(Integer, default=0)

class DailyLog(Base):
    __tablename__ = "daily_logs"
    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, index=True)
    quest_id = Column(Integer, ForeignKey("quests.id"))
    completed = Column(Boolean, default=False)
    completed_at = Column(DateTime(timezone=True), nullable=True)
    xp_earned = Column(Integer, default=0)
    penalty_applied = Column(Boolean, default=False)
    
    quest = relationship("Quest")

class Achievement(Base):
    __tablename__ = "achievements"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)
    icon = Column(String)
    unlocked_at = Column(DateTime(timezone=True), nullable=True)
    condition_type = Column(Enum(ConditionTypeEnum))
    condition_value = Column(Integer)

class BossProgress(Base):
    __tablename__ = "boss_progress"
    id = Column(Integer, primary_key=True, index=True)
    boss_id = Column(Integer, index=True)
    current_steps = Column(Integer, default=0)

class PenaltyReport(Base):
    __tablename__ = "penalty_reports"
    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, index=True)
    missed_count = Column(Integer, default=0)
    xp_lost = Column(Integer, default=0)
    applied_at = Column(DateTime(timezone=True), server_default=func.now())
