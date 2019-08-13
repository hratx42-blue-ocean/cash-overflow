const expect = require('chai').expect;
// const chaiHttp = require('chai-http');
const request = require('supertest');
const app = require('../server.js');
// Tests can also be written with 'expect' rather than 'should' if desired
// const expect = chai.expect;

// chai.use(chaiHttp);

describe('GET /', () => {
  let result;
  before('setup request', async () => {
    result = await request(app).get('/');
  });

  it('responds with html', () => expect(result.type).to.equal('text/html'));

  it('responds with status code of 200', () =>
    expect(result.status).to.equal(200));

  it('serves compressed content', () => {
    const regex = /Accept-Encoding: gzip/g;
    const match = result.req._header.match(regex).length > 0;
    expect(match).to.equal(true);
  });
});

describe('POST /', () => {
  let result;
  before('setup request', async () => {
    result = await request(app).post('/');
  });

  it('responds with status code 404', () =>
    expect(result.status).to.equal(404));
});
