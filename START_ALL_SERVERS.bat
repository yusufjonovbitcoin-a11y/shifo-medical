@echo off
echo ===================================
echo   Shifo - Starting All Servers
echo ===================================
echo.

REM Stop any existing servers on ports 3000 and 3002
echo Checking for existing servers...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3002"') do (
    echo Stopping process on port 3002 (PID: %%a)
    taskkill /PID %%a /F >nul 2>&1
)

for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3000"') do (
    echo Stopping process on port 3000 (PID: %%a)
    taskkill /PID %%a /F >nul 2>&1
)

echo.
echo Starting Backend Server (port 3002)...
start "Shifo Backend Server" cmd /k "cd server && npm start"

timeout /t 3 /nobreak >nul

echo Starting Frontend Server (port 3000)...
start "Shifo Frontend Server" cmd /k "npm run dev"

echo.
echo ===================================
echo   Servers Starting...
echo ===================================
echo.
echo Backend:  http://localhost:3002
echo Frontend: http://localhost:3000
echo.
echo Press any key to close this window (servers will continue running)
pause >nul

