import { headers } from 'next/headers';

/**
 * Return absolute base URL for server-side fetch.
 * - Browser: '' (use relative)
 * - Vercel: https://<VERCEL_URL> or NEXT_PUBLIC_SITE_URL if set
 * - Local dev: http://localhost:<port> or from request headers
 */
export function getBaseUrl() {
  if (typeof window !== 'undefined') return '';

  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  try {
    const h = headers();
    const host = h.get('host');
    if (host) return `http://${host}`;
  } catch { /* no request context during some phases */ }

  // Fallback for local dev / tests
  return `http://localhost:${process.env.PORT ?? 3000}`;
}
