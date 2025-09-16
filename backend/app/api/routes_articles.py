from typing import Any, Dict, List

from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from bson import ObjectId

from app.api.deps import get_current_user, role_required
from app.db.mongo import get_db


router = APIRouter()


class ArticleCreate(BaseModel):
    title: str
    summary: str
    url: str
    source: str
    author_type: str  # RSS|Student|College


@router.get("/")
async def list_articles(q: str | None = None, page: int = 1, page_size: int = 5) -> List[Dict[str, Any]]:
    db = get_db()
    filters: Dict[str, Any] = {}
    if q:
        filters = {"$or": [
            {"title": {"$regex": q, "$options": "i"}},
            {"summary": {"$regex": q, "$options": "i"}},
            {"source": {"$regex": q, "$options": "i"}},
        ]}
    skip = max(0, (page - 1) * page_size)
    cursor = (
        db.articles
        .find(filters, {"title": 1, "summary": 1, "url": 1, "source": 1})
        .sort("_id", -1)
        .skip(skip)
        .limit(page_size)
    )
    return [
        {"id": str(doc["_id"]), "title": doc["title"], "summary": doc["summary"], "url": doc["url"], "source": doc.get("source", "")}
        async for doc in cursor
    ]


@router.post("/", dependencies=[Depends(role_required("Student", "College", "Admin"))])
async def create_article(payload: ArticleCreate, user=Depends(get_current_user)) -> Dict[str, Any]:
    db = get_db()
    doc = payload.model_dump()
    doc.update({"author_id": user["sub"], "author_role": user["role"]})
    res = await db.articles.insert_one(doc)
    return {"id": str(res.inserted_id)}


@router.post("/{article_id}/save", dependencies=[Depends(role_required("Student", "College", "Admin"))])
async def save_article(article_id: str, user=Depends(get_current_user)) -> Dict[str, Any]:
    db = get_db()
    if not ObjectId.is_valid(article_id):
        raise HTTPException(status_code=400, detail="Invalid article id")
    await db.saved.insert_one({"user_id": user["sub"], "article_id": ObjectId(article_id)})
    return {"status": "saved"}


@router.get("/saved", dependencies=[Depends(role_required("Student", "College", "Admin"))])
async def list_saved(user=Depends(get_current_user)) -> List[Dict[str, Any]]:
    db = get_db()
    saved = db.saved.find({"user_id": user["sub"]}).sort("_id", -1)
    results: List[Dict[str, Any]] = []
    async for s in saved:
        art = await db.articles.find_one({"_id": s["article_id"]}, {"title": 1, "summary": 1, "url": 1, "source": 1})
        if art:
            results.append({"id": str(art["_id"]), "title": art["title"], "summary": art["summary"], "url": art["url"], "source": art.get("source", "")})
    return results


# Likes
@router.post("/{article_id}/like", dependencies=[Depends(role_required("Student", "College", "Admin"))])
async def like_article(article_id: str, user=Depends(get_current_user)) -> Dict[str, Any]:
    db = get_db()
    if not ObjectId.is_valid(article_id):
        raise HTTPException(status_code=400, detail="Invalid article id")
    await db.likes.update_one(
        {"article_id": ObjectId(article_id), "user_id": user["sub"]},
        {"$set": {"article_id": ObjectId(article_id), "user_id": user["sub"]}},
        upsert=True,
    )
    return {"status": "liked"}


@router.delete("/{article_id}/like", dependencies=[Depends(role_required("Student", "College", "Admin"))])
async def unlike_article(article_id: str, user=Depends(get_current_user)) -> Dict[str, Any]:
    db = get_db()
    if not ObjectId.is_valid(article_id):
        raise HTTPException(status_code=400, detail="Invalid article id")
    await db.likes.delete_one({"article_id": ObjectId(article_id), "user_id": user["sub"]})
    return {"status": "unliked"}


@router.get("/{article_id}/likes")
async def count_likes(article_id: str) -> Dict[str, Any]:
    db = get_db()
    if not ObjectId.is_valid(article_id):
        raise HTTPException(status_code=400, detail="Invalid article id")
    count = await db.likes.count_documents({"article_id": ObjectId(article_id)})
    return {"count": count}


# Comments
class CommentCreate(BaseModel):
    text: str


@router.post("/{article_id}/comments", dependencies=[Depends(role_required("Student", "College", "Admin"))])
async def add_comment(article_id: str, body: CommentCreate, user=Depends(get_current_user)) -> Dict[str, Any]:
    db = get_db()
    if not ObjectId.is_valid(article_id):
        raise HTTPException(status_code=400, detail="Invalid article id")
    res = await db.comments.insert_one({
        "article_id": ObjectId(article_id),
        "user_id": user["sub"],
        "text": body.text,
    })
    return {"id": str(res.inserted_id)}


@router.get("/{article_id}/comments")
async def list_comments(article_id: str) -> List[Dict[str, Any]]:
    db = get_db()
    if not ObjectId.is_valid(article_id):
        raise HTTPException(status_code=400, detail="Invalid article id")
    cursor = db.comments.find({"article_id": ObjectId(article_id)}).sort("_id", 1)
    return [
        {"id": str(doc["_id"]), "text": doc.get("text", ""), "user_id": doc.get("user_id")}
        async for doc in cursor
    ]


