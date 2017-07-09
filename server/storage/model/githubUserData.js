class GithubUserData { // eslint-disable-line
  constructor() {
    this.followers = [];
    this.following = [];
    this.repositories = [];
  }

  addFollowers(newFollowers) {
    this.followers = this.followers.concat(newFollowers);
  }

  addFollowing(newFollowing) {
    this.following = this.following.concat(newFollowing);
  }

  addRepositories(newRepositories) {
    this.repositories = this.repositories.concat(newRepositories);
  }

  getRepositories() {
    return this.repositories;
  }
}

export default GithubUserData;
