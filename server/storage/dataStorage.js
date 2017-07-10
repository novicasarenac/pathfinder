import GithubUserData from './model/githubUserData';

const githubUserData = {};

function addGithubUser(id) {
  githubUserData[id] = new GithubUserData();
  console.log(id);
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

export default {
  addGithubUser,
  addGithubUserFollowers,
  addGithubUserFollowing,
  addGithubUserRepos,
  setGithubUserLanguagesStatistic,
  getGithubUserRepositories,
  getGithubUserFollowers,
  getGithubUserFollowing,
  getGithubUserLanguagesStatistic
};
