export const PERIOD_API_BASE = '/api/periods';

export const PERIOD_API_ROUTES = {
  GET_ALL: `${PERIOD_API_BASE}`,
  GET_LATEST: `${PERIOD_API_BASE}/latest`,
  GET_BY_ID: (id: string | number) => `${PERIOD_API_BASE}/${id}`,
  CREATE: `${PERIOD_API_BASE}`,
  UPDATE: (id: string | number) => `${PERIOD_API_BASE}/${id}`,
  DELETE: (id: string | number) => `${PERIOD_API_BASE}/${id}`,
  GET_PERIOD_SETTINGS: `${PERIOD_API_BASE}/settings`,
  UPDATE_PERIOD_SETTINGS: `${PERIOD_API_BASE}/settings`,
};
