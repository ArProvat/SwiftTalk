const request = require('supertest');
const express = require('express');
const app = require('../index');

describe('Server', () => {
  let server;

  beforeAll((done) => {
    server = app.listen(done);
  });

  afterAll((done) => {
    server.close(done);
  });
});
