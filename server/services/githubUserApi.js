import GitHubApi from 'github';
import notifications from './notifications';
import dataStorage from '../storage/dataStorage';

const github = GitHubApi();

function getGithubUserFollowers(message) {
  github.users.getFollowersForUser({ username: message.username, per_page: 10 }, function getFollowers(err, res) { //eslint-disable-line
    const followers = res.data;
    dataStorage.addGithubUserFollowers(message.id, followers);
    if (github.hasNextPage(res)) {
      github.getNextPage(res, getFollowers);
    }
  });
}

function handleUser(message) {
  console.log(message);
  github.users.getForUser({ username: message.username }, (err, res) => {
    const user = res.data;
    dataStorage.addGithubUser(message.id);
    notifications.sendUser(message.id, user);

    getGithubUserFollowers(message);
  });
}

export default { handleUser };
