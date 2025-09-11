import { getBaseUrl } from '@/lib/base-url';

export const dynamic = 'force-dynamic';

async function getUsers() {
  const base = getBaseUrl();
  const res = await fetch(`${base}/api/users`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch /api/users');
  return res.json() as Promise<Array<{ id:number; name:string; email:string }>>;
}

export default async function UsersPage() {
  const users = await getUsers();
  return (
    <section>
      <h1>Users (SSR via /api/users)</h1>
      <ul className="list">
        {users.map(u => (
          <li key={u.id}>
            <b>{u.name}</b> — <span style={{ color: '#666' }}>{u.email}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
