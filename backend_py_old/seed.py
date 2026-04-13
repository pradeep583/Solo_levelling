from .database import SessionLocal, engine, Base
from .models import Quest, Player, Achievement, CategoryEnum, ConditionTypeEnum
from datetime import date

def seed_data():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    # Check if player exists
    if not db.query(Player).first():
        player = Player(
            name="Pradeep",
            total_xp=600,
            level=4,
            intelligence=62,
            physique=45,
            social=55,
            tech=58,
            finance=30,
            discipline=50,
            streak_days=0
        )
        db.add(player)
    
    # Check if quests exist
    if not db.query(Quest).first():
        quests = [
            Quest(name="Complete workout session", category=CategoryEnum.body, xp_reward=20, stat_key="physique", stat_gain=2, penalty_xp=-10, penalty_stat=-1, order_index=1),
            Quest(name="Hit 120g protein target", category=CategoryEnum.body, xp_reward=15, stat_key="physique", stat_gain=1, penalty_xp=-8, penalty_stat=-1, order_index=2),
            Quest(name="Read Finshots — extract 1 insight", category=CategoryEnum.finance, xp_reward=10, stat_key="finance", stat_gain=1, penalty_xp=-5, penalty_stat=0, order_index=3),
            Quest(name="1hr deep work — DSA / portfolio", category=CategoryEnum.tech, xp_reward=25, stat_key="tech", stat_gain=2, penalty_xp=-15, penalty_stat=-1, order_index=4),
            Quest(name="Write 3 social observations", category=CategoryEnum.social, xp_reward=15, stat_key="social", stat_gain=1, penalty_xp=-8, penalty_stat=0, order_index=5),
            Quest(name="10min morning silence / meditation", category=CategoryEnum.mind, xp_reward=10, stat_key="discipline", stat_gain=1, penalty_xp=-5, penalty_stat=0, order_index=6),
            Quest(name="15min reading — strategy/psychology", category=CategoryEnum.mind, xp_reward=10, stat_key="intelligence", stat_gain=1, penalty_xp=-5, penalty_stat=0, order_index=7),
            Quest(name="Log one expense", category=CategoryEnum.finance, xp_reward=5, stat_key="finance", stat_gain=1, penalty_xp=-3, penalty_stat=0, order_index=8),
            Quest(name="Content — script, edit, or post", category=CategoryEnum.create, xp_reward=15, stat_key="social", stat_gain=1, penalty_xp=-8, penalty_stat=0, order_index=9),
        ]
        db.add_all(quests)

    # Achievements
    if not db.query(Achievement).first():
        achievements = [
            Achievement(name="FIRST BLOOD", description="Complete your first quest", icon="⚔️", condition_type=ConditionTypeEnum.quests_completed, condition_value=1),
            Achievement(name="CONSISTENT", description="7-day streak", icon="🔥", condition_type=ConditionTypeEnum.streak, condition_value=7),
            Achievement(name="IRON WILL", description="30-day streak", icon="🛡️", condition_type=ConditionTypeEnum.streak, condition_value=30),
            Achievement(name="SHADOW WALKER", description="Reach LV.7", icon="👥", condition_type=ConditionTypeEnum.level, condition_value=7),
            Achievement(name="MONARCH", description="Reach LV.8", icon="👑", condition_type=ConditionTypeEnum.level, condition_value=8),
            Achievement(name="BODY OF STEEL", description="Physique reaches 80", icon="🦾", condition_type=ConditionTypeEnum.stat, condition_value=80),
            Achievement(name="MIND PALACE", description="Intelligence reaches 80", icon="🧠", condition_type=ConditionTypeEnum.stat, condition_value=80),
            Achievement(name="GHOST PROTOCOL", description="Complete all 9 quests in a single day (3x)", icon="👻", condition_type=ConditionTypeEnum.quests_completed, condition_value=27), # approx
        ]
        db.add_all(achievements)

    db.commit()
    db.close()

if __name__ == "__main__":
    seed_data()
