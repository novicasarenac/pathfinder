import GitHubApi from 'github';

const github = GitHubApi();

function getUser(username) {
  return github.users.getForUser(username);
}

export default { getUser };
