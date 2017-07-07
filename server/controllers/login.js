import githubApi from './../services/githubUserApi';

export default function login(req, res) {
  const username = req.body;
  githubApi.handleUser(username.username);
  res.sendStatus(200);
}
