import { NextResponse } from 'next/server';
import { getPosts } from '@/lib/data';

export const revalidate = 10;

export async function GET() {
  const data = await getPosts();
  return NextResponse.json(data, {
    headers: { 'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=59' }
  });
}
