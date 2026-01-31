import asyncio
from app.db.database import engine, AsyncSessionLocal
from app import models
from app.core.security import get_password_hash

async def seed():
    async with engine.begin() as conn:
        # Ensure tables are created (in case not yet)
        await conn.run_sync(models.Base.metadata.create_all)
    async with AsyncSessionLocal() as session:
        # Create a sample user
        user = models.User(email="test@example.com", hashed_password=get_password_hash("password"))
        session.add(user)
        await session.commit()
        await session.refresh(user)
        # Sample activity
        activity = models.Activity(
            user_id=user.id,
            type="run",
            distance=5.0,
            duration=1800,
            elevation_gain=50.0,
        )
        session.add(activity)
        # Sample training plan
        plan = models.TrainingPlan(user_id=user.id, name="Beginner Plan", weeks=4)
        session.add(plan)
        await session.commit()
        await session.refresh(plan)
        # Sample training day
        day = models.TrainingDay(plan_id=plan.id, day_of_week=0)
        session.add(day)
        await session.commit()
        await session.refresh(day)
        # Sample workout
        workout = models.PlannedWorkout(day_id=day.id, type="run", target_distance=5.0, target_duration=1800)
        session.add(workout)
        await session.commit()

if __name__ == "__main__":
    asyncio.run(seed())
