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

export default { addGithubUser, addGithubUserFollowers, addGithubUserFollowing, addGithubUserRepos };
