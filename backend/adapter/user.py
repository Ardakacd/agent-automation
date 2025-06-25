from backend.db.get_db_pool import get_db_pool
from fastapi import Depends, HTTPException
from psycopg_pool import AsyncConnectionPool
from psycopg import Error as PsycopgError
from psycopg.errors import UniqueViolation, NotNullViolation
from models import User
import logging

logger = logging.getLogger(__name__)

class UserAdapter:
    def __init__(self, pool: AsyncConnectionPool = Depends(get_db_pool)):
        self.pool = pool

    async def get_user_by_id(self, user_id: str):
        try:
            async with self.pool.connection() as conn:
                async with conn.cursor() as cursor:
                    await cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
                    return await cursor.fetchone()
        except PsycopgError as e:
            logger.error(f"Database error in get_user_by_id: {str(e)}")
            raise HTTPException(status_code=500, detail="Database error occurred")
        except Exception as e:
            logger.error(f"Unexpected error in get_user_by_id: {str(e)}")
            raise HTTPException(status_code=500, detail="Internal server error")

    async def get_user_by_email(self, email: str):
        try:
            async with self.pool.connection() as conn:
                async with conn.cursor() as cursor:
                    await cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
                    return await cursor.fetchone()
        except PsycopgError as e:
            logger.error(f"Database error in get_user_by_email: {str(e)}")
            raise HTTPException(status_code=500, detail="Database error occurred")
        except Exception as e:
            logger.error(f"Unexpected error in get_user_by_email: {str(e)}")
            raise HTTPException(status_code=500, detail="Internal server error")
            
    async def create_user(self, user: User):
        try:
            async with self.pool.connection() as conn:
                async with conn.cursor() as cursor:
                    await cursor.execute("INSERT INTO users (id, name, email, password) VALUES (%s, %s, %s, %s)", (user.id, user.name, user.email, user.password))
                    await conn.commit()
                    return await cursor.fetchone()
        except UniqueViolation as e:
            logger.error(f"Unique constraint violation in create_user: {str(e)}")
            raise HTTPException(status_code=409, detail="Email already in use")
        except NotNullViolation as e:
            logger.error(f"Not null violation in update_user: {str(e)}")
            raise HTTPException(status_code=400, detail="Required field is missing")
        except PsycopgError as e:
            logger.error(f"Database error in create_user: {str(e)}")
            raise HTTPException(status_code=500, detail="Database error occurred")
        except Exception as e:
            logger.error(f"Unexpected error in create_user: {str(e)}")
            raise HTTPException(status_code=500, detail="Internal server error")
            
    async def update_user(self, user_id: str, user: User):
        try:
            async with self.pool.connection() as conn:
                async with conn.cursor() as cursor:
                    await cursor.execute("UPDATE users SET name = %s, email = %s, password = %s WHERE id = %s", (user.name, user.email, user.password, user_id))
                    await conn.commit()
                    return await cursor.fetchone()
        except UniqueViolation as e:
            logger.error(f"Unique constraint violation in update_user: {str(e)}")
            raise HTTPException(status_code=409, detail="Email already in use")
        except NotNullViolation as e:
            logger.error(f"Not null violation in update_user: {str(e)}")
            raise HTTPException(status_code=400, detail="Required field is missing")
        except PsycopgError as e:
            logger.error(f"Database error in update_user: {str(e)}")
            raise HTTPException(status_code=500, detail="Database error occurred")
        except Exception as e:
            logger.error(f"Unexpected error in update_user: {str(e)}")
            raise HTTPException(status_code=500, detail="Internal server error")
            
    async def delete_user(self, user_id: str):
        try:
            async with self.pool.connection() as conn:
                async with conn.cursor() as cursor:
                    await cursor.execute("DELETE FROM users WHERE id = %s", (user_id,))
                    await conn.commit()
                    return await cursor.fetchone()
        except PsycopgError as e:
            logger.error(f"Database error in delete_user: {str(e)}")
            raise HTTPException(status_code=500, detail="Database error occurred")
        except Exception as e:
            logger.error(f"Unexpected error in delete_user: {str(e)}")
            raise HTTPException(status_code=500, detail="Internal server error")
                
                