from psycopg_pool import AsyncConnectionPool
from config import settings

user = settings.DB_USER
password = settings.DB_PASSWORD
host = settings.DB_HOST
port = settings.DB_PORT
db_name = settings.DB_NAME

pool = AsyncConnectionPool(
    conninfo=f'postgresql://{user}:{password}@{host}:{port}/{db_name}',
    max_size=20,
    open=True  
)

def get_db_pool():
    return pool
   