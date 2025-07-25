import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router';

import { Logo } from '@/components/logo';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="container mx-auto max-w-6xl px-4 py-6">
      <div className="flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-4">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Button variant="ghost" asChild>
              <Link to="/sign-in">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/sign-up">Sign Up</Link>
            </Button>
          </SignedOut>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
