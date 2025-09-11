import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    ok: true,
    ts: new Date().toISOString(),
    env: {
      VERCEL_URL: process.env.VERCEL_URL ?? null,
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? null,
      NODE_ENV: process.env.NODE_ENV
    }
  });
}
