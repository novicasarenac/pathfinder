import githubApi from './../services/githubApi';

export default function login(req, res) {
  const username = req.body;
  githubApi.getUser(username.username);
  res.sendStatus(200);
}
