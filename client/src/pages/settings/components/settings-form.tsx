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

const AVG_CYCLE_LENGTH_VALIDATION_ERR_MSG =
  'According to the American College of Obstetricians and Gynecologists, a cycle length of 21 to 35 days is within the normal range. If your average cycle is below 21 days or above 35 days, your cycle may be irregular, so speak to a health care professional for more information.';
const AVG_PERIOD_LENGTH_VALIDATION_ERR_MSG =
  'According to the American College of Obstetricians and Gynecologists, a typical period lasts between two to seven days. If your period lasts less than two days or more than seven days, you may be experiencing abnormal bleeding. Speak to a health care professional for more information.';

const formSchema = z.object({
  averageCycleLength: z.coerce
    .number<number>()
    .min(21, AVG_CYCLE_LENGTH_VALIDATION_ERR_MSG)
    .max(35, AVG_CYCLE_LENGTH_VALIDATION_ERR_MSG),
  averagePeriodLength: z.coerce
    .number<number>()
    .min(2, AVG_PERIOD_LENGTH_VALIDATION_ERR_MSG)
    .max(7, AVG_PERIOD_LENGTH_VALIDATION_ERR_MSG),
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
          length of your menstrual cycle and period. This will help improve the
          accuracy of your future cycle predictions.
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
                  <FormLabel>Average cycle length (days)</FormLabel>
                  <FormControl>
                    <Input type="number" inputMode="numeric" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the average number of days between the start of one
                    period and the start of the next. This is used to predict
                    your next period.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="averagePeriodLength"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Average period length (days)</FormLabel>
                  <FormControl>
                    <Input type="number" inputMode="numeric" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the average number of days that your period lasts.
                    This is used to predict the end of your period.
                  </FormDescription>
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
