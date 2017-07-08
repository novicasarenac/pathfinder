import GitHubApi from 'github';

const github = GitHubApi();

function handleUser(message) {
  console.log(message);
  github.users.getForUser({ username: message.username }, (err, res) => {
    const user = res.data;
    console.log(user);
  });
}

export default { handleUser };
