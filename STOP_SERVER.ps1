# Stop Server on Port 3002 - PowerShell Script

Write-Host "Stopping server on port 3002..." -ForegroundColor Yellow

# Find process using port 3002
$connection = Get-NetTCPConnection -LocalPort 3002 -ErrorAction SilentlyContinue

if ($connection) {
    $processId = $connection.OwningProcess
    $process = Get-Process -Id $processId -ErrorAction SilentlyContinue
    
    if ($process) {
        Write-Host "Found process: $($process.ProcessName) (PID: $processId)" -ForegroundColor Cyan
        Write-Host "Stopping process..." -ForegroundColor Yellow
        
        Stop-Process -Id $processId -Force
        
        Write-Host "✅ Process stopped successfully!" -ForegroundColor Green
    } else {
        Write-Host "⚠️ Process not found" -ForegroundColor Yellow
    }
} else {
    Write-Host "✅ Port 3002 is free (no process using it)" -ForegroundColor Green
}

Write-Host ""
Write-Host "You can now start the server with: npm start" -ForegroundColor Cyan

