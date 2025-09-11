import { getBaseUrl } from '@/lib/base-url';

export const dynamic = 'force-dynamic'; // don't prerender, fetch at request-time
// export const fetchCache = 'force-no-store'; // alternative

async function getSummary() {
  const base = getBaseUrl();
  const [usersRes, postsRes] = await Promise.all([
    fetch(`${base}/api/users`, { cache: 'no-store' }),
    fetch(`${base}/api/posts`, { cache: 'no-store' }),
  ]);
  if (!usersRes.ok || !postsRes.ok) {
    throw new Error('Failed to fetch /api/users or /api/posts');
  }
  const [users, posts] = await Promise.all([usersRes.json(), postsRes.json()]);
  return { usersCount: users.length, postsCount: posts.length };
}

export default async function Home() {
  const { usersCount, postsCount } = await getSummary();
  return (
    <section>
      <h1>Next.js App Router: API-first (SSR fetch)</h1>
      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
        <div className="card">
          <h3>Users</h3>
          <p>Total: <b>{usersCount}</b></p>
        </div>
        <div className="card">
          <h3>Posts</h3>
          <p>Total: <b>{postsCount}</b></p>
        </div>
      </div>
      <p style={{ marginTop: 12, color: '#666' }}>
        This page calls <code>/api/users</code> and <code>/api/posts</code> on each request.
      </p>
    </section>
  );
}
