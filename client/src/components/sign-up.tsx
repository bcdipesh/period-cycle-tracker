import { SignUp as ClerkSignUp } from '@clerk/clerk-react';
import { useOutletContext } from 'react-router';

import { getFormAppearance } from '@/lib/clerk';

export default function SignUp() {
  const currentAppTheme = useOutletContext() as string;

  return (
    <ClerkSignUp
      appearance={getFormAppearance(currentAppTheme)}
      signInUrl="/sign-in"
    />
  );
}
