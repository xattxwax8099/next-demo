import { serverFetch } from '@/lib/server-fetch';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type User = { id:number; name:string; email:string };

async function getUsers(): Promise<User[] | { error: string }> {
  const res = await serverFetch('/api/users');
  if (!res.ok) return { error: `status:${res.status}` };
  return res.json();
}

export default async function UsersPage() {
  const data = await getUsers();
  if ('error' in data) {
    return <p style={{ color:'#c00' }}>Failed to load users → {data.error}</p>;
  }
  return (
    <section>
      <h1>Users (SSR via /api/users)</h1>
      <ul className="list">
        {data.map(u => (
          <li key={u.id}>
            <b>{u.name}</b> — <span style={{ color: '#666' }}>{u.email}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
