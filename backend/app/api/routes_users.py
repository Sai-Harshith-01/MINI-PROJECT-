from datetime import timedelta
from typing import Any, Dict

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr

from app.core.security import create_access_token, get_password_hash, verify_password
from app.db.mongo import get_db


router = APIRouter()


class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    role: str  # Student | College | Admin


class UserLogin(BaseModel):
    email: EmailStr
    password: str


@router.post("/signup")
async def signup(payload: UserCreate) -> Dict[str, Any]:
    db = get_db()
    existing = await db.users.find_one({"email": payload.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    user_doc = {
        "email": payload.email,
        "password_hash": get_password_hash(payload.password),
        "full_name": payload.full_name,
        "role": payload.role,
    }
    res = await db.users.insert_one(user_doc)
    token = create_access_token(str(res.inserted_id), payload.role)
    return {"access_token": token, "token_type": "bearer"}


@router.post("/login")
async def login(payload: UserLogin) -> Dict[str, Any]:
    db = get_db()
    user = await db.users.find_one({"email": payload.email})
    if not user or not verify_password(payload.password, user.get("password_hash", "")):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token(str(user["_id"]), user.get("role", "Student"))
    return {"access_token": token, "token_type": "bearer"}


