class GithubUserData { // eslint-disable-line
  constructor() {
    this.followers = [];
    this.following = [];
    this.repositories = [];
    this.languagesStatistic = {};
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

  containsSimilarityPercentage(username) {
    if (this.similarityPercentages.hasOwnProperty(username)) {
      return true;
    }
    return false;
  }

  setLanguagesStatistic(statistics) {
    this.languagesStatistic = statistics;
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

  getLanguagesStatistic() {
    return this.languagesStatistic;
  }
}

export default GithubUserData;
