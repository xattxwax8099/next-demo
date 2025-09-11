import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'Next.js App Router Caching Demo',
  description: 'Demo: SSR vs ISR vs No-Cache with On-Demand Revalidation',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="p-4 bg-gray-100 border-b">
          <Link href="/" className="mr-4">Home</Link>
          <Link href="/dashboard" className="mr-4">Dashboard</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
