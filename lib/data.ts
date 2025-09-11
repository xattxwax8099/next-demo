export type User = { id: number; name: string; email: string };
export type Post = { id: number; title: string; body: string; authorId: number };

const USERS: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' }
];

const POSTS: Post[] = [
  { id: 101, title: 'Hello Next.js', body: 'This is a mock post about Next.js.', authorId: 1 },
  { id: 102, title: 'Deploy on Vercel', body: 'Deploying is easy with Vercel.', authorId: 2 },
  { id: 103, title: 'App Router Demo', body: 'Multiple pages and mock APIs.', authorId: 1 },
  { id: 104, title: 'SSR Fetch FTW', body: 'Pages fetch API directly.', authorId: 3 }
];

export async function getUsers() { return USERS.map(u => ({ ...u })); }
export async function getPosts() { return POSTS.map(p => ({ ...p })); }
export async function getPost(id: number) {
  const p = POSTS.find(x => x.id === id);
  return p ? { ...p } : null;
}
export async function getAuthor(userId: number) {
  const u = USERS.find(x => x.id === userId);
  return u ? { ...u } : null;
}
