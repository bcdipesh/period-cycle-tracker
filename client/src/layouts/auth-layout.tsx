import { Outlet } from 'react-router';

import { useTheme } from '@/hooks/use-theme';

export default function AuthLayout() {
  const { theme: currentAppTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50 p-4 antialiased dark:from-rose-950 dark:via-gray-950 dark:to-gray-950 flex justify-center items-center">
      <Outlet context={currentAppTheme} />
    </div>
  );
}
