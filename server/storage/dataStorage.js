import GithubUserData from './model/githubUserData';

let githubUserData = {};

function addGithubUser(id) {
  githubUserData[id] = new GithubUserData();
}

export default { addGithubUser };
