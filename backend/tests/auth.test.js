const request = require('supertest');
const app = require('../app');

describe('Authentication API Endpoint Tests', () => {
  it('POST /api/v1/auth/register should fail on missing required fields', async () => {
    const res = await request(app).post('/api/v1/auth/register').send({
      email: 'invalid-email',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.success).toBe(false);
  });

  it('POST /api/v1/auth/login should fail on missing body credentials', async () => {
    const res = await request(app).post('/api/v1/auth/login').send({});
    expect(res.statusCode).toEqual(400);
    expect(res.body.success).toBe(false);
  });

  it('GET /api/v1/auth/me should reject request without authorization token', async () => {
    const res = await request(app).get('/api/v1/auth/me');
    expect(res.statusCode).toEqual(401);
    expect(res.body.success).toBe(false);
  });
});
