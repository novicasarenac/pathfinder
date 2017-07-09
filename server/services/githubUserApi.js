import GitHubApi from 'github';
import notifications from './notifications';
import dataStorage from '../storage/dataStorage';
import githubUserLanguagesAnalyze from '../engine/githubUserLanguagesAnalyze';

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

function getGithubUserFollowing(message) {
  github.users.getFollowingForUser({ username: message.username, per_page: 10 }, function getFollowing(err, res) { //eslint-disable-line
    const following = res.data;
    dataStorage.addGithubUserFollowing(message.id, following);
    if (github.hasNextPage(res)) {
      github.getNextPage(res, getFollowing);
    }
  });
}

function getGithubUserRepositories(message) {
  github.repos.getForUser({ username: message.username, per_page: 5 }, function getRepos(err, res) {
    const repos = res.data;
    dataStorage.addGithubUserRepos(message.id, repos);
    if (github.hasNextPage(res)) {
      github.getNextPage(res, getRepos);
    } else {
      githubUserLanguagesAnalyze.analyzeLanguages(message.id);
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
    getGithubUserFollowing(message);
    getGithubUserRepositories(message);
  });
}

export default { handleUser };
