#!/bin/bash

# Create Python virtual environment for backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Install frontend dependencies
cd ../frontend
npm install

# Start both services
echo "Starting services..."
cd ../backend
source venv/bin/activate
uvicorn main:app --reload &
cd ../frontend
npm run dev 