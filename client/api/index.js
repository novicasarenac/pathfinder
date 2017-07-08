import axios from 'axios';

export default {
  userExists(username) {
    const githubUrl = `https://api.github.com/users/${username}`;

    return axios.get(githubUrl);
  },

  startAnalysis(username) {
    const url = `${process.env.API_URL}/user`;

    axios.post(url, { username });
  }
};
