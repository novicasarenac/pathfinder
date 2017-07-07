const config = require('./../config');
const githubOAuth = require('github-oauth')({
  githubClient: config.CLIENT_ID,
  githubSecret: config.CLIENT_SECRET,
  baseURL: 'http://localhost:' + config.port,
  loginURI: '/',
  callbackURI: '/callback'
});

githubOAuth.on('error', function(err) {
  console.error('There was login error!', err);
});

githubOAuth.on('token', function(token, serverResponse) {
  console.log('TOKEN: ' + token);
  serverResponse.end(JSON.stringify(token));
});

exports.login = function(req, res) {
  console.log('OAuth started!');
  return githubOAuth.login(req, res);
};

exports.callback = function(req, res) {
  console.log('Received callback!');
  console.log(res);
  return githubOAuth.callback(req, res);
};
