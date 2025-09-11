import Link from 'next/link';
import { getBaseUrl } from '@/lib/base-url';

export const dynamic = 'force-dynamic';

type User = { id:number; name:string; email:string };
type Post = { id:number; title:string; body:string; authorId:number };

async function getData() {
  const base = getBaseUrl();
  const [usersRes, postsRes] = await Promise.all([
    fetch(`${base}/api/users`, { cache: 'no-store' }),
    fetch(`${base}/api/posts`, { cache: 'no-store' }),
  ]);
  if (!usersRes.ok || !postsRes.ok) throw new Error('Failed to fetch users/posts');
  const [users, posts] = await Promise.all([usersRes.json(), postsRes.json()]) as [User[], Post[]];
  const map = new Map(users.map(u => [u.id, u]));
  return { posts, authors: map };
}

export default async function PostsPage() {
  const { posts, authors } = await getData();
  return (
    <section>
      <h1>Posts (SSR via /api/posts)</h1>
      <ul className="list">
        {posts.map(p => (
          <li key={p.id}>
            <Link href={`/posts/${p.id}`}><b>{p.title}</b></Link>
            <div style={{ color: '#666' }}>by {authors.get(p.authorId)?.name ?? 'Unknown'}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
