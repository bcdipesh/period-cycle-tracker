import { Outlet } from 'react-router';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50 p-4 antialiased dark:from-rose-950 dark:via-gray-950 dark:to-gray-950">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
