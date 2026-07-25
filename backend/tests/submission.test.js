const request = require('supertest');
const app = require('../app');

describe('Submission API Endpoint Tests', () => {
  it('GET /api/v1/submissions/my should fail without authentication', async () => {
    const res = await request(app).get('/api/v1/submissions/my');
    expect(res.statusCode).toEqual(401);
  });

  it('POST /api/v1/submissions should require auth bearer token', async () => {
    const res = await request(app).post('/api/v1/submissions').send({
      projectName: 'Test Project',
    });
    expect(res.statusCode).toEqual(401);
  });
});
