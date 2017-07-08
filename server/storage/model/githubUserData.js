class GithubUserData { // eslint-disable-line
  constructor() {
    this.followers = [];
    this.following = [];
  }

  addFollowers(newFollowers) {
    this.followers = this.followers.concat(newFollowers);
  }

  addFollowing(newFollowing) {
    this.following = this.following.concat(newFollowing);
  }
}

export default GithubUserData;
