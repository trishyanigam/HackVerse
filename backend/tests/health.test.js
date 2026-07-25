const request = require('supertest');
const app = require('../app');

describe('Health & Documentation API Tests', () => {
  it('GET / should return welcome message and documentation links', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body).toHaveProperty('documentationUrl', '/api-docs');
  });

  it('GET /api-docs-json should return OpenAPI specification', async () => {
    const res = await request(app).get('/api-docs-json');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('openapi', '3.0.0');
    expect(res.body.info).toHaveProperty('title', 'HackVerse API Portal');
  });

  it('GET /api/v1/health should respond with status payload', async () => {
    const res = await request(app).get('/api/v1/health');
    expect([200, 503]).toContain(res.statusCode);
  });
});
