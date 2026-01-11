# Shifo - Start All Servers (Backend + Frontend)

Write-Host "===================================" -ForegroundColor Cyan
Write-Host "  Shifo - Starting All Servers" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""

# Stop existing servers on ports 3002 and 3000
Write-Host "Checking for existing servers..." -ForegroundColor Yellow

$port3002 = Get-NetTCPConnection -LocalPort 3002 -ErrorAction SilentlyContinue
if ($port3002) {
    $pid = $port3002.OwningProcess
    Write-Host "Stopping process on port 3002 (PID: $pid)" -ForegroundColor Yellow
    Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
}

$port3000 = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if ($port3000) {
    $pid = $port3000.OwningProcess
    Write-Host "Stopping process on port 3000 (PID: $pid)" -ForegroundColor Yellow
    Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
}

Write-Host ""

# Start Backend Server
Write-Host "Starting Backend Server (port 3002)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\server'; npm start" -WindowStyle Normal

Start-Sleep -Seconds 3

# Start Frontend Server
Write-Host "Starting Frontend Server (port 3000)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot'; npm run dev" -WindowStyle Normal

Write-Host ""
Write-Host "===================================" -ForegroundColor Cyan
Write-Host "  Servers Starting..." -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend:  http://localhost:3002" -ForegroundColor Yellow
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Yellow
Write-Host ""
Write-Host "✅ Both servers are starting in separate windows" -ForegroundColor Green
Write-Host "Press Ctrl+C in each window to stop the servers" -ForegroundColor Cyan
Write-Host ""

