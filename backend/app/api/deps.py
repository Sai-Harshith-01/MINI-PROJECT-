from typing import Literal

from fastapi import Depends, HTTPException, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.core.security import decode_token


security = HTTPBearer(auto_error=False)


async def get_current_user(credentials: HTTPAuthorizationCredentials = Security(security)):
    if credentials is None or not credentials.credentials:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = decode_token(credentials.credentials)
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return payload  # contains sub and role


def role_required(*roles: Literal["Student", "College", "Admin"]):
    async def _role_checker(payload=Depends(get_current_user)):
        if payload.get("role") not in roles:
            raise HTTPException(status_code=403, detail="Insufficient permissions")
        return payload

    return _role_checker


