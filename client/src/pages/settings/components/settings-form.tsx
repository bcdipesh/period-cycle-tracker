import { useEffect, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

import { SubmitButton } from '@/components/submit-button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { usePeriodApi } from '@/hooks/use-period-api';
import { PERIOD_API_ROUTES } from '@/lib/period-api-routes';

const formSchema = z.object({
  averageCycleLength: z.coerce
    .number<number>()
    .min(20, 'Cycle length should be at least 20 days.')
    .max(90, 'Cycle length cannot exceed 90 days.'),
  averagePeriodLength: z.coerce
    .number<number>()
    .min(1, { error: 'Period length should be at least 1 day.' })
    .max(10, { error: 'Period length should be at most 10 days.' }),
});

type UserSettings = z.infer<typeof formSchema>;

interface SettingsFormProps {
  settings: UserSettings;
}

export function SettingsForm({ settings }: SettingsFormProps) {
  const [isPending, startTransition] = useTransition();
  const { authenticatedFetch } = usePeriodApi();

  const form = useForm<UserSettings>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      averageCycleLength: settings.averageCycleLength ?? 28,
      averagePeriodLength: settings.averagePeriodLength ?? 5,
    },
  });

  useEffect(() => {
    if (settings) {
      form.reset(settings);
    }
  }, [settings, form]);

  const onSubmit = (data: UserSettings) => {
    startTransition(async () => {
      const result = await authenticatedFetch(
        PERIOD_API_ROUTES.UPDATE_PERIOD_SETTINGS,
        {
          method: 'POST',
          body: JSON.stringify(data),
        },
      );

      if (result) {
        form.reset(result);
        toast.success('Settings updated successfully.');
      } else {
        toast.error('Failed to update settings.');
      }
    });
  };

  return (
    <Card className="mb-6 border-0 dark:bg-gradient-to-br dark:from-rose-950 dark:via-gray-950 dark:to-gray-950">
      <CardHeader>
        <CardTitle>Cycle Settings</CardTitle>
        <CardDescription>
          Customize your cycle tracking experience by adjusting the average
          length of your menstrual cycle and period.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="averageCycleLength"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Average Cycle Length</FormLabel>
                  <FormDescription>
                    This is the average length of your menstrual cycle in days.
                  </FormDescription>
                  <FormControl>
                    <Input type="number" inputMode="numeric" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="averagePeriodLength"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Average Period Length</FormLabel>
                  <FormDescription>
                    This is the average length of your menstrual period in days.
                  </FormDescription>
                  <FormControl>
                    <Input type="number" inputMode="numeric" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SubmitButton isSubmitting={isPending}>Save Changes</SubmitButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
