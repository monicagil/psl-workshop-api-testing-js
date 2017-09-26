const agent = require('superagent-promise')(require('superagent'), Promise);
const { expect } = require('chai');

const userName = 'aperdomob';
const urlBase = 'https://api.github.com';

describe('Github get request', () => {
  const name = 'Alejandro Perdomo';
  const company = 'PSL';
  const location = 'Colombia';
  describe(`when get ${userName} user`, () => {
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
});
