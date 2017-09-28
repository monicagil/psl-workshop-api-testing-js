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

  it('should have gist', () => {
    guistQuery.then((response) => {
      bodygist = response.body;
      expect(response.status).to.equal(statusCode.CREATED);
      expect(bodygist).to.containSubset(myFirstPromise);
    });
  });

  describe(' get the new gist', () => {
    let gistQuery;

    before(() => {
      gistQuery = agent
        .get(bodygist.url)
        .auth('token', process.env.ACCESS_TOKEN);
    });

    it('Gist exists', () =>
      gistQuery.then(response => expect(response.status).to.equal(statusCode.OK)));
  });

  describe('delete a gist', () => {
    let deleteGistQuery;

    before(() => {
      deleteGistQuery = agent
        .del(bodygist.url)
        .auth('token', process.env.ACCESS_TOKEN);
    });

    it('then the gist should be deleted', () =>
      deleteGistQuery
        .then(response => expect(response.status).to.equal(statusCode.NO_CONTENT)));
  });

   describe('get the delete gist', () => {
        let notExistGist;

        before(() => {
          notExistGist = agent
            .get(gist.url)
            .auth('token', process.env.ACCESS_TOKEN);
        });

        it('then the Gits should not be accessible', () =>
          notExistGist
            .catch(response => expect(response.status).to.equal(statusCode.NOT_FOUND)));
      });
});
