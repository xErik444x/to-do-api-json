const express = require('express');
const request = require('supertest');
const fs = require('fs');

const app = new express();
app.use(express.json());
app.use('/', require("./task"));

const tasks = [
  {
    "name": "hola mundo",
    "description": "esto es un test",
    "id": "1ab7fa19-57d7-49d4-8926-427bfdd54249",
    "delete": true,
    "updated": "2023-09-16T16:16:00.565Z"
  },
  {
    "name": "test",
    "description": "esto es un test",
    "id": "1ab7fa19-57d7-49d4-8926-41241231231",
    "updated": "2023-09-16T16:16:00.565Z"
  }
]

describe('Tasks', function () {
  beforeAll(() => {
    jest.spyOn(fs, 'readFileSync').mockImplementation(function () {
      return JSON.stringify(tasks)
    });
    jest.spyOn(fs, 'readFile').mockImplementation((path, callback) => {
      callback(null, JSON.stringify(tasks));
    });
    jest.spyOn(fs, 'existsSync').mockImplementation(() => {
      return true;
    });
    jest.spyOn(fs, 'writeFileSync').mockImplementation((path,update) => {
      return true;
    });
  })

  test('get tasks', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      "tasks":[{
        "name": "test",
        "description": "esto es un test",
        "id": "1ab7fa19-57d7-49d4-8926-41241231231",
        "updated": "2023-09-16T16:16:00.565Z"
      }]
    })
  });

  test('POST / empty -> should return 401', async () => {
    const response = await request(app)
    .post('/')
    .set('Content-type', 'application/json')
    .send()
    .expect(401);
    expect(response.body.message).toEqual('invalid body');
  });

  test('POST / content -> should return 200', async () => {
    await request(app)
    .post('/')
    .set('Content-type', 'application/json')
    .send(JSON.stringify({
      name: "testing",
      description: "test"
    }))
    .expect(201);
  });

  test('PUT / empty -> should return 401', async () => {
    const response = await request(app)
    .put('/ba42dded-37df-48cc-af84-4b16c3c98bd1')
    .set('Content-type', 'application/json')
    .send()
    .expect(401);
    expect(response.body.message).toEqual('invalid body');
  });
  
  test('PUT / content -> should return 200', async () => {
    await request(app)
    .put('/1ab7fa19-57d7-49d4-8926-41241231231')
    .set('Content-type', 'application/json')
    .send(JSON.stringify({
      name: "testing",
      description: "test"
    }))
    .expect(204);
  });

  test('PUT / content -> should return 404 when not found', async () => {
    await request(app)
    .put('/1124asdasd')
    .set('Content-type', 'application/json')
    .send(JSON.stringify({
      name: "testing",
      description: "test"
    }))
    .expect(404);
  });

  test('DELETE /  -> should return 404 when not found', async () => {
    await request(app)
    .delete('/1124asdasd')
    .expect(404);
  });
  test('DELETE /  -> should return 204 when deleted', async () => {
    await request(app)
    .delete('/1ab7fa19-57d7-49d4-8926-41241231231')
    .expect(204);
  });
});