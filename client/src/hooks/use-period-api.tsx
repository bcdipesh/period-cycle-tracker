import { useCallback } from 'react';

import { useAuth, useClerk } from '@clerk/clerk-react';

export function usePeriodApi() {
  const { getToken } = useAuth();
  const { redirectToSignIn } = useClerk();

  const authenticatedFetch = useCallback(
    async (url: string, options: RequestInit = {}) => {
      const token = await getToken();
      const headers = {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(url, { ...options, headers });
      if (!response.ok) {
        if (response.status === 401) {
          console.error('Unauthorized request. Redirecting to sign-in');
          redirectToSignIn();
          throw new Error('Redirecting to sign-in');
        }
        throw new Error(`API request failed with status ${response.status}`);
      }

      return response.json();
    },
    [getToken, redirectToSignIn],
  );

  return { authenticatedFetch };
}
