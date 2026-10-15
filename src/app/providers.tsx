'use client';

import { GlobalFilterProvider } from '@/context/GlobalFilterContext';
import { AuthProvider } from '@/context/AuthContext';
import AuthModal from '@/components/auth/AuthModal';

/**
 * Wraps the app in AuthProvider and GlobalFilterProvider so that any page can consume
 * useAuth() and useGlobalFilter(). The global AuthModal is rendered here.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <GlobalFilterProvider>
        {children}
        <AuthModal />
      </GlobalFilterProvider>
    </AuthProvider>
  );
}
