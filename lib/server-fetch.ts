import { headers } from 'next/headers';
import { getBaseUrl } from './base-url';

/**
 * Server-side fetch that forwards auth/protection cookies & headers
 * so requests can pass Vercel Password Protection or custom auth.
 */
export async function serverFetch(path: string, init?: RequestInit) {
  const h = headers();
  const cookie = h.get('cookie') ?? '';
  const bypass = h.get('x-vercel-protection-bypass');
  const auth = h.get('authorization');

  const hdrs: Record<string, string> = {
    ...(init?.headers as any || {}),
  };
  if (cookie) hdrs['cookie'] = cookie;
  if (bypass) hdrs['x-vercel-protection-bypass'] = bypass as string;
  if (auth) hdrs['authorization'] = auth as string;

  const res = await fetch(`${getBaseUrl()}${path}`, {
    ...init,
    headers: hdrs,
    cache: 'no-store',
  });
  return res;
}
