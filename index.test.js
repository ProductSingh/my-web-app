const request = require('supertest');
const express = require('express');

const app = express();
app.get('/', (req, res) => {
  res.send('Hello, Vercel!');
});

describe('GET /', () => {
  it('responds with Hello, Vercel!', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('Hello, Vercel!');
  });
});
