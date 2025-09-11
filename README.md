# Next.js App Router API & Caching Demo

## การติดตั้ง
```bash
npm install
```

## รันโหมดพัฒนา
```bash
npm run dev
```

## สร้าง Production Build
```bash
npm run build
npm start
```

## Deploy ไป Vercel
```bash
npm install -g vercel
vercel
```

## Pages
- `/` → Home (ดึง API ด้วย ISR)
- `/dashboard` → Dashboard รวมลิงก์ไป SSR/ISR/No-Cache
- `/ssr` → Server-Side Rendering
- `/isr` → Incremental Static Regeneration (10s)
- `/no-cache` → ไม่มี cache
