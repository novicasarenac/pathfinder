import axios from 'axios';

export default {
  userExists(username) {
    const githubUrl = `https://api.github.com/users/${username}`;

    return axios.get(githubUrl);
  },

  startAnalysis(username, socketId) {
    const url = `${process.env.API_URL}/analysis`;

    axios.post(url, { username, id: socketId });
  }
};
