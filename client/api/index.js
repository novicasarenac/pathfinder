import axios from 'axios';

export default {
  userExists(username) {
    const githubUrl = `https://api.github.com/users/${username}`;

    return axios.get(githubUrl);
  }
};
