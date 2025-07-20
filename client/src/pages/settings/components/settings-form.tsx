import { useEffect, useTransition } from 'react';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

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

const formSchema = z.object({
  averageCycleLength: z.coerce
    .number()
    .min(20, 'Must be at least 20')
    .optional(),
  averagePeriodLength: z.coerce
    .number()
    .min(1, 'Must be at least 1')
    .optional(),
});

type UserSettings = z.infer<typeof formSchema>;

interface SettingsFormProps {
  settings: UserSettings;
}

export function SettingsForm({ settings }: SettingsFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<UserSettings>({
    // @ts-expect-error Unable to resolve the unknown type in the formSchema
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
      const result = await new Promise<UserSettings>((resolve) =>
        setTimeout(() => resolve(data), 2000)
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Cycle Settings</CardTitle>
            <CardDescription>
              Customize your cycle tracking experience by adjusting the average
              length of your menstrual cycle and period.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
                    <Input {...field} />
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <SubmitButton isSubmitting={isPending}>Save Changes</SubmitButton>
        </div>
      </form>
    </Form>
  );
}
