# Stop All Servers (Backend + Frontend)

Write-Host "Stopping all servers..." -ForegroundColor Yellow
Write-Host ""

# Stop Backend (port 3002)
$port3002 = Get-NetTCPConnection -LocalPort 3002 -ErrorAction SilentlyContinue
if ($port3002) {
    $pid = $port3002.OwningProcess
    Write-Host "Stopping Backend Server on port 3002 (PID: $pid)" -ForegroundColor Yellow
    Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
    Write-Host "✅ Backend stopped" -ForegroundColor Green
} else {
    Write-Host "✅ Backend not running (port 3002 is free)" -ForegroundColor Green
}

# Stop Frontend (port 3000)
$port3000 = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if ($port3000) {
    $pid = $port3000.OwningProcess
    Write-Host "Stopping Frontend Server on port 3000 (PID: $pid)" -ForegroundColor Yellow
    Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
    Write-Host "✅ Frontend stopped" -ForegroundColor Green
} else {
    Write-Host "✅ Frontend not running (port 3000 is free)" -ForegroundColor Green
}

Write-Host ""
Write-Host "✅ All servers stopped!" -ForegroundColor Green

