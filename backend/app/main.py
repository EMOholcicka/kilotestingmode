from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .core import config
from .db import database
from .routers import auth, users, activities, training_plans

import sys
print("sys.path:", sys.path)
print("Loading main.py")

app = FastAPI(title="Strava Clone API", version="0.1.0")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(activities.router, prefix="/activities", tags=["activities"])
app.include_router(training_plans.router, prefix="/training-plans", tags=["training-plans"])

# Startup and shutdown events for DB connection
@app.on_event("startup")
async def startup():
    await database.connect()
    # Create tables (for simplicity; use Alembic in production)
    from .models import Base
    async with database.engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()
