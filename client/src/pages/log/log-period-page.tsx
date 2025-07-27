import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';

import { LogPeriodForm } from './components/log-period-form';

export default function LogPeriodPage() {
  const navigate = useNavigate();

  return (
    <main className="mx-auto max-w-md">
      <div className="mb-8 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Go back</span>
        </Button>
        <h1 className="text-2xl font-bold">Log Period</h1>
      </div>

      <LogPeriodForm />
    </main>
  );
}
