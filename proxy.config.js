const proxy = [
    {
      context: '/collegesmaster',
      target: 'http://localhost:8080'
      //pathRewrite: {'^/api' : ''}
    }
  ];
  module.exports = proxy;