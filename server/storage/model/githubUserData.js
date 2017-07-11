class GithubUserData { // eslint-disable-line
  constructor() {
    this.followers = [];
    this.following = [];
    this.repositories = [];
    this.languagesStatistic = {};
    this.similarityPercentages = [];
    this.emptyFriendList = false;
  }

  setEmptyFriendList(value) {
    this.emptyFriendList = value;
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

  getNumberOfFriends() {
    let numberOfFriends = this.following.length;
    this.followers.forEach((follower) => {
      if (!this.following.some(followingUser => follower.login === followingUser.login)) {
        numberOfFriends++;
      }
    });
    return numberOfFriends;
  }

  getSimilarityPercentage() {
    return this.similarityPercentages;
  }

  getFriendByUsername(username) {
    let retVal = {};
    this.following.forEach((followingUser) => {
      if (followingUser.login === username) {
        retVal = followingUser;
      }
    });
    this.followers.forEach((follower) => {
      if (follower.login === username) {
        retVal = follower;
      }
    });

    return retVal;
  }

  getEmptyFriendList() {
    return this.emptyFriendList;
  }
}

export default GithubUserData;
