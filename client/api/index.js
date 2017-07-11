import axios from 'axios';

export default {
  startAnalysis(username, socketId) {
    const url = `${process.env.API_URL}/analysis`;

    return axios.post(url, { username, id: socketId });
  },

  exploreGithub(areas) {
    const url = `${process.env.API_URL}/explore`;

    return axios.post(url, { areas });
  }
};
