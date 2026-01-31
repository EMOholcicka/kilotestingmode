from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from .. import schemas, models
from ..dependencies import get_current_user
from ..db.database import get_db

router = APIRouter()

@router.get("/me", response_model=schemas.UserRead)
async def read_current_user(current_user: models.User = Depends(get_current_user)):
    return current_user
