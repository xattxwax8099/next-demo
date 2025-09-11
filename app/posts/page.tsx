import Link from 'next/link';
import { getBaseUrl } from '@/lib/base-url';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type User = { id:number; name:string; email:string };
type Post = { id:number; title:string; body:string; authorId:number };

async function getData() {
  const base = getBaseUrl();
  const [uRes, pRes] = await Promise.all([
    fetch(`${base}/api/users`, { cache: 'no-store' }),
    fetch(`${base}/api/posts`, { cache: 'no-store' }),
  ]);
  if (!uRes.ok || !pRes.ok) {
    return { error: `users:${uRes.status} posts:${pRes.status}`, posts: [], authors: new Map<number,User>() };
  }
  const [users, posts] = await Promise.all([uRes.json(), pRes.json()]) as [User[], Post[]];
  const map = new Map(users.map(u => [u.id, u]));
  return { posts, authors: map };
}

export default async function PostsPage() {
  const data = await getData() as any;
  if (data.error) return <p style={{color:'#c00'}}>Failed to load → {data.error}</p>;
  return (
    <section>
      <h1>Posts (SSR via /api/posts)</h1>
      <ul className="list">
        {data.posts.map((p:Post) => (
          <li key={p.id}>
            <Link href={`/posts/${p.id}`}><b>{p.title}</b></Link>
            <div style={{ color: '#666' }}>by {data.authors.get(p.authorId)?.name ?? 'Unknown'}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
