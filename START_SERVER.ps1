# Shifo AI Chat Server - PowerShell Script

Write-Host "===================================" -ForegroundColor Cyan
Write-Host "  Shifo AI Chat Server" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""

Set-Location server

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
}

Write-Host ""
Write-Host "Starting server..." -ForegroundColor Green
Write-Host "Server will run on http://localhost:3002" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

npm start

