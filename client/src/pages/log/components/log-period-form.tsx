import { useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { format, startOfDay } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { SubmitButton } from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { usePeriodApi } from '@/hooks/use-period-api';
import { PERIOD_API_ROUTES } from '@/lib/period-api-routes';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  periodStartDate: z.date({
    error: 'Start date is required.',
  }),
  periodLength: z.coerce
    .number<number>({
      error: 'Duration is required.',
    })
    .min(1, { error: 'Duration should be at least 1 day.' })
    .max(10, { error: 'Duration should be at most 10 days.' }),
});

type FormValues = z.infer<typeof formSchema>;

export function LogPeriodForm() {
  const [isPending, startTransition] = useTransition();
  const { authenticatedFetch } = usePeriodApi();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      periodStartDate: startOfDay(new Date()),
      periodLength: 5,
    },
  });

  const logPeriod = async (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      const result = await authenticatedFetch(PERIOD_API_ROUTES.CREATE, {
        method: 'POST',
        body: JSON.stringify(values),
      });

      if (result) {
        toast.success('Period saved successfully!');
      } else {
        toast.error('Failed to save period.');
      }
    });
  };

  return (
    <Card className="mb-6 border-0 dark:bg-gradient-to-br dark:from-rose-950 dark:via-gray-950 dark:to-gray-950">
      <CardHeader>
        <CardTitle>Log a Period</CardTitle>
        <CardDescription>
          Add a past or current period to improve your cycle predictions.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(logPeriod)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="periodStartDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Period Start Date</FormLabel>
                  <FormDescription>
                    Select the first day this period began.
                  </FormDescription>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />{' '}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="periodLength"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration (days)</FormLabel>
                  <FormDescription>
                    How many days did this period last?
                  </FormDescription>
                  <FormControl className="w-[240px]">
                    <Input type="number" placeholder="e.g., 5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SubmitButton isSubmitting={isPending}>Save Period</SubmitButton>
          </CardContent>
        </form>
      </Form>
    </Card>
  );
}
