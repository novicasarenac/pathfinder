import GitHubApi from 'github';
import dataStorage from '../storage/dataStorage';
import githubUserLanguagesAnalyze from '../engine/githubUserLanguagesAnalyze';

const github = GitHubApi();
github.authenticate({
  type: 'oauth',
  key: process.env.CLIENT_ID,
  secret: process.env.CLIENT_SECRET
});

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
  github.repos.getForUser({ username: message.username, per_page: 15 }, function getRepos(err, res) {
    const repos = res.data;
    dataStorage.addGithubUserRepos(message.id, repos);
    if (github.hasNextPage(res)) {
      github.getNextPage(res, getRepos);
    } else {
      githubUserLanguagesAnalyze.analyzeLanguages(message.id);
    }
  });
}

function handleUser(message, response) {
  console.log(message);
  github.users.getForUser({ username: message.username }, (err, res) => {
    if (err !== null) {
      response.sendStatus(404);
    } else {
      const user = res.data;
      dataStorage.addGithubUser(message.id);
      response.send(user);

      getGithubUserFollowers(message);
      getGithubUserFollowing(message);
      getGithubUserRepositories(message);
    }
  });
}

export default { handleUser };
