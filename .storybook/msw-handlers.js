import { http, HttpResponse } from 'msw';

export const mswHandlers = [
  http.get('*/api/v1/health', () => {
    return HttpResponse.json({ status: 'ok' });
  }),
];
