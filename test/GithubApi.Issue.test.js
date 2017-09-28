const agent = require('superagent-promise')(require('superagent'), Promise);
const { expect } = require('chai');

describe('Github post patch request', () => {
  const urlBase = 'https://api.github.com';
  let user;
  before(() => {
    const userQuery = agent.get(`${urlBase}/user`)
      .auth('token', process.env.ACCESS_TOKEN)
      .then((response) => {
        user = response.body;
      });
    return userQuery;
  });

  it('should have repositories', () => {
    expect(user.public_repos).to.be.above(0, 'noooooooooooo why ??');
  });
});
