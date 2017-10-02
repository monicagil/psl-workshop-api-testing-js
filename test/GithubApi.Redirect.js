const agent = require('superagent-promise')(require('superagent'), Promise);
const { expect } = require('chai');
const statusCode = require('http-status-codes');

describe('Github HEAD request', () => {
  const urlBase = 'https://github.com/aperdomob/redirect-test';
  const newurlBase = 'https://github.com/aperdomob/new-redirect-test';
  describe('get head redirect-test', () => {
    let headQuery;

    before(() => {
      headQuery = agent.head(urlBase);
    });

    it('should have information', () =>
      headQuery.catch((error) => {
        expect(error.response.headers.location).to.equal(newurlBase);
        expect(error.status).to.equal(statusCode.MOVED_PERMANENTLY);
      }));

    describe('verify redirect', () => {
      let oldRequest;

      before(() => {
        oldRequest = agent
          .get(urlBase);
      });

      it('should be redirected', () =>
        oldRequest.then((response) => {
          expect(response.status).to.equal(statusCode.OK);
        }));
    });
  });
});