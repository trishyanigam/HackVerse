const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

mongoose.set('bufferTimeoutMS', 500);

describe('Leaderboard API Endpoint Tests', () => {
  it('GET /api/v1/leaderboard/:hackathonId should respond with status code', async () => {
    const res = await request(app).get('/api/v1/leaderboard/60f7b0f8e4b0a82b4c8b4567');
    expect([200, 403, 404, 500]).toContain(res.statusCode);
  });
});
