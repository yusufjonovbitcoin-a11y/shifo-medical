# Web Saytni Ishga Tushirish - Ko'rsatma

## Development Server (Development Rejimi)

### Ishga Tushirish:
```bash
npm run dev
```

### Ochish:
Brauzerda quyidagi manzilni oching:
- **http://localhost:3000**
- yoki **http://127.0.0.1:3000**

### Xususiyatlar:
- ✅ Hot reload (o'zgarishlar avtomatik yangilanadi)
- ✅ Development mode (batafsil xatolar)
- ✅ Barcha network interfeyslarida ochiq (0.0.0.0)

---

## Production Build (Production Rejimi)

### Build Qilish:
```bash
npm run build
```

### Ishga Tushirish:
```bash
npm start
```

### Ochish:
- **http://localhost:3000**

### Xususiyatlar:
- ✅ Optimizatsiya qilingan
- ✅ Production mode
- ✅ Tezroq ishlaydi

---

## Port O'zgartirish

Agar 3000 port band bo'lsa:

```bash
# Port belgilash
PORT=3001 npm run dev

# Yoki Windows'da:
set PORT=3001 && npm run dev
```

---

## Network'dan Kirish (Boshqa Qurilmalardan)

Server `0.0.0.0` da ishlayapti, shuning uchun:

1. Kompyuteringizning IP manzilini toping:
```powershell
ipconfig
```

2. Boshqa qurilmada (telefon, tablet) oching:
```
http://[SIZNING-IP-MANZILINGIZ]:3000
```

Masalan: `http://192.168.1.100:3000`

---

## Muammolarni Hal Qilish

### Port band bo'lsa:
```bash
# Jarayonni topish
netstat -ano | findstr :3000

# Jarayonni tugatish (PID o'rniga jarayon ID)
taskkill /PID [PID] /F
```

### Cache muammosi:
```bash
# .next papkasini o'chirish
rm -rf .next

# Qayta build qilish
npm run build
```

### Node modules muammosi:
```bash
# node_modules va package-lock.json ni o'chirish
rm -rf node_modules package-lock.json

# Qayta o'rnatish
npm install
```

---

## Tekshirish

Server ishga tushganini tekshirish:
- Browser'da `http://localhost:3000` ni oching
- Terminal'da "Ready" xabari ko'rinishi kerak
- Hech qanday xato bo'lmasligi kerak

---

## To'xtatish

Server'ni to'xtatish uchun terminal'da:
- **Ctrl + C** bosing






