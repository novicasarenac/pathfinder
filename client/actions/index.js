import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';
import api from '../api';

export default {
  redirect(url) {
    return dispatch => dispatch(push(url));
  },

  startGithubProfileAnalysis(username) {
    return dispatch =>
      api
        .userExists(username)
        .catch((error) => {
          if (error.response) {
            throw new SubmissionError({
              username: `User ${username} does not exists!`
            });
          } else {
            throw new SubmissionError({
              username: "Can't connect to Github right now. Try again later."
            });
          }
        })
        .then(() => api.startAnalysis(username));
  },

  onWsMessage(message) {
    return dispatch => console.log(message);
  }
};
