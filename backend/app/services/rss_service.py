from typing import Iterable, List, Tuple

import feedparser

from app.core.config import settings
from app.db.mongo import get_db
from app.services.summarizer import summarize_text


def get_feed_urls() -> List[str]:
    return [u.strip() for u in settings.RSS_FEEDS.split(",") if u.strip()]


async def fetch_and_store_latest(limit_per_feed: int = 5) -> Tuple[int, int]:
    db = get_db()
    total_seen = 0
    total_inserted = 0
    for url in get_feed_urls():
        parsed = feedparser.parse(url)
        entries = parsed.entries[:limit_per_feed]
        for e in entries:
            total_seen += 1
            link = getattr(e, "link", None) or getattr(e, "id", None)
            if not link:
                continue
            existing = await db.articles.find_one({"url": link})
            if existing:
                continue
            title = getattr(e, "title", "Untitled")
            content = getattr(e, "summary", "") or getattr(e, "description", "")
            summary = summarize_text(content, max_sentences=4)
            doc = {
                "title": title,
                "summary": summary or content[:500],
                "url": link,
                "source": parsed.feed.get("title", "RSS"),
                "author_type": "RSS",
            }
            await db.articles.insert_one(doc)
            total_inserted += 1
    return total_seen, total_inserted


