import { NextResponse } from 'next/server';
import { getUsers } from '@/lib/data';

export async function GET() {
  const data = await getUsers();
  return NextResponse.json(data, {
    headers: { 'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=59' }
  });
}
