class GithubUserData { // eslint-disable-line
  constructor() {
    this.followers = [];
  }

  addFollowers(newFollowers) {
    this.followers = this.followers.concat(newFollowers);
  }
}

export default GithubUserData;
