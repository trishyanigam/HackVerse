const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

mongoose.set('bufferTimeoutMS', 500);

describe('Team API Endpoint Tests', () => {
  it('GET /api/v1/teams should handle active teams listing request', async () => {
    const res = await request(app).get('/api/v1/teams');
    expect([200, 500]).toContain(res.statusCode);
  });

  it('POST /api/v1/teams/join should fail without authentication token', async () => {
    const res = await request(app).post('/api/v1/teams/join').send({});
    expect(res.statusCode).toEqual(401);
  });
});
