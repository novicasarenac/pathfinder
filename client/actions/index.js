import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';
import api from '../api';

export default {
  redirect(url) {
    return dispatch => dispatch(push(url));
  },

  startGithubProfileAnalysis(username) {
    return dispatch =>
      api.userExists(username).catch((error) => {
        throw new SubmissionError({
          username: `User ${username} does not exists!`
        });
      });
  }
};
