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
        .then(() => api.startAnalysis(username, getState().ws.id));
  },

  onWsMessage(message) {
    return (dispatch) => {
      const { type, id } = JSON.parse(message);

      switch (type) {
        case 'CONNECTED':
          dispatch({ type: 'SOCKET_CONNECTED', id });
          break;

        default:
          console.log(message);
      }
    };
  }
};
