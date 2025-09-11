import { headers } from 'next/headers';

export function getBaseUrl() {
  if (typeof window !== 'undefined') return '';

  // ✅ ใช้โฮสต์ที่ผู้ใช้เปิดอยู่ (รองรับหลายโดเมน/หลาย deployment)
  try {
    const h = headers();
    const host = h.get('x-forwarded-host') ?? h.get('host');
    const proto = h.get('x-forwarded-proto') ?? 'https';
    if (host) return `${proto}://${host}`;
  } catch {}

  // สำรอง (ถ้าจำเป็น)
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}