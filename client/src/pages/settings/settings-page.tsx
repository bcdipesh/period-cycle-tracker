import { useEffect, useState } from 'react';

import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { usePeriodApi } from '@/hooks/use-period-api';
import { PERIOD_API_ROUTES } from '@/lib/period-api-routes';

import { SettingsForm } from './components/settings-form';
import { SettingsFormSkeleton } from './components/settings-form-skeleton';

interface UserSettings {
  averageCycleLength: number;
  averagePeriodLength: number;
}

export default function SettingsPage() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { authenticatedFetch } = usePeriodApi();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const userSettings = await authenticatedFetch(
          PERIOD_API_ROUTES.GET_PERIOD_SETTINGS,
        );
        setSettings(userSettings);
      } catch (error) {
        console.error('Failed to fetch settings', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, [authenticatedFetch]);

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
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      {isLoading ? (
        <SettingsFormSkeleton />
      ) : (
        <SettingsForm settings={settings!} />
      )}
    </main>
  );
}
