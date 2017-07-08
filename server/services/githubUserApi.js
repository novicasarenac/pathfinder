import GitHubApi from 'github';
import notifications from './notifications';
import dataStorage from '../storage/dataStorage';

const github = GitHubApi();

function handleUser(message) {
  console.log(message);
  github.users.getForUser({ username: message.username }, (err, res) => {
    const user = res.data;
    dataStorage.addGithubUser(message.id);
    notifications.sendUser(message.id, user);
  });
}

export default { handleUser };
