import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import { ClerkProvider } from '@clerk/clerk-react';
import '@/index.css';

import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import HomePage from '@/pages/home-page';
import DashboardPage from '@/pages/dashboard/dashboard-page';
import NotFound from '@/pages/not-found';
import SignIn from '@/components/sign-in';
import SignUp from '@/components/sign-up';
import SettingsPage from '@/pages/settings/settings-page';
import { ThemeProvider } from '@/components/theme-provider';
import { ProtectedRoute } from '@/components/protected-route';
import { Toaster } from '@/components/ui/sonner';

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing Clerk Publishable Key');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <ThemeProvider
        defaultTheme="dark"
        storageKey="period-cycle-tracker-app-theme"
      >
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<HomePage />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <SettingsPage />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Route>

            <Route element={<AuthLayout />}>
              <Route path="/sign-in/*" element={<SignIn />} />
              <Route path="/sign-up/*" element={<SignUp />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ClerkProvider>
    <Toaster position="top-center" />
  </StrictMode>
);
