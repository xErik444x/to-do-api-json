const express = require('express');
const request = require('supertest');

const app = new express();
app.use('/', require("./health"));

describe('Health Check', function () {
  test('responds to /', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });
});