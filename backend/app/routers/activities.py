from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from .. import schemas
from ..dependencies import get_current_user
from ..db.database import get_db
from ..models import User
from ..services.activity_service import get_activities, create_activity, get_activity, update_activity, delete_activity

router = APIRouter()

@router.get("/", response_model=list[schemas.ActivityRead])
async def list_activities(current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    return await get_activities(db, current_user.id)

@router.post("/", response_model=schemas.ActivityRead, status_code=status.HTTP_201_CREATED)
async def create_activity_route(activity: schemas.ActivityCreate, current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    return await create_activity(db, activity, current_user.id)

@router.get("/{activity_id}", response_model=schemas.ActivityRead)
async def get_activity_route(activity_id: int, current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    activity = await get_activity(db, activity_id, current_user.id)
    if not activity:
        raise HTTPException(status_code=404, detail="Activity not found")
    return activity

@router.put("/{activity_id}", response_model=schemas.ActivityRead)
async def update_activity_route(activity_id: int, activity: schemas.ActivityUpdate, current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    updated = await update_activity(db, activity_id, activity, current_user.id)
    if not updated:
        raise HTTPException(status_code=404, detail="Activity not found")
    return updated

@router.delete("/{activity_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_activity_route(activity_id: int, current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    deleted = await delete_activity(db, activity_id, current_user.id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Activity not found")
    return
