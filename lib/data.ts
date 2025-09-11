export type User = { id: number; name: string; email: string };
export type Post = { id: number; title: string; body: string; authorId: number };

// จำลองฐานข้อมูลในหน่วยความจำ (mock)
const USERS: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' }
];

const POSTS: Post[] = [
  { id: 101, title: 'Hello Next.js', body: 'This is a mock post about Next.js.', authorId: 1 },
  { id: 102, title: 'Deploy on Vercel', body: 'Deploying is easy with Vercel.', authorId: 2 },
  { id: 103, title: 'App Router Demo', body: 'Multiple pages and mock APIs.', authorId: 1 },
  { id: 104, title: 'ISR Works!', body: 'This page demonstrates ISR behavior.', authorId: 3 }
];

// helper หน่วงเวลาเพื่อจำลอง API ช้า (ถ้าต้องการ)
function sleep(ms: number) {
  return new Promise(res => setTimeout(res, ms));
}

// ฟังก์ชันที่หน้าเพจ & API ใช้ร่วมกัน
export async function getUsers() {
  // await sleep(100); // uncomment ถ้าอยากเห็นโรดดิ้ง
  return USERS.map(u => ({ ...u }));
}

export async function getPosts() {
  // await sleep(120);
  return POSTS.map(p => ({ ...p }));
}

export async function getPost(id: number) {
  // await sleep(80);
  const post = POSTS.find(p => p.id === id);
  return post ? { ...post } : null;
}

export async function getAuthor(userId: number) {
  const user = USERS.find(u => u.id === userId);
  return user ? { ...user } : null;
}
