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
      startDate: new Date('2025-08-01T14:00:00.000Z'),
      endDate: new Date('2025-08-05T14:00:00.000Z'),
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

  http.post(PERIOD_API_ROUTES.CREATE, async ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    // Await a random realistic server response time.
    await delay();
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new HttpResponse(JSON.stringify({ message: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const period = await request.clone().json();

    return HttpResponse.json(period);
  }),
];
