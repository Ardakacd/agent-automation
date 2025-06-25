from fastapi import Depends, HTTPException, status
from models import User
from adapter.user import UserAdapter
from utils.jwt import create_access_token, verify_token
from utils.password import verify_password, get_password_hash

class UserService:
    def __init__(self, user_adapter: UserAdapter = Depends()):
        self.user_adapter = user_adapter

    async def login(self, user: User):
        try:
            db_user = await self.user_adapter.get_user_by_email(user.email)
            if not db_user:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Incorrect email or password"
                )
            
            if not verify_password(user.password, db_user[3]):
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Incorrect email or password"
                )
                        
            access_token = create_access_token(
                data={"user_id": db_user[0]}
            )
            
            return {
                "access_token": access_token,
                "token_type": "bearer",
                "user_id": db_user[0],
                "email": db_user[2]
            }
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Internal server error"
            )

    async def register(self, user: User):
        try: 
            hashed_password = get_password_hash(user.password)
            
            user_data = User(
                id=user.id,
                name=user.name,
                email=user.email,
                password=hashed_password
            )
            
            await self.user_adapter.create_user(user_data)
            
            access_token = create_access_token(
                data={"user_id": user.id}
            )
            
            return {
                "access_token": access_token,
                "token_type": "bearer",
                "user_id":user.id,
                "email": user.email
            }
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Internal server error"
            )

    async def logout(self, token: str):
        try:
            verify_token(token)
            return {"message": "User logged out successfully"}
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Internal server error"
            )

    async def get_user(self, token: str):
        try:
            token_data = verify_token(token)
            user_id = token_data.user_id
            
            user = await self.user_adapter.get_user_by_id(user_id)
            if not user:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="User not found"
                )
            
            return {
                "id": user[0],
                "name": user[1],
                "email": user[2]
            }
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Internal server error"
            )

    async def update_user(self, token: str, user: User):
        try:
            token_data = verify_token(token)
            user_id = token_data.user_id
            
            
            existing_user = await self.user_adapter.get_user_by_id(user_id)
            if not existing_user:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="User not found"
                )
            
            
            hashed_password = get_password_hash(user.password) if user.password else existing_user[3]
            
            
            user_data = User(
                id=user_id,
                name=user.name or existing_user[1],
                email=user.email or existing_user[2],
                password=hashed_password
            )
            
            await self.user_adapter.update_user(user_id, user_data)
            
            return {"message": "User updated successfully"}
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Internal server error"
            )

    async def delete_user(self, token: str):
        try:
            
            token_data = verify_token(token)
            user_id = token_data.user_id
            
            existing_user = await self.user_adapter.get_user_by_id(user_id)
            if not existing_user:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="User not found"
                )
            
            await self.user_adapter.delete_user(user_id)
            
            return {"message": "User deleted successfully"}
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Internal server error"
            ) 


