from fastapi import APIRouter, Depends, HTTPException, Response, Cookie
from models import User
from services.user import UserService
from typing import Optional

user_router = APIRouter(prefix="/user")

class UserController:
    def __init__(self, user_service: UserService = Depends()):
        self.user_service = user_service

    @user_router.post("/login")
    async def login(self, user: User, response: Response):
        """Login user and set token in cookie"""
        result = await self.user_service.login(user)
        
        response.set_cookie(
            key="access_token",
            value=result["access_token"],
            httponly=True,
            secure=True,
            samesite="strict",
            max_age=1800  # 30 minutes
        )
        
        return {
            "message": "Login successful",
            "user_id": result["user_id"],
            "email": result["email"]
        }

    @user_router.post("/register")
    async def register(self, user: User, response: Response):
        """Register new user and set token in cookie"""
        result = await self.user_service.register(user)
        
        response.set_cookie(
            key="access_token",
            value=result["access_token"],
            httponly=True,
            secure=True,
            samesite="strict",
            max_age=1800  # 30 minutes
        )
        
        return {
            "message": "Registration successful",
            "user_id": result["user_id"],
            "email": result["email"]
        }

    @user_router.post("/logout")
    async def logout(self, response: Response, access_token: Optional[str] = Cookie(None)):
        """Logout user and clear token cookie"""
        if access_token:
            await self.user_service.logout(access_token)
        
        response.delete_cookie(key="access_token")
        
        return {"message": "Logout successful"}

    @user_router.get("/profile")
    async def get_user(self, access_token: Optional[str] = Cookie(None)):
        """Get user profile using token from cookie"""
        if not access_token:
            raise HTTPException(status_code=401, detail="No access token provided")
        
        return await self.user_service.get_user(access_token)

    @user_router.put("/profile")
    async def update_user(self, user: User, access_token: Optional[str] = Cookie(None)):
        """Update user profile using token from cookie"""
        if not access_token:
            raise HTTPException(status_code=401, detail="No access token provided")
        
        return await self.user_service.update_user(access_token, user)

    @user_router.delete("/profile")
    async def delete_user(self, response: Response, access_token: Optional[str] = Cookie(None)):
        """Delete user account and clear token cookie"""
        if not access_token:
            raise HTTPException(status_code=401, detail="No access token provided")
        
        result = await self.user_service.delete_user(access_token)
        
        response.delete_cookie(key="access_token")
        
        return result

   


