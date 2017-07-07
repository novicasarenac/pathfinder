import GitHubApi from 'github';

const github = GitHubApi();

function handleUser(name) {
  github.users.getForUser({ username: name }, (err, res) => {
    const user = res.data;
    console.log(user);
  });
}

export default { handleUser };
