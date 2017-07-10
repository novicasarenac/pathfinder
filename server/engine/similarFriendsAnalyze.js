/* eslint-disable max-len */
import GitHubApi from 'github';
import dataStorage from '../storage/dataStorage';
import cosineSimilarity from './cosineSimilarity';
import notifications from '../services/notifications';

const github = GitHubApi();
github.authenticate({
  type: 'oauth',
  key: process.env.CLIENT_ID,
  secret: process.env.CLIENT_SECRET
});

const friendsStatistics = {};

function computeFriendStatistics(id, repoOwnerUsername) {
  const percentages = {};
  const allPercentages = {};
  let sum = 0;
  Object.keys(friendsStatistics[id][repoOwnerUsername].result).forEach((key) => {
    sum += friendsStatistics[id][repoOwnerUsername].result[key];
  });

  Object.keys(friendsStatistics[id][repoOwnerUsername].result).forEach((key) => {
    allPercentages[key] = friendsStatistics[id][repoOwnerUsername].result[key] * 100 / sum;
  });

  const sorted = Object.keys(allPercentages).sort((a, b) => allPercentages[b] - allPercentages[a]);

  for (var i = 0; i < (sorted.length > 9 ? 9 : sorted.length); i++) { //eslint-disable-line
    percentages[sorted[i]] = allPercentages[sorted[i]];
  }

  const similarity = cosineSimilarity.computeSimilarity(dataStorage.getGithubUserLanguagesStatistic(id), percentages);
  if (!dataStorage.containsGithubUserSimilarityPercentage(id, repoOwnerUsername)) {
    dataStorage.addGithubUserSimilarityPercentage(id, repoOwnerUsername, similarity);
    console.log('similarity with ' + repoOwnerUsername + ': ' + similarity);
  }
  if (dataStorage.getGithubUserNumberOfFriends(id) === Object.keys(dataStorage.getGithubUserSimilarityPercentage(id)).length) {
    notifications.sendSimilarityWithFriends(id);
  }
}

function addToFriendsStatistics(id, numberOfRepositories, repoOwnerUsername, languages) {
  Object.keys(languages).forEach((key) => {
    if (friendsStatistics[id][repoOwnerUsername].result.hasOwnProperty(key)) {
      friendsStatistics[id][repoOwnerUsername].result[key] = friendsStatistics[id][repoOwnerUsername].result[key] + languages[key];
    } else {
      friendsStatistics[id][repoOwnerUsername].result[key] = languages[key];
    }
  });

  friendsStatistics[id][repoOwnerUsername].analyzedNumber += 1;
  if (numberOfRepositories === friendsStatistics[id][repoOwnerUsername].analyzedNumber) {
    computeFriendStatistics(id, repoOwnerUsername);
  }
}

function computeLanguageStatistics(id, numberOfRepositories, repository) {
  github.repos.getLanguages({ owner: repository.owner.login, repo: repository.name }, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      addToFriendsStatistics(id, numberOfRepositories, repository.owner.login, res.data);
    }
  });
}

function computeRepositoriesStatistics(id, username) {
  github.repos.getForUser({ username, per_page: 15 }, function getRepos(err, res) {
    res.data.forEach((repository) => {
      computeLanguageStatistics(id, res.data.length, repository);
    });

    if (github.hasNextPage(res)) {
      github.getNextPage(res, getRepos);
    }
  });
}

function computeSimilarityWithFollowers(id) {
  if (!friendsStatistics.hasOwnProperty(id)) {
    friendsStatistics[id] = {};
  }
  dataStorage.getGithubUserFollowers(id).forEach((follower) => {
    if (!friendsStatistics[id].hasOwnProperty(follower.login)) {
      friendsStatistics[id][follower.login] = {
        analyzedNumber: 0,
        result: {}
      };

      computeRepositoriesStatistics(id, follower.login);
    }
  });
}

function computeSimilarityWithFollowing(id) {
  if (!friendsStatistics.hasOwnProperty(id)) {
    friendsStatistics[id] = {};
  }
  dataStorage.getGithubUserFollowing(id).forEach((following) => {
    if (!friendsStatistics[id].hasOwnProperty(following.login)) {
      friendsStatistics[id][following.login] = {
        analyzedNumber: 0,
        result: {}
      };

      computeRepositoriesStatistics(id, following.login);
    }
  });
}

export default { computeSimilarityWithFollowers, computeSimilarityWithFollowing };
