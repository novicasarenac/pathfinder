import GitHubApi from 'github';

const github = GitHubApi();

function getUser(name) {
  github.users.getForUser({ username: name }, (err, res) => {
    console.log(res.data);
  });
}

export default { getUser };
