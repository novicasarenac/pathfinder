import GitHubApi from 'github';
import notifications from './notifications';

const github = GitHubApi();

function handleUser(message) {
  console.log(message);
  github.users.getForUser({ username: message.username }, (err, res) => {
    const user = res.data;
    console.log(user);
    notifications.sendUser(message.id, user);
  });
}

export default { handleUser };
