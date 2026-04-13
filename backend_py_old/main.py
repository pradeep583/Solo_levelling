from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routes import player, quests, log, penalties, achievements
from .seed import seed_data
from .scheduler import scheduler
import uvicorn

app = FastAPI(title="Solo Leveling API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Seed on startup
@app.on_event("startup")
def startup_event():
    Base.metadata.create_all(bind=engine)
    seed_data()
    # scheduler.start() # Temporarily disabled to avoid issues in dev

app.include_router(player.router, prefix="/api", tags=["player"])
app.include_router(quests.router, prefix="/api", tags=["quests"])
app.include_router(log.router, prefix="/api", tags=["log"])
app.include_router(penalties.router, prefix="/api", tags=["penalties"])
app.include_router(achievements.router, prefix="/api", tags=["achievements"])

@app.get("/")
def read_root():
    return {"status": "ARISE"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
