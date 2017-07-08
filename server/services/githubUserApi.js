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

/*function getFollowersForUser(message) {
  github.users.getFollowersForUser({ username: message.username }, (err, res) => {

  })
}*/

export default { handleUser };
