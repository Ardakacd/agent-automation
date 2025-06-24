from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import logging
from config import settings, is_development
from controller.workflow import workflow_router
from controller.config_test import config_test_router   
from controller.rag import rag_router
from controller.user import user_router
# Configure logging
logging.basicConfig(
    level=logging.DEBUG if is_development() else logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Agent Automation API",
    description="API for Agent Automation Platform",
    version="1.0.0",
    debug=is_development()
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(workflow_router)
app.include_router(config_test_router)
app.include_router(rag_router)
app.include_router(user_router)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 