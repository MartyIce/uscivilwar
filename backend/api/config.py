"""Application configuration settings."""

from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    """Application settings with environment variable support."""

    # API Settings
    API_TITLE: str = "Civil War API"
    API_VERSION: str = "1.0.0"
    API_DESCRIPTION: str = "REST API for US Civil War historical data"

    # Server Settings
    PORT: int = 8000

    # Database Settings
    DATABASE_URL: Optional[str] = None

    # Data Source Mode
    USE_MOCK_DATA: bool = True

    # CORS Settings - allow multiple frontend ports for worktrees
    CORS_ORIGINS: list[str] = [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://localhost:5176",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
    ]

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        extra = "ignore"


settings = Settings()
