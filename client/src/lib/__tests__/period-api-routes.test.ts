import { describe, expect, test } from 'vitest';

import { PERIOD_API_ROUTES } from '../period-api-routes';

describe('PERIOD_API_ROUTES', () => {
  test('returns correct api route for getting all periods', () => {
    const routes = PERIOD_API_ROUTES;
    expect(routes.GET_ALL).toBe('/api/periods');
  });

  test('returns correct api route for getting the latest period', () => {
    const routes = PERIOD_API_ROUTES;
    expect(routes.GET_LATEST).toBe('/api/periods/latest');
  });

  test('returns correct api route for getting a period with the id of 1', () => {
    const routes = PERIOD_API_ROUTES;
    expect(routes.GET_BY_ID(1)).toBe('/api/periods/1');
  });

  test('returns correct api route for creating a new period', () => {
    const routes = PERIOD_API_ROUTES;
    expect(routes.CREATE).toBe('/api/periods');
  });

  test('returns correct api route for updating a period with the id of 1', () => {
    const routes = PERIOD_API_ROUTES;
    expect(routes.UPDATE(1)).toBe('/api/periods/1');
  });

  test('returns correct api route for deleting a period with the id of 1', () => {
    const routes = PERIOD_API_ROUTES;
    expect(routes.DELETE(1)).toBe('/api/periods/1');
  });

  test('returns correct api route for getting periods settings', () => {
    const routes = PERIOD_API_ROUTES;
    expect(routes.GET_PERIOD_SETTINGS).toBe('/api/periods/settings');
  });

  test('returns correct api route for updating periods settings', () => {
    const routes = PERIOD_API_ROUTES;
    expect(routes.UPDATE_PERIOD_SETTINGS).toBe('/api/periods/settings');
  });
});
