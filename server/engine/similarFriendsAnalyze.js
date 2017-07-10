import GitHubApi from 'github';
import dataStorage from '../storage/dataStorage';
import cosineSimilarity from './cosineSimilarity';

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
  console.log('similarity with ' + repoOwnerUsername + ': ' + similarity);
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
    addToFriendsStatistics(id, numberOfRepositories, repository.owner.login, res.data);
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
  friendsStatistics[id] = {};
  dataStorage.getGithubUserFollowers(id).forEach((follower) => {
    friendsStatistics[id][follower.login] = {
      analyzedNumber: 0,
      result: {}
    }

    computeRepositoriesStatistics(id, follower.login);
  });
}

export default { computeSimilarityWithFollowers };
