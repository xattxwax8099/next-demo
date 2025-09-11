# Next.js API-first (SSR) • Vercel-ready

โปรเจกต์ตัวอย่าง Next.js (App Router) ที่ **หน้าเพจดึงข้อมูลผ่าน API โดยตรง** (ไม่ import จาก data) และ deploy บน Vercel ได้ทันที

## โครงสร้างหลัก
```
app/
  api/
    health/route.ts
    users/route.ts
    posts/route.ts
    posts/[id]/route.ts
  users/page.tsx
  posts/page.tsx
  posts/[id]/page.tsx
  layout.tsx
  page.tsx
lib/
  base-url.ts
  data.ts            # mock data (ใช้ใน API เท่านั้น)
```

## รันในเครื่อง
```bash
npm install
npm run dev
# http://localhost:3000
```

## Build & Run
```bash
npm run build
npm start
```

## Deploy บน Vercel
1. สร้าง repo และ push โค้ดนี้
2. ไปที่ https://vercel.com → New Project → เลือก repo → Deploy
3. (แนะนำ) ตั้ง ENV `NEXT_PUBLIC_SITE_URL=https://<โดเมนของคุณ>` ใน Project Settings

## จุดเด่น
- หน้าเพจใช้ **SSR** (`dynamic = 'force-dynamic'`) เพื่อให้ fetch API ตอน request-time ไม่ไป fetch ตอน build
- `lib/base-url.ts` คืน **absolute URL** ที่ถูกต้องทั้งบน local และบน Vercel (รองรับ x-forwarded headers)
- มี `GET /api/health` สำหรับเช็คสถานะที่ Production

ลองเรียก:
- `/api/users`, `/api/posts`, `/api/posts/101`, `/api/health`
- หน้า: `/`, `/users`, `/posts`, `/posts/101`
