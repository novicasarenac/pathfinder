class GithubUserData { // eslint-disable-line
  constructor() {
    this.followers = [];
    this.following = [];
    this.repositories = [];
    this.similarityPercentages = [];
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

  addSimilarityPercentage(username, percentage) {
    this.similarityPercentages[username] = percentage;
  }

  getRepositories() {
    return this.repositories;
  }

  getFollowers() {
    return this.followers;
  }

  getFollowing() {
    return this.following;
  }
}

export default GithubUserData;
