import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';
import api from '../api';

export default {
  redirect(url) {
    return dispatch => dispatch(push(url));
  },

  startGithubProfileAnalysis(username) {
    return (dispatch, getState) =>
      api
        .startAnalysis(username, getState().ws.id)
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
        .then((response) => {
          dispatch({ type: 'RESET' });
          dispatch({ type: 'USER_RESPONSE_RECEIVED', user: response.data });
          dispatch(push('/analysis'));
        });
  }
};
