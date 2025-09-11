import { headers } from 'next/headers';

/** Return absolute base URL for server-side fetch */
export function getBaseUrl() {
  if (typeof window !== 'undefined') return '';

  const site = process.env.NEXT_PUBLIC_SITE_URL;
  if (site) return site.replace(/\/$/, '');

  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;

  try {
    const h = headers();
    const host = h.get('x-forwarded-host') ?? h.get('host');
    const proto = h.get('x-forwarded-proto') ?? 'http';
    if (host) return `${proto}://${host}`;
  } catch { /* no request context */ }

  return `http://localhost:${process.env.PORT ?? 3000}`;
}
