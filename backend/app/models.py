from sqlalchemy import Column, Integer, String, Boolean, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from .db.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True)
    hashed_password = Column(String(128))
    is_active = Column(Boolean, default=True)

    activities = relationship("Activity", back_populates="owner")
    training_plans = relationship("TrainingPlan", back_populates="owner")

class Activity(Base):
    __tablename__ = "activities"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(String(50))
    distance = Column(Float)
    duration = Column(Integer)
    elevation_gain = Column(Float, nullable=True)
    start_time = Column(DateTime, nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="activities")

class TrainingPlan(Base):
    __tablename__ = "training_plans"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    weeks = Column(Integer)
    user_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="training_plans")
    training_days = relationship("TrainingDay", back_populates="plan")

class TrainingDay(Base):
    __tablename__ = "training_days"

    id = Column(Integer, primary_key=True, index=True)
    plan_id = Column(Integer, ForeignKey("training_plans.id"))
    day_of_week = Column(Integer)

    plan = relationship("TrainingPlan", back_populates="training_days")
    workouts = relationship("PlannedWorkout", back_populates="day")

class PlannedWorkout(Base):
    __tablename__ = "planned_workouts"

    id = Column(Integer, primary_key=True, index=True)
    day_id = Column(Integer, ForeignKey("training_days.id"))
    type = Column(String(50))
    target_distance = Column(Float, nullable=True)
    target_duration = Column(Integer, nullable=True)

    day = relationship("TrainingDay", back_populates="workouts")