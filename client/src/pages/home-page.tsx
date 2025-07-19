import { useEffect } from 'react';
import { Bell, Calendar, Shield, TrendingUp } from 'lucide-react';
import { Link } from 'react-router';
import { useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function HomePage() {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      navigate('/dashboard');
    }
  }, [isLoaded, isSignedIn, navigate]);

  if (!isLoaded) {
    return (
      <div className="container mx-auto max-w-md px-4 py-16">
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-[448px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 max-w-xl" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="container mx-auto max-w-6xl px-4 py-16 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent md:text-6xl dark:from-rose-400 dark:to-purple-400">
            Track Your Cycle with Confidence
          </h1>
          <p className="text-muted-foreground mb-8 text-xl leading-relaxed">
            Take control of your menstrual health with our simple, private, and
            intuitive period tracking app. Get personalized insights and never
            be caught off guard again.
          </p>
          <div className="space-x-4">
            <Button size="lg" asChild>
              <Link to="/sign-up">Get Started Free</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/sign-in">I Have an Account</Link>
            </Button>
          </div>
        </div>

        {/* App Preview */}
        <div className="mx-auto mt-16 max-w-sm">
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-rose-400 to-purple-500 opacity-20 blur-lg"></div>
            <Card className="relative overflow-hidden rounded-3xl border-0 py-0 shadow-2xl">
              <CardContent className="p-0">
                <div className="bg-gradient-to-br from-rose-100 to-purple-100 p-6 dark:from-rose-950 dark:to-purple-950">
                  <div className="dark:bg-background/30 rounded-2xl bg-white p-4 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="font-semibold">Current Cycle</h3>
                      <div className="h-6 w-6 rounded-full bg-rose-100"></div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-2 rounded-full bg-rose-200">
                        <div className="h-2 w-3/5 rounded-full bg-rose-400"></div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div>
                          <p className="font-medium">Last Period</p>
                          <p className="text-muted-foreground">Apr 15</p>
                        </div>
                        <div>
                          <p className="font-medium">Fertile</p>
                          <p className="text-muted-foreground">Apr 26-30</p>
                        </div>
                        <div>
                          <p className="font-medium">Next Period</p>
                          <p className="text-muted-foreground">May 13</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto max-w-6xl px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Everything You Need to Track Your Health
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            Our comprehensive tracking tools help you understand your body
            better and make informed decisions about your health.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-0 p-6 text-center shadow-sm transition-shadow hover:shadow-md dark:bg-gradient-to-br dark:from-rose-950 dark:via-gray-950 dark:to-gray-950">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100">
              <Calendar className="h-6 w-6 text-rose-600" />
            </div>
            <h3 className="mb-2 font-semibold">Smart Calendar</h3>
            <p className="text-muted-foreground text-sm">
              Visual calendar with color-coded tracking for periods, fertile
              windows, and ovulation.
            </p>
          </Card>

          <Card className="border-0 p-6 text-center shadow-sm transition-shadow hover:shadow-md dark:bg-gradient-to-br dark:from-rose-950 dark:via-gray-950 dark:to-gray-950">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="mb-2 font-semibold">Cycle Insights</h3>
            <p className="text-muted-foreground text-sm">
              Get personalized insights and predictions based on your unique
              cycle patterns.
            </p>
          </Card>

          <Card className="border-0 p-6 text-center shadow-sm transition-shadow hover:shadow-md dark:bg-gradient-to-br dark:from-rose-950 dark:via-gray-950 dark:to-gray-950">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100">
              <Shield className="h-6 w-6 text-rose-600" />
            </div>
            <h3 className="mb-2 font-semibold">Private & Secure</h3>
            <p className="text-muted-foreground text-sm">
              Your data is encrypted and stored securely. Only you have access
              to your information.
            </p>
          </Card>

          <Card className="border-0 p-6 text-center shadow-sm transition-shadow hover:shadow-md dark:bg-gradient-to-br dark:from-rose-950 dark:via-gray-950 dark:to-gray-950">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
              <Bell className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="mb-2 font-semibold">Smart Reminders</h3>
            <p className="text-muted-foreground text-sm">
              Never miss important dates with customizable notifications and
              reminders.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto max-w-6xl px-4 py-16">
        <Card className="border-0 bg-gradient-to-br from-rose-500 to-purple-600 text-white dark:from-rose-950 dark:via-gray-950 dark:to-gray-950">
          <CardContent className="p-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">
              Ready to Take Control of Your Health?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-rose-100">
              Join thousands of women who trust CycleTracker to help them
              understand their bodies better. Start tracking today and discover
              patterns you never knew existed.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
              asChild
            >
              <Link to="/sign-up">Start Tracking Free</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
