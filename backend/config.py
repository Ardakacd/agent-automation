from functools import lru_cache
import os
from typing import Optional, List
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    
    ENV: str = "development"  # development, staging, production
    DEBUG: bool = True
    API_V1_STR: str = "/api/v1"
    
    # Fix CORS origins parsing
    BACKEND_CORS_ORIGINS: str = "http://localhost:3000"  # Default to localhost
    
    # Database settings
    DB_HOST: str
    DB_PORT: int 
    DB_NAME: str 
    DB_USER: str 
    DB_PASSWORD: str 
    
    
    # Security settings
    SECRET_KEY: str
    ALGORITHM: str
    
    # File upload settings
    UPLOAD_DIR: str = "uploads"
    MAX_UPLOAD_SIZE: int = 10 * 1024 * 1024  # 10MB
    
    # LLM settings
    OPENAI_API_KEY: Optional[str] = None
    GROQ_API_KEY: Optional[str] = None
    ANTHROPIC_API_KEY: Optional[str] = None
    GOOGLE_API_KEY: Optional[str] = None
    
    # RAG settings
    VECTOR_DB_PATH: str = "./vector_db"
    CHUNK_SIZE: int = 1000
    CHUNK_OVERLAP: int = 200
    
    class Config:
        env_file = f".env.{os.getenv('ENV', 'development')}"
        case_sensitive = True


@lru_cache()
def get_settings() -> Settings:
    """
    Get cached settings instance.
    This ensures we don't read the .env file on every request.
    """
    return Settings()

# Create a settings instance
settings = get_settings()

def is_development() -> bool:
    """Check if we're in development environment"""
    return settings.ENV.lower() == "development"

def is_production() -> bool:
    """Check if we're in production environment"""
    return settings.ENV.lower() == "production"

def is_staging() -> bool:
    """Check if we're in staging environment"""
    return settings.ENV.lower() == "staging" 