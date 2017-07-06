const express = require('express');
const app = express();
const port = 9000;
const config = require('./config');
const githubOAuth = require('github-oauth')({
  githubClient: config.CLIENT_ID,
  githubSecret: config.CLIENT_SECRET,
  baseURL: 'http://localhost:' + port,
  loginURI: '/',
  callbackURI: '/callback'
});

app.listen(port, function() {
  console.log('Application is running!');
});

app.get('/', function(req, res) {
  console.log('OAuth started!');
  return githubOAuth.login(req, res);
});

app.get('/callback', function(req, res) {
  console.log('Received callback!');
  console.log(res);
  return githubOAuth.callback(req, res);
});
