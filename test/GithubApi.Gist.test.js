const agent = require('superagent-promise')(require('superagent'), Promise);
const chai = require('chai');
const statusCode = require('http-status-codes');

chai.use(require('chai-subset'));

const { expect } = chai;

describe('Github gist request', () => {
  const urlBase = 'https://api.github.com';
  let bodygist;
  let guistQuery;
  const myFirstPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve('¡Yesssssssss!');
    }, 250);
  });

  before(() => {
    guistQuery = agent.post(`${urlBase}/gists`, myFirstPromise)
      .auth('token', process.env.ACCESS_TOKEN);
  });

  it('should have guist', () => {
    guistQuery.then((response) => {
      bodygist = response.body;
      expect(response.status).to.equal(statusCode.CREATED);
      expect(bodygist).to.containSubset(myFirstPromise);
    });
  });
});
