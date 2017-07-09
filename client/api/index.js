import axios from 'axios';

export default {
  startAnalysis(username, socketId) {
    const url = `${process.env.API_URL}/analysis`;

    axios.post(url, { username, id: socketId });
  }
};
