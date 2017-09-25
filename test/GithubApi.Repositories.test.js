  it('Consume GET Service with query parameters', () => {
    const query = {
      name: 'Alejandro Perdomo',
      company: 'PSL',
      location: 'Colombia'
    };

    return agent.get('https://api.github.com/users/aperdomob')
      .query(query)
      .then((response) => {
        expect(response.status).to.equal(statusCode.OK);
        expect(response.body.args).to.eql(query);
      });
  });
