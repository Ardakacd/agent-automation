
from fastapi import APIRouter
from config import settings, is_development, is_production


config_test_router = APIRouter()


@config_test_router.get("/config-test")
async def test_config():
    """Test endpoint to verify configuration settings"""
    return {
        "environment": settings.ENV,
        "debug_mode": settings.DEBUG,
        "api_version": settings.API_V1_STR,
        "cors_origins": settings.BACKEND_CORS_ORIGINS,
        "is_development": is_development(),
        "is_production": is_production(),
        "upload_dir": settings.UPLOAD_DIR,
        "max_upload_size": settings.MAX_UPLOAD_SIZE,
        "vector_db_path": settings.VECTOR_DB_PATH,
        "chunk_size": settings.CHUNK_SIZE,
        "chunk_overlap": settings.CHUNK_OVERLAP
    }