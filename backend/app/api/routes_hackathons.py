from typing import Any, Dict, List

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from bson import ObjectId

from app.api.deps import get_current_user, role_required
from app.db.mongo import get_db


router = APIRouter()


class HackathonCreate(BaseModel):
    title: str
    date: str
    description: str
    rules: str


@router.get("/")
async def list_hackathons() -> List[Dict[str, Any]]:
    db = get_db()
    cursor = db.hackathons.find({}).sort("_id", -1)
    return [
        {"id": str(doc["_id"]), "title": doc["title"], "date": doc["date"], "description": doc["description"]}
        async for doc in cursor
    ]


@router.post("/", dependencies=[Depends(role_required("College", "Admin"))])
async def create_hackathon(payload: HackathonCreate, user=Depends(get_current_user)) -> Dict[str, Any]:
    db = get_db()
    doc = payload.model_dump()
    doc.update({"creator_id": user["sub"], "creator_role": user["role"]})
    res = await db.hackathons.insert_one(doc)
    return {"id": str(res.inserted_id)}


@router.post("/{hackathon_id}/register", dependencies=[Depends(role_required("Student", "Admin"))])
async def register_hackathon(hackathon_id: str, user=Depends(get_current_user)) -> Dict[str, Any]:
    db = get_db()
    if not ObjectId.is_valid(hackathon_id):
        raise HTTPException(status_code=400, detail="Invalid hackathon id")
    await db.participants.update_one(
        {"hackathon_id": ObjectId(hackathon_id), "user_id": user["sub"]},
        {"$set": {"hackathon_id": ObjectId(hackathon_id), "user_id": user["sub"]}},
        upsert=True,
    )
    return {"status": "registered"}


