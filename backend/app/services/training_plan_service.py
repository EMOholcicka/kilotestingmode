from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models import TrainingPlan
from app.schemas import TrainingPlanCreate

async def get_training_plans(db: AsyncSession, user_id: int):
    query = select(TrainingPlan).where(TrainingPlan.user_id == user_id)
    result = await db.execute(query)
    return result.scalars().all()

async def get_training_plan_by_week(db: AsyncSession, week: int, user_id: int):
    query = select(TrainingPlan).where(TrainingPlan.week == week, TrainingPlan.user_id == user_id)
    result = await db.execute(query)
    return result.scalar_one_or_none()

async def create_training_plan(db: AsyncSession, plan: TrainingPlanCreate, user_id: int):
    db_plan = TrainingPlan(**plan.dict(), user_id=user_id)
    db.add(db_plan)
    await db.commit()
    await db.refresh(db_plan)
    return db_plan