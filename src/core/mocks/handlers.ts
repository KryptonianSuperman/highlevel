import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://example.com/posts', () => {
    return HttpResponse.json([
      { id: 1, title: 'Mock Post 1', body: 'This is from MSW' },
      { id: 2, title: 'Mock Post 2', body: 'This is from MSW' },
    ]);
  }),
];
