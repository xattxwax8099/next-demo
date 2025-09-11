import { NextResponse } from 'next/server';
import { getPost, getAuthor } from '@/lib/data';

export async function GET(_: Request, context: { params: { id: string } }) {
  const id = Number(context.params.id);
  const post = await getPost(id);
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const author = await getAuthor(post.authorId);
  return NextResponse.json({ post, author: author ?? null }, {
    headers: { 'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=59' }
  });
}
