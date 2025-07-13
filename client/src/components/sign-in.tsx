import { useOutletContext } from 'react-router';
import { SignIn as ClerkSignIn } from '@clerk/clerk-react';

import { getFormAppearance } from '@/lib/clerk';

export default function SignIn() {
  const currentAppTheme = useOutletContext() as string;

  return (
    <ClerkSignIn
      appearance={getFormAppearance(currentAppTheme)}
      signUpUrl="/sign-up"
    />
  );
}
