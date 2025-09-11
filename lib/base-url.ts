// lib/base-url.ts
import { headers } from 'next/headers';

export function getBaseUrl() {
  // ฝั่งเบราว์เซอร์ → ใช้ relative ไปเลย
  if (typeof window !== 'undefined') return '';

  // ถ้าตั้งค่าไว้เอง
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;

  // บน Vercel (Production/Preview)
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  // ---- Local Dev / Node server ----
  // กรณี prerender/ISR ตอน build บางทีไม่มี headers() → ครอบ try/catch ไว้
  try {
    const h = headers();
    const host = h.get('host');
    if (host) {
      // next dev ปกติคือ localhost:3000
      const isLocalhost = host.startsWith('localhost') || host.startsWith('127.0.0.1');
      return `http://${host || `localhost:${process.env.PORT ?? 3000}`}`;
    }
  } catch { /* ไม่มี request headers ตอน prerender ก็จะมาทาง fallback ด้านล่าง */ }

  // fallback สุดท้ายสำหรับเครื่อง local
  return `http://localhost:${process.env.PORT ?? 3000}`;
}
