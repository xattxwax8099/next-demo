# Next.js Multi-Page Mock API Demo (Vercel-ready)

ตัวอย่างโปรเจกต์ Next.js (App Router) ที่มีหลายเพจ, มี API จำลอง (mock) และ deploy บน Vercel ได้ทันที

## โครงสร้าง
```
app/
  api/
    posts/route.ts
    users/route.ts
  posts/
    [id]/page.tsx
    page.tsx
  users/
    page.tsx
  layout.tsx
  page.tsx
lib/
  data.ts
```

## รันในเครื่อง
```bash
npm install
npm run dev
```

## Build (ทดสอบก่อนขึ้นจริง)
```bash
npm run build && npm start
```

## Deploy ขึ้น Vercel
1. สร้าง repo Git และ push โค้ดนี้
2. เข้า https://vercel.com → New Project → เลือก repo
3. Framework: **Next.js** (Auto)
4. กด Deploy ได้เลย (ไม่มี ENV จำเป็น)

> โปรเจกต์นี้ **ไม่ fetch API ของตัวเองตอน build** — หน้าเพจใช้ฟังก์ชันจาก `lib/data.ts` โดยตรง ทำให้ build ผ่านแน่นอน และยังคงมี ISR (`revalidate = 10`) ให้ดูพฤติกรรม cache ได้

---

**อัปเดต:** ตอนนี้เพจทั้งหมดเรียกข้อมูลผ่าน API (`/api/*`) ด้วย SSR แล้ว (ใช้ `dynamic = 'force-dynamic'`).
โค้ดตัวอย่างอยู่ใน `app/*.tsx` และตัวช่วย `lib/base-url.ts` สำหรับสร้าง absolute URL ตอนรันบน Vercel/Local.
