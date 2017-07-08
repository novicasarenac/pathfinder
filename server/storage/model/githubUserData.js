class GithubUserData { // eslint-disable-line
  constructor() {
    this.followers = {};
  }

  addFollowers(newFollowers) {
    this.followers.push(newFollowers);
  }
}

export default GithubUserData;
