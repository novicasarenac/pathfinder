import githubApi from './../services/githubUserApi';

export default function login(req, res) {
  const message = req.body;
  githubApi.handleUser(message);
  res.sendStatus(200);
}
