from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api import routes_users, routes_articles, routes_hackathons
from app.api import routes_admin
from app.services.scheduler import start_scheduler, shutdown_scheduler


def create_app() -> FastAPI:
    app = FastAPI(title="Tech Orbit API", version="0.1.0")

    # CORS
    allowed = [origin.strip() for origin in settings.ALLOWED_ORIGINS.split(",")]
    allow_credentials = True
    # Starlette restriction: cannot use credentials with wildcard origins
    if len(allowed) == 1 and allowed[0] == "*":
        allow_credentials = False
    app.add_middleware(
        CORSMiddleware,
        allow_origins=allowed,
        allow_credentials=allow_credentials,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Routers
    app.include_router(routes_users.router, prefix="/api/users", tags=["users"])
    app.include_router(routes_articles.router, prefix="/api/articles", tags=["articles"])
    app.include_router(routes_hackathons.router, prefix="/api/hackathons", tags=["hackathons"])
    app.include_router(routes_admin.router, prefix="/api/admin", tags=["admin"])

    @app.on_event("startup")
    async def on_startup():
        start_scheduler()

    @app.on_event("shutdown")
    async def on_shutdown():
        shutdown_scheduler()

    return app


app = create_app()


