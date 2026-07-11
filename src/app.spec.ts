/// <reference types="jest" />

import request from 'supertest';
import { createApp } from 'src/app';

describe('app', () => {
  const app = createApp();

  it('GET /api/health/hello returns 200 and greeting', async () => {
    const res = await request(app).get('/api/health/hello');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'hello server' });
  });
});
