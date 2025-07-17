import { useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectPath?: string;
}

export function ProtectedRoute({
  children,
  redirectPath = '/sign-in',
}: ProtectedRouteProps) {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const shouldRedirect = isLoaded && !isSignedIn;
    if (shouldRedirect) {
      navigate(redirectPath);
    }
  }, [isLoaded, isSignedIn, navigate, redirectPath]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return null;
  }

  return children;
}
