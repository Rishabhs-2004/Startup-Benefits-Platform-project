@echo off
echo Starting Backend Server...
start "Backend Server" cmd /k "cd server && npm run dev"

echo Starting Frontend Client...
start "Frontend Client" cmd /k "cd client && npm run dev"

echo Application is starting!
echo Backend will be at http://localhost:5000
echo Frontend will be at http://localhost:5173
