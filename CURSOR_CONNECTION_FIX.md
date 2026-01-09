# Cursor "Connection Failed" Xatosini Tuzatish

## Muammo
Cursor'ning AI va server funksiyalari ishlamayapti, bu esa avtomatik ishlarni (masalan, stillar build bo'lishini) to'xtatib qo'ygan.

## Yechimlar

### 1. VPN Yoqish (Tavsiya etiladi)

#### Cloudflare WARP (Bepul va Tez)
1. Cloudflare WARP'ni yuklab oling: https://1.1.1.1/
2. O'rnating va yoqing
3. Cursor'ni to'liq yoping (Task Manager'da ham tekshiring)
4. Cursor'ni qayta ishga tushiring

#### Boshqa VPN Variantlar:
- **ProtonVPN** (bepul variant mavjud)
- **Windscribe** (bepul variant mavjud)
- **Turbo VPN**
- Yoki sizning mavjud VPN xizmatingiz

### 2. Cursor'ni To'liq Qayta Ishga Tushirish

#### Windows'da:
```powershell
# 1. Cursor'ni yoping
# 2. Task Manager'ni oching (Ctrl+Shift+Esc)
# 3. Barcha Cursor jarayonlarini tugating
# 4. Cursor'ni qayta ishga tushiring
```

#### Yoki Command Line orqali:
```powershell
# Cursor jarayonlarini tugatish
taskkill /F /IM "Cursor.exe" /T

# Bir necha soniya kutib, qayta ishga tushiring
```

### 3. Cursor Cache'ni Tozalash

```powershell
# Cursor cache papkasini tozalash
Remove-Item -Recurse -Force "$env:APPDATA\Cursor\Cache" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force "$env:APPDATA\Cursor\Code Cache" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force "$env:APPDATA\Cursor\GPUCache" -ErrorAction SilentlyContinue
```

### 4. Internet Ulanishini Tekshirish

```powershell
# Google DNS'ga ping qiling
ping 8.8.8.8

# Cursor serverlariga ulanishni tekshiring
Test-NetConnection -ComputerName api.cursor.sh -Port 443
```

### 5. Firewall Sozlamalarini Tekshirish

Windows Firewall Cursor'ni bloklab qo'ygan bo'lishi mumkin:
1. Windows Defender Firewall'ni oching
2. "Allow an app through firewall" ni tanlang
3. Cursor'ni toping va Internet access'ni yoqing

### 6. Proxy Sozlamalarini Tekshirish

Agar korporativ proxy ishlatayotgan bo'lsangiz:
1. Cursor Settings'ga kiring
2. Proxy sozlamalarini tekshiring
3. Kerak bo'lsa, proxy'ni o'chiring yoki sozlang

## Tekshirish

Cursor'ni qayta ishga tushirganingizdan keyin:
1. Cursor'ning status bar'ida ulanish holatini tekshiring
2. AI funksiyalarini sinab ko'ring (Ctrl+K yoki Ctrl+L)
3. Terminal'da build ishlarini tekshiring

## Qo'shimcha Maslahatlar

- **VPN doimiy yoqib qo'yish**: Agar muammo takrorlansa, VPN'ni doimiy yoqib qo'ying
- **DNS o'zgartirish**: Google DNS (8.8.8.8) yoki Cloudflare DNS (1.1.1.1) ishlatish
- **Antivirus tekshiruvi**: Ba'zi antivirus dasturlar Cursor'ni bloklab qo'yishi mumkin

## Agar Muammo Davom Etsa

1. Cursor'ning status bar'ida xato xabarlarini tekshiring
2. Cursor'ning log fayllarini ko'ring: `%APPDATA%\Cursor\logs`
3. Cursor support'ga murojaat qiling: support@cursor.sh






