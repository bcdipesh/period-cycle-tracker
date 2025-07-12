import { Link } from 'react-router';

import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="container mx-auto max-w-6xl px-4 py-6">
      <div className="flex items-center justify-between">
        <Logo />
        <div className="space-x-2">
          <Button variant="ghost" asChild>
            <Link to="/sign-in">Sign In</Link>
          </Button>
          <Button asChild>
            <Link to="/sign-up">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
