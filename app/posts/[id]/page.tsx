import { notFound } from 'next/navigation';
import { getBaseUrl } from '@/lib/base-url';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Post = { id:number; title:string; body:string; authorId:number };
type User = { id:number; name:string };

async function fetchPost(id:number) {
  const base = getBaseUrl();
  const res = await fetch(`${base}/api/posts/${id}`, { cache: 'no-store' });
  if (res.status === 404) return null;
  if (!res.ok) return { error: `status:${res.status}` };
  return res.json() as Promise<{ post: Post; author?: User|null }>;
}

export default async function PostDetail({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const data = await fetchPost(id);
  if (!data) return notFound();
  if ('error' in (data as any)) {
    return <p style={{ color:'#c00' }}>Failed to load → {(data as any).error}</p>;
  }
  const { post, author } = data as { post:Post; author?:User|null };
  return (
    <article>
      <h1>{post.title}</h1>
      <div style={{ color: '#666', marginBottom: 8 }}>
        by {author?.name ?? 'Unknown'} (author #{post.authorId})
      </div>
      <div className="card"><p>{post.body}</p></div>
      <p style={{ marginTop: 12, color: '#666' }}>
        Fetched via <code>/api/posts/{id}</code> at request-time.
      </p>
    </article>
  );
}
