exports.login = function(req, res) {
  console.log('OAuth started!');
  return githubOAuth.login(req, res);
};
