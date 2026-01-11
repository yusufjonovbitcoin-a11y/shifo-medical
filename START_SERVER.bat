@echo off
echo ===================================
echo   Shifo AI Chat Server
echo ===================================
echo.

cd server

echo Checking dependencies...
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

echo.
echo Starting server...
echo Server will run on http://localhost:3002
echo Press Ctrl+C to stop the server
echo.

call npm start

