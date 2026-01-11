# 🔧 Port 3002 Ishlatilmoqda - Yechim

## ❌ Xato: `EADDRINUSE: address already in use 0.0.0.0:3002`

Bu degani, 3002 port allaqachon boshqa process tomonidan ishlatilayapti.

---

## ✅ Yechim 1: Port'ni Ishlatayotgan Process'ni To'xtatish

### Windows (PowerShell):

```powershell
# Port'ni ishlatayotgan process'ni topish
Get-NetTCPConnection -LocalPort 3002 | Select-Object -Property OwningProcess

# Process ID ni ko'ring (masalan: 12345)
# Keyin process'ni to'xtatish:
Stop-Process -Id 12345 -Force
```

Yoki bir qatorda:

```powershell
$processId = (Get-NetTCPConnection -LocalPort 3002).OwningProcess
Stop-Process -Id $processId -Force
```

### Windows (CMD):

```cmd
# Port'ni ishlatayotgan process'ni topish
netstat -ano | findstr :3002

# Process ID ni ko'ring (oxirgi raqam, masalan: 12345)
# Keyin process'ni to'xtatish:
taskkill /PID 12345 /F
```

---

## ✅ Yechim 2: Boshqa Port Ishlatish

Agar port'ni to'xtatish mumkin bo'lmasa, boshqa port ishlating:

1. **`server/.env` faylini oching**
2. **PORT'ni o'zgartiring**:

```env
PORT=3003
```

Yoki

```env
PORT=3004
```

3. **Server'ni qayta ishga tushiring**

---

## ✅ Yechim 3: Avval Ishga Tushirilgan Server'ni Topish va To'xtatish

Ehtimol, avval server ishga tushirilgan va hali ham ishlayapti:

```powershell
# Node.js process'larni topish
Get-Process node -ErrorAction SilentlyContinue | Select-Object Id, ProcessName, StartTime

# Barcha Node.js process'larni to'xtatish (ehtiyotkorlik bilan!)
Stop-Process -Name node -Force
```

⚠️ **Eslatma**: Bu barcha Node.js process'larni to'xtatadi. Faqat server'ni to'xtatish kerak bo'lsa, yuqoridagi Yechim 1 ni ishlating.

---

## 🔍 Tekshirish

Port bo'sh ekanligini tekshirish:

```powershell
# PowerShell
Test-NetConnection -ComputerName localhost -Port 3002

# Agar "TcpTestSucceeded : False" ko'rsatsa, port bo'sh ✅
```

Yoki:

```cmd
# CMD
netstat -ano | findstr :3002

# Agar hech narsa ko'rinmasa, port bo'sh ✅
```

---

## 📝 Eng Oson Yo'l

1. **Terminal'da Ctrl+C bosing** (agar server ishlayotgan bo'lsa)
2. **Yoki boshqa port ishlating** (`.env` faylda `PORT=3003`)

