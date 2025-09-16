from typing import Any, Dict, List

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from bson import ObjectId

from app.api.deps import role_required
from app.db.mongo import get_db


router = APIRouter(dependencies=[Depends(role_required("Admin"))])


class RoleUpdate(BaseModel):
    role: str  # Student | College | Admin


@router.get("/users")
async def list_users() -> List[Dict[str, Any]]:
    db = get_db()
    cursor = db.users.find({}, {"email": 1, "full_name": 1, "role": 1}).sort("_id", -1)
    return [
        {"id": str(doc["_id"]), "email": doc.get("email"), "full_name": doc.get("full_name"), "role": doc.get("role")}
        async for doc in cursor
    ]


@router.patch("/users/{user_id}/role")
async def change_user_role(user_id: str, body: RoleUpdate) -> Dict[str, Any]:
    if not ObjectId.is_valid(user_id):
        raise HTTPException(status_code=400, detail="Invalid user id")
    db = get_db()
    res = await db.users.update_one({"_id": ObjectId(user_id)}, {"$set": {"role": body.role}})
    if res.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return {"status": "ok"}


@router.delete("/users/{user_id}")
async def delete_user(user_id: str) -> Dict[str, Any]:
    if not ObjectId.is_valid(user_id):
        raise HTTPException(status_code=400, detail="Invalid user id")
    db = get_db()
    res = await db.users.delete_one({"_id": ObjectId(user_id)})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return {"status": "deleted"}


@router.get("/articles")
async def list_articles(limit: int = 20) -> List[Dict[str, Any]]:
    db = get_db()
    cursor = db.articles.find({}, {"title": 1, "url": 1, "source": 1, "author_type": 1}).sort("_id", -1).limit(limit)
    return [
        {"id": str(doc["_id"]), "title": doc.get("title"), "url": doc.get("url"), "source": doc.get("source"), "author_type": doc.get("author_type")}
        async for doc in cursor
    ]


@router.delete("/articles/{article_id}")
async def delete_article(article_id: str) -> Dict[str, Any]:
    if not ObjectId.is_valid(article_id):
        raise HTTPException(status_code=400, detail="Invalid article id")
    db = get_db()
    res = await db.articles.delete_one({"_id": ObjectId(article_id)})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Article not found")
    # clean saved refs
    await db.saved.delete_many({"article_id": ObjectId(article_id)})
    return {"status": "deleted"}


