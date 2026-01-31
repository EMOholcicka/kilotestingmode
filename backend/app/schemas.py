from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import List, Optional

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenData(BaseModel):
    user_id: Optional[int] = None

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str = Field(..., min_length=6)

class UserRead(UserBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True

class ActivityBase(BaseModel):
    type: str
    distance: float
    duration: int
    elevation_gain: Optional[float] = None
    start_time: Optional[datetime] = None

class ActivityCreate(ActivityBase):
    pass

class ActivityRead(ActivityBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True

# Training plan schemas
class TrainingPlanBase(BaseModel):
    name: str
    weeks: int

class TrainingPlanCreate(TrainingPlanBase):
    pass

class TrainingPlanRead(TrainingPlanBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True

class ActivityUpdate(BaseModel):
    type: Optional[str] = None
    distance: Optional[float] = None
    duration: Optional[int] = None
    elevation_gain: Optional[float] = None
    start_time: Optional[datetime] = None
