# Cursor Connection Fix Script
# Bu script Cursor'ni to'liq yopib, cache'ni tozalaydi

Write-Host "Cursor Connection Fix Script" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""

# 1. Cursor jarayonlarini tugatish
Write-Host "1. Cursor jarayonlarini tugatish..." -ForegroundColor Yellow
$cursorProcesses = Get-Process -Name "Cursor*" -ErrorAction SilentlyContinue
if ($cursorProcesses) {
    $cursorProcesses | ForEach-Object {
        Write-Host "   Tugatilmoqda: $($_.ProcessName) (PID: $($_.Id))" -ForegroundColor Cyan
        Stop-Process -Id $_.Id -Force -ErrorAction SilentlyContinue
    }
    Start-Sleep -Seconds 2
    Write-Host "   ✓ Cursor jarayonlari tugatildi" -ForegroundColor Green
} else {
    Write-Host "   ✓ Cursor jarayonlari topilmadi" -ForegroundColor Green
}

# 2. Cache'ni tozalash
Write-Host ""
Write-Host "2. Cache'ni tozalash..." -ForegroundColor Yellow
$cachePaths = @(
    "$env:APPDATA\Cursor\Cache",
    "$env:APPDATA\Cursor\Code Cache",
    "$env:APPDATA\Cursor\GPUCache",
    "$env:APPDATA\Cursor\CachedData",
    "$env:LOCALAPPDATA\Cursor\Cache",
    "$env:LOCALAPPDATA\Cursor\Code Cache",
    "$env:LOCALAPPDATA\Cursor\GPUCache"
)

foreach ($path in $cachePaths) {
    if (Test-Path $path) {
        try {
            Remove-Item -Recurse -Force $path -ErrorAction SilentlyContinue
            Write-Host "   ✓ Tozalandi: $path" -ForegroundColor Green
        } catch {
            Write-Host "   ⚠ Xato: $path" -ForegroundColor Red
        }
    }
}

# 3. Internet ulanishini tekshirish
Write-Host ""
Write-Host "3. Internet ulanishini tekshirish..." -ForegroundColor Yellow
try {
    $ping = Test-Connection -ComputerName "8.8.8.8" -Count 2 -Quiet
    if ($ping) {
        Write-Host "   ✓ Internet ulanishi mavjud" -ForegroundColor Green
    } else {
        Write-Host "   ⚠ Internet ulanishi yo'q" -ForegroundColor Red
    }
} catch {
    Write-Host "   ⚠ Internet tekshiruvi xatosi" -ForegroundColor Red
}

# 4. DNS tekshiruvi
Write-Host ""
Write-Host "4. DNS tekshiruvi..." -ForegroundColor Yellow
try {
    $dns = Resolve-DnsName -Name "google.com" -ErrorAction SilentlyContinue
    if ($dns) {
        Write-Host "   ✓ DNS ishlayapti" -ForegroundColor Green
    } else {
        Write-Host "   ⚠ DNS muammosi" -ForegroundColor Red
        Write-Host "   Maslahat: Google DNS (8.8.8.8) yoki Cloudflare DNS (1.1.1.1) ishlatish" -ForegroundColor Yellow
    }
} catch {
    Write-Host "   ⚠ DNS tekshiruvi xatosi" -ForegroundColor Red
}

# 5. Xulosa
Write-Host ""
Write-Host "================================" -ForegroundColor Green
Write-Host "Tugallandi!" -ForegroundColor Green
Write-Host ""
Write-Host "Keyingi qadamlar:" -ForegroundColor Yellow
Write-Host "1. VPN yoqing (Cloudflare WARP yoki boshqa)" -ForegroundColor Cyan
Write-Host "2. Cursor'ni qayta ishga tushiring" -ForegroundColor Cyan
Write-Host "3. AI funksiyalarini sinab ko'ring" -ForegroundColor Cyan
Write-Host ""
Write-Host "Batafsil ma'lumot: CURSOR_CONNECTION_FIX.md" -ForegroundColor Gray






