const agent = require('superagent-promise')(require('superagent'), Promise);
const statusCode = require('http-status-codes');
const { expect, assert } = require('chai');

describe('Github put request', () => {
  const urlBase = 'https://api.github.com';
  const username = 'aperdomob';

  describe('following aperdomob', () => {
    let responseQuery;

    before(() => {
      responseQuery = agent.put(`${urlBase}/user/following/${username}`)
        .auth('token', process.env.ACCESS_TOKEN);
    });

    it('should return NO_CONTENT', () =>
      responseQuery.then((response) => {
        expect(response.status).to.eql(statusCode.NO_CONTENT);
        expect(response.body).to.eql({});
      }));
  });

  describe('users list', () => {
    let usersQuery;

    before(() => {
      usersQuery = agent.get(`${urlBase}/user/following`)
        .auth('token', process.env.ACCESS_TOKEN)
        .then(response => response.body.find(user => user.login === username));
    });

    it('should follow aperdomob', () =>
      usersQuery.then(user => assert.exists(user)));
  });

  describe('follow aperdomob again', () => {
    let followUserAgainQuery;

    before(() => {
      followUserAgainQuery = agent.put(`${urlBase}/user/following/${username}`)
        .auth('token', process.env.ACCESS_TOKEN);
    });

    it('method is idempotent', () => {
      followUserAgainQuery.then((response) => {
        expect(response.status).to.eql(statusCode.NO_CONTENT);
        expect(response.body).to.eql({});
      });
    });
  });
  describe('users list again', () => {
    let userQuery;
    before(() => {
      userQuery = agent.get(`${urlBase}/user/following`)
        .auth('token', process.env.ACCESS_TOKEN)
        .then(response => response.body.find(user => user.login === username));
    });

    it('should follow aperdomob again', () =>
      userQuery.then(user => assert.exists(user)));
  });
});
