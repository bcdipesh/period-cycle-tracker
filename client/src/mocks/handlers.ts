import { HttpResponse, delay, http } from 'msw';

import { PERIOD_API_ROUTES } from '@/lib/period-api-routes';

export const handlers = [
  http.get(PERIOD_API_ROUTES.GET_LATEST, async () => {
    // Await a random realistic server response time.
    await delay();

    return HttpResponse.json({
      id: 'abc-123',
      startDate: new Date('07/12/2025'),
      endDate: new Date('07/16/2025'),
    });
  }),
];
