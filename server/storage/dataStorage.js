import GithubUserData from './model/githubUserData';

const githubUserData = {};

function addGithubUser(id) {
  githubUserData[id] = new GithubUserData();
  console.log(id);
}

function addGithubUserInterestingRepositories(id, newRepositories) {
  githubUserData[id].addToInterestingRepositories(newRepositories);
}

function setGithubUserEmptyFriendsList(id, value) {
  githubUserData[id].setEmptyFriendList(value);
}

function addGithubUserFollowers(id, newFollowers) {
  githubUserData[id].addFollowers(newFollowers);
}

function addGithubUserFollowing(id, newFollowing) {
  githubUserData[id].addFollowing(newFollowing);
}

function addGithubUserRepos(id, newRepositories) {
  githubUserData[id].addRepositories(newRepositories);
}

function addGithubUserSimilarityPercentage(id, username, percentage) {
  githubUserData[id].addSimilarityPercentage(username, percentage);
}

function containsGithubUserSimilarityPercentage(id, username) {
  return githubUserData[id].containsSimilarityPercentage(username);
}

function setGithubUserLanguagesStatistic(id, statistic) {
  githubUserData[id].setLanguagesStatistic(statistic);
}

function getGithubUserRepositories(id) {
  return githubUserData[id].getRepositories();
}

function getGithubUserFollowers(id) {
  return githubUserData[id].getFollowers();
}

function getGithubUserFollowing(id) {
  return githubUserData[id].getFollowing();
}

function getGithubUserLanguagesStatistic(id) {
  return githubUserData[id].getLanguagesStatistic();
}

function getGithubUserNumberOfFriends(id) {
  return githubUserData[id].getNumberOfFriends();
}

function getGithubUserSimilarityPercentage(id) {
  return githubUserData[id].getSimilarityPercentage();
}

function getGithubUserFriendByUsername(id, username) {
  return githubUserData[id].getFriendByUsername(username);
}

function getGithubUserEmptyFriendList(id) {
  return githubUserData[id].getEmptyFriendList();
}

function getGithubUserInterestingRepositories(id) {
  return githubUserData[id].getInterestingRepositories();
}

export default {
  addGithubUserInterestingRepositories,
  setGithubUserEmptyFriendsList,
  addGithubUser,
  addGithubUserFollowers,
  addGithubUserFollowing,
  addGithubUserRepos,
  addGithubUserSimilarityPercentage,
  containsGithubUserSimilarityPercentage,
  setGithubUserLanguagesStatistic,
  getGithubUserRepositories,
  getGithubUserFollowers,
  getGithubUserFollowing,
  getGithubUserLanguagesStatistic,
  getGithubUserNumberOfFriends,
  getGithubUserSimilarityPercentage,
  getGithubUserFriendByUsername,
  getGithubUserEmptyFriendList,
  getGithubUserInterestingRepositories
};
