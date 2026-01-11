# Barcha serverni ishga tushirish scripti

Write-Host "🚀 Serverni ishga tushiryapman..." -ForegroundColor Green

# Backend server (port 3000)
Write-Host ""
Write-Host "📡 Backend server (AI Chat) ishga tushiryapman..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd server; npm run dev"

# Kichik kutish (backend server ishga tushishi uchun)
Start-Sleep -Seconds 3

# Next.js development server (port 3001 yoki 3000 bo'lsa)
Write-Host "🌐 Next.js development server ishga tushiryapman..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev"

Write-Host ""
Write-Host "✅ Ikkala server ham ishga tushirildi!" -ForegroundColor Green
Write-Host ""
Write-Host "📍 Serverlar:" -ForegroundColor Yellow
Write-Host "   - Backend API: http://localhost:3000" -ForegroundColor White
Write-Host "   - Next.js App: http://localhost:3000 (yoki 3001)" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  Eslatma: Har bir server alohida terminal oynasida ishlaydi." -ForegroundColor Yellow
Write-Host "   Serverlarni to'xtatish uchun oynalarni yoping." -ForegroundColor Yellow

