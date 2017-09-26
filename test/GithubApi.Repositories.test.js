const agent = require('superagent-promise')(require('superagent'), Promise);
const { expect, assert } = require('chai');

const userName = 'aperdomob';
const urlBase = 'https://api.github.com';

describe('Github get request', () => {
  const name = 'Alejandro Perdomo';
  const company = 'PSL';
  const location = 'Colombia';

  describe(`get ${userName} user`, () => {
    let user;

    before(() => {
      const userQuery = agent.get(`${urlBase}/users/${userName}`)
        .auth('token', process.env.ACCESS_TOKEN)
        .then((response) => {
          user = response.body;
        });
      return userQuery;
    });

    it('Consume GET aperdomob', () => {
      expect(user.name).to.equal(name);
      expect(user.company).to.equal(company);
      expect(user.location).to.equal(location);
    });
  });

  describe('get repo jasmine-awesome-report', () => {
    const repositoryJasmine = 'jasmine-awesome-report';
    const fullName = 'aperdomob/jasmine-awesome-report';
    const descriptionRepo = 'An awesome html report for Jasmine';
    let repositories;
    let repoJasmine;
    before(() => {
      const repositoriesQuery = agent.get(`${urlBase}/users/${userName}/repos`)
        .auth('token', process.env.ACCESS_TOKEN)
        .then((response) => {
          repositories = response.body;
          repoJasmine = repositories.find(repo => repo.name === repositoryJasmine);
        });
      return repositoriesQuery;
    });

    it(`should have ${repositoryJasmine} repository`, () => {
      assert.exists(repoJasmine);
      expect(repoJasmine.full_name).to.equal(fullName);
      expect(repoJasmine.private).to.equal(false);
      expect(repoJasmine.description).to.equal(descriptionRepo);
    });
  });
});
