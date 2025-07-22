import { HttpResponse, delay, http } from 'msw';

import { PERIOD_API_ROUTES } from '@/lib/period-api-routes';

export const handlers = [
  http.get(PERIOD_API_ROUTES.GET_LATEST, async ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    // Await a random realistic server response time.
    await delay();
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new HttpResponse(JSON.stringify({ message: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return HttpResponse.json({
      id: 'abc-123',
      startDate: new Date('07/12/2025'),
      endDate: new Date('07/16/2025'),
    });
  }),

  http.get(PERIOD_API_ROUTES.GET_PERIOD_SETTINGS, async ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    // Await a random realistic server response time.
    await delay();
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new HttpResponse(JSON.stringify({ message: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return HttpResponse.json({
      id: 'abc-456',
      averageCycleLength: 28,
      averagePeriodLength: 5,
    });
  }),

  http.post(PERIOD_API_ROUTES.UPDATE_PERIOD_SETTINGS, async ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    // Await a random realistic server response time.
    await delay();
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new HttpResponse(JSON.stringify({ message: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const updatedSettings = await request.clone().json();

    return HttpResponse.json(updatedSettings);
  }),
];
