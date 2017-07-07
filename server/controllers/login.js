import githubApi from './../services/githubApi';

export default function login(req, res) {
  const username = req.body;
  const user = githubApi.getUser(username.username);
  console.log(user);
  res.sendStatus(200);
}
