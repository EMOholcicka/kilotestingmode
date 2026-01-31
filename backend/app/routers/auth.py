from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from .. import schemas, models
from ..db.database import get_db
from ..core.security import get_password_hash, verify_password, create_access_token
from ..services.user_service import create_user, get_user_by_email
import logging

logging.basicConfig(level=logging.DEBUG)

router = APIRouter()

@router.post("/register", response_model=schemas.UserRead, status_code=status.HTTP_201_CREATED)
async def register(user: schemas.UserCreate, db: AsyncSession = Depends(get_db)):
    existing_user = await get_user_by_email(db, user.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    db_user = await create_user(db, user)
    return db_user

@router.post("/login", response_model=schemas.Token)
async def login(form_data: schemas.UserCreate, db: AsyncSession = Depends(get_db)):
    logging.debug(f"Login attempt for email: {form_data.email}")
    user = await get_user_by_email(db, form_data.email)
    if not user:
        logging.debug("User not found")
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    if not verify_password(form_data.password, user.hashed_password):
        logging.debug("Password verification failed")
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    access_token = create_access_token(data={"sub": str(user.id)})
    return {"access_token": access_token, "token_type": "bearer"}
