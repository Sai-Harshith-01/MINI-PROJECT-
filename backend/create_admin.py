"""
Script to create an admin user for TechOrbit backend.
Run this once to create an admin account for testing.

Usage:
    python create_admin.py
"""

from pymongo import MongoClient
from passlib.context import CryptContext
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def _truncate_password(password: str) -> str:
    """Truncate password to 72 bytes for bcrypt compatibility."""
    password_bytes = password.encode('utf-8')
    if len(password_bytes) > 72:
        return password_bytes[:72].decode('utf-8', errors='ignore')
    return password

def create_admin_user():
    # Connect to database
    MONGO_URI = os.getenv("MONGO_URI")
    client = MongoClient(MONGO_URI)
    db = client["techorbit"]
    
    # Admin credentials
    admin_email = "admin@techorbit.com"
    admin_password = "admin123"
    
    # Check if admin already exists
    existing_admin = db.users.find_one({"email": admin_email})
    if existing_admin:
        print(f"❌ Admin user already exists with email: {admin_email}")
        return
    
    # Create admin user
    truncated_password = _truncate_password(admin_password)
    hashed_password = pwd_context.hash(truncated_password)
    
    admin_user = {
        "email": admin_email,
        "password": hashed_password,
        "role": "ADMIN",
        "created_at": datetime.utcnow()
    }
    
    result = db.users.insert_one(admin_user)
    
    print("✅ Admin user created successfully!")
    print(f"📧 Email: {admin_email}")
    print(f"🔑 Password: {admin_password}")
    print(f"🆔 User ID: {result.inserted_id}")
    print("\n⚠️  Please change the password after first login!")

if __name__ == "__main__":
    create_admin_user()
