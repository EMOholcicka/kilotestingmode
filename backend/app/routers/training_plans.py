from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from .. import schemas
from ..dependencies import get_current_user
from ..db.database import get_db
from ..models import User
from ..services.training_plan_service import get_training_plans, create_training_plan, get_training_plan_by_week

router = APIRouter()

@router.get("/", response_model=list[schemas.TrainingPlanRead])
async def list_training_plans(current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    return await get_training_plans(db, current_user.id)

@router.post("/", response_model=schemas.TrainingPlanRead, status_code=status.HTTP_201_CREATED)
async def create_training_plan_route(plan: schemas.TrainingPlanCreate, current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    return await create_training_plan(db, plan, current_user.id)

@router.get("/{week}", response_model=schemas.TrainingPlanRead)
async def get_training_plan(week: int, current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    plan = await get_training_plan_by_week(db, week, current_user.id)
    if not plan:
        raise HTTPException(status_code=404, detail="Training plan not found")
    return plan
