from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models import Activity
from app.schemas import ActivityCreate, ActivityUpdate
from app.dependencies import get_current_user

async def get_activities(db: AsyncSession, user_id: int):
    query = select(Activity).where(Activity.user_id == user_id)
    result = await db.execute(query)
    return result.scalars().all()

async def get_activity(db: AsyncSession, activity_id: int, user_id: int):
    query = select(Activity).where(Activity.id == activity_id, Activity.user_id == user_id)
    result = await db.execute(query)
    return result.scalar_one_or_none()

async def create_activity(db: AsyncSession, activity: ActivityCreate, user_id: int):
    db_activity = Activity(**activity.dict(), user_id=user_id)
    db.add(db_activity)
    await db.commit()
    await db.refresh(db_activity)
    return db_activity

async def update_activity(db: AsyncSession, activity_id: int, activity_update: ActivityUpdate, user_id: int):
    activity = await get_activity(db, activity_id, user_id)
    if not activity:
        return None
    update_data = activity_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(activity, key, value)
    await db.commit()
    await db.refresh(activity)
    return activity

async def delete_activity(db: AsyncSession, activity_id: int, user_id: int):
    activity = await get_activity(db, activity_id, user_id)
    if not activity:
        return None
    await db.delete(activity)
    await db.commit()
    return activity