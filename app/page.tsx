// app/page.tsx
import { getBaseUrl } from '../lib/base-url';

async function getData() {
  const base = getBaseUrl(); // << ได้ absolute เสมอใน server
  const res = await fetch(`${base}/api/data`, {
    next: { revalidate: 10 },
  });
  if (!res.ok) throw new Error('Failed to fetch /api/data');
  return res.json();
}

export default async function Home() {
  const data = await getData();
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Next.js App Router API & Caching Demo</h1>
      <div className="mt-4 p-4 border rounded">
        <p><strong>Message:</strong> {data.message}</p>
        <p><strong>Timestamp:</strong> {data.timestamp}</p>
      </div>
    </main>
  );
}
