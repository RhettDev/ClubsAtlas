# api.py
import logging

from fastapi import FastAPI, HTTPException 
from fastapi.middleware.cors import CORSMiddleware 
from eventScrape import scrape

logger = logging.getLogger(__name__)

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:5173"],allow_methods=["*"], allow_headers=["*"])

@app.get("/scrape")
def scrape_event(url: str, club_id: int):
    try:
        return scrape(url, club_id)  # returns a dict that includes the clubID
    except Exception:
        logger.exception("Failed to scrape event for club_id=%s", club_id)
        raise HTTPException(status_code=422, detail="Couldn't read that page")