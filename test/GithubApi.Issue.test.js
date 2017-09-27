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

  describe('get all repositories', () => {
    let oneRepository;
    let issue;
    const newIssue = { title: 'title new issue' };
    before(() => {
      const repositoriesQuery = agent.get(user.repos_url)
        .auth('token', process.env.ACCESS_TOKEN)
        .then((response) => {
          const { body } = response;
          oneRepository = body.shift();
        });
      return repositoriesQuery;
    });

    it('should have some repository', () => {
      expect(oneRepository).to.not.equal(undefined);
    });

    describe('create a new issue', () => {
      before(() => {
        const newIssueRequest = agent.post(`${urlBase}/repos/${user.login}/${oneRepository.name}/issues`, newIssue)
          .auth('token', process.env.ACCESS_TOKEN)
          .then((response) => {
            issue = response.body;
          });
        return newIssueRequest;
      });

      it('should be created', () => {
        expect(issue.id).to.not.equal(undefined);
        expect(issue.title).to.equal(newIssue.title);
        expect(issue.body).to.equal(null);
      });
    });

    describe('modify an issue', () => {
      let modifiedIssue;
      const updateIssue = { body: 'body.....' };
      before(() => {
        const modifiedIssueQuery = agent.patch(`${urlBase}/repos/${user.login}/${oneRepository.name}/issues/${issue.number}`, updateIssue)
          .auth('token', process.env.ACCESS_TOKEN)
          .then((response) => {
            modifiedIssue = response.body;
          });

        return modifiedIssueQuery;
      });

      it('then add the body', () => {
        expect(modifiedIssue.title).to.equal(newIssue.title);
        expect(modifiedIssue.body).to.equal(updateIssue.body);
      });
    });
  });
});
