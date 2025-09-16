from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    MONGODB_URI: str = "mongodb://localhost:27017/tech_orbit"
    JWT_SECRET: str = "changeme"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    ALLOWED_ORIGINS: str = "*"
    RSS_FEEDS: str = (
        "https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml,"
        "https://www.theverge.com/rss/index.xml,"
        "https://www.wired.com/feed/rss"
    )
    SCHEDULE_FETCH_MINUTES: int = 10

    class Config:
        env_file = ".env"


settings = Settings()


