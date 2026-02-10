@echo off
echo Starting Startup Benefits Platform...

start cmd /k "cd server && npm install && npm run dev"
start cmd /k "cd client && npm run dev"

echo Backend and Frontend are starting up.
echo Visit http://localhost:3000 for Frontend (Next.js)
echo Visit http://localhost:5000 for Backend (API)
