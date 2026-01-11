# 📱 WiFi orqali Telefon bilan Ulanish - Qo'llanma

## 🌐 Local IP Address'ni Topish

### Windows (PowerShell):

```powershell
# IPv4 address'ni topish
Get-NetIPAddress -AddressFamily IPv4 | Where-Object { 
    $_.IPAddress -like "192.168.*" -or 
    $_.IPAddress -like "10.*" -or 
    $_.IPAddress -like "172.*" 
} | Select-Object IPAddress, InterfaceAlias
```

Yoki:

```cmd
ipconfig | findstr "IPv4"
```

**Ko'rinishi kerak** (masalan):
```
IPv4 Address. . . . . . . . . . . : 192.168.1.100
```

⚠️ **MUHIM**: Bu IP address'ni yozib qo'ying! (masalan: `192.168.1.100`)

---

## ✅ Serverlar Sozlangani

✅ **Frontend server** allaqachon `0.0.0.0` da ishlayapti (`npm run dev --hostname 0.0.0.0`)
✅ **Backend server** allaqachon `0.0.0.0` da ishlayapti
✅ **AI Chat komponenti** avtomatik ravishda localhost'ni IP address'ga almashtiradi

---

## 📱 Telefondan Kirish

### Qadam 1: Ikkala Server Ham Ishga Tushirilgan

```powershell
# Barcha serverlarni ishga tushirish
.\START_ALL_SERVERS.ps1
```

### Qadam 2: IP Address'ni Toping

Yuqoridagi buyruqni ishlatib, IP address'ingizni toping (masalan: `192.168.1.100`)

### Qadam 3: Telefondan Ochish

**Telefonda browser'da oching:**

```
http://192.168.1.100:3000
```

⚠️ **`192.168.1.100` o'rniga o'zingizning IP address'ingizni yozing!**

---

## 🔧 Muammo bo'lsa

### Telefon va Kompyuter Bir Xil WiFi'da

✅ **Tekshirish:**
- Telefon va kompyuter bir xil WiFi tarmog'ida bo'lishi kerak
- Firewall sozlamalarini tekshiring

### Firewall Bloklayapti

**Windows Firewall:**

```powershell
# Port 3000 va 3002 ni ochish (bir marta)
New-NetFirewallRule -DisplayName "Next.js Dev" -Direction Inbound -LocalPort 3000 -Protocol TCP -Action Allow
New-NetFirewallRule -DisplayName "Backend API" -Direction Inbound -LocalPort 3002 -Protocol TCP -Action Allow
```

Yoki Windows Settings orqali:
1. Windows Settings → Update & Security → Windows Security → Firewall & network protection
2. "Allow an app through firewall"
3. Port 3000 va 3002 ni qo'shing

### Serverlar Ishlamayapti

**Tekshirish:**

```powershell
# Backend server
Test-NetConnection -ComputerName localhost -Port 3002

# Frontend server
Test-NetConnection -ComputerName localhost -Port 3000
```

Agar `TcpTestSucceeded : False` ko'rsatsa, serverlarni ishga tushiring:

```powershell
.\START_ALL_SERVERS.ps1
```

---

## 📝 IP Address Tekshirish Script

IP address'ni tezkor topish uchun:

```powershell
$ip = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { 
    $_.IPAddress -like "192.168.*" 
}).IPAddress | Select-Object -First 1

Write-Host "Your IP Address: $ip" -ForegroundColor Green
Write-Host "Frontend URL: http://$ip:3000" -ForegroundColor Cyan
Write-Host "Backend URL: http://$ip:3002" -ForegroundColor Cyan
```

---

## ✅ Tekshirish

1. **Kompyuterdan:**
   - `http://localhost:3000` oching → Ishlamoqda ✅
   - `http://localhost:3002` oching → JSON ko'rinishi kerak ✅

2. **Telefondan (bir xil WiFi):**
   - `http://YOUR_IP:3000` oching → Ishlamoqda ✅
   - `http://YOUR_IP:3002` oching → JSON ko'rinishi kerak ✅

3. **AI Chat:**
   - Telefondan saytni oching
   - AI Chat widget'ni oching
   - Xabar yuboring
   - AI javob bersa → ✅ Ishlamoqda!

---

## 💡 Eslatmalar

- ✅ Telefon va kompyuter **bir xil WiFi** tarmog'ida bo'lishi kerak
- ✅ Serverlar **ishga tushirilgan** bo'lishi kerak
- ✅ Firewall **portlarni ochgan** bo'lishi kerak
- ✅ AI Chat **avtomatik** IP address'ni aniqlaydi

---

## 🆘 Hali ham Ishlamasa

1. IP address'ni to'g'ri kiritganingizni tekshiring
2. Firewall sozlamalarini tekshiring
3. Telefon va kompyuter bir xil WiFi'da ekanligini tekshiring
4. Serverlar ishga tushirilganini tekshiring

