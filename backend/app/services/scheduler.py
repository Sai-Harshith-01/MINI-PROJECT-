from apscheduler.schedulers.asyncio import AsyncIOScheduler

from app.core.config import settings
from app.services.rss_service import fetch_and_store_latest


_scheduler: AsyncIOScheduler | None = None


def get_scheduler() -> AsyncIOScheduler:
    global _scheduler
    if _scheduler is None:
        _scheduler = AsyncIOScheduler()
    return _scheduler


def start_scheduler() -> None:
    scheduler = get_scheduler()
    # Add or replace job
    for job in scheduler.get_jobs():
        scheduler.remove_job(job.id)
    scheduler.add_job(fetch_and_store_latest, "interval", minutes=settings.SCHEDULE_FETCH_MINUTES, id="rss_fetch")
    if not scheduler.running:
        scheduler.start()


def shutdown_scheduler() -> None:
    scheduler = get_scheduler()
    if scheduler.running:
        scheduler.shutdown(wait=False)


