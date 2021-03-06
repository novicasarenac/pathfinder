import GitHubApi from 'github';
import dataStorage from '../storage/dataStorage';
import githubUserLanguagesAnalyze from '../engine/githubUserLanguagesAnalyze';
import similarFriendsAnalyze from '../engine/similarFriendsAnalyze';
import interestingRepositoriesAnalyze from '../engine/githubUserRepozitoriesAnalyze';
import notifications from '../services/notifications';

const github = GitHubApi();
github.authenticate({
  type: 'oauth',
  key: process.env.CLIENT_ID,
  secret: process.env.CLIENT_SECRET
});

function getGithubUserFollowers(message) {
  return new Promise((resolve, reject) => {
    github.users.getFollowersForUser({ username: message.username, per_page: 50 }, function getFollowers(err, res) { //eslint-disable-line
      const followers = res.data;
      dataStorage.addGithubUserFollowers(message.id, followers);

      if (followers.length === 0 && dataStorage.getGithubUserFollowing(message.id).length === 0) {
        if (dataStorage.getGithubUserEmptyFriendList(message.id)) {
          notifications.sendSimilarityWithFriends(message.id);
        } else {
          dataStorage.setGithubUserEmptyFriendsList(message.id, true);
        }
      }

      if (github.hasNextPage(res)) {
        github.getNextPage(res, getFollowers);
      } else {
        resolve();
        similarFriendsAnalyze.computeSimilarityWithFollowers(message.id);
      }
    });
  });
}

function getGithubUserFollowing(message) {
  return new Promise((resolve, reject) => {
    github.users.getFollowingForUser({ username: message.username, per_page: 50 }, function getFollowing(err, res) { //eslint-disable-line
      const following = res.data;
      dataStorage.addGithubUserFollowing(message.id, following);

      if (following.length === 0 && dataStorage.getGithubUserFollowers(message.id).length === 0) {
        if (dataStorage.getGithubUserEmptyFriendList(message.id)) {
          notifications.sendSimilarityWithFriends(message.id);
        } else {
          dataStorage.setGithubUserEmptyFriendsList(message.id, true);
        }
      }

      if (github.hasNextPage(res)) {
        github.getNextPage(res, getFollowing);
      } else {
        resolve();
        similarFriendsAnalyze.computeSimilarityWithFollowing(message.id);
      }
    });
  });
}

function getGithubUserRepositories(message) {
  github.repos.getForUser({ username: message.username, per_page: 50 }, function getRepos(err, res) {
    const repos = res.data;
    dataStorage.addGithubUserRepos(message.id, repos);

    if (repos.length === 0) {
      notifications.sendLanguagesStatistics(message.id, {});
    }

    if (github.hasNextPage(res)) {
      github.getNextPage(res, getRepos);
    } else {
      Promise.all(githubUserLanguagesAnalyze.analyzeLanguages(message.id)).then((values) => {
        values.forEach((value) => {
          githubUserLanguagesAnalyze.addToLanguageAnalyzeResult(value.id, value.repositoriesLength, value.data); //eslint-disable-line
        });
        let resolved = false;
        getGithubUserFollowers(message).then(() => {
          if (resolved) {
            interestingRepositoriesAnalyze.computeInterestingRepositories(message.id);
          } else {
            resolved = true;
          }
        });
        getGithubUserFollowing(message).then(() => {
          if (resolved) {
            interestingRepositoriesAnalyze.computeInterestingRepositories(message.id);
          } else {
            resolved = true;
          }
        });
      });
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

      getGithubUserRepositories(message);
    }
  });
}

export default { handleUser };
