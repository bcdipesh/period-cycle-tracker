import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <section className="text-center my-10">
      <header className="space-y-3">
        <h1 className="bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-6xl font-bold text-transparent dark:from-rose-400 dark:to-purple-400">
          404
        </h1>
        <span className="mb-10 bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent dark:from-rose-400 dark:to-purple-400">
          Page Not Found
        </span>
        <p className="text-muted-foreground mb-8 text-xl leading-relaxed">
          Oops! The page you're looking for seems to have wandered off. Let's
          get you back on track with your health journey.
        </p>
      </header>

      <Button asChild>
        <Link to="/">
          <ArrowLeft /> Go back to home
        </Link>
      </Button>
    </section>
  );
}
