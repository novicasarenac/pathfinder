import { push } from 'react-router-redux';

export default {
  redirect(url) {
    return dispatch => dispatch(push(url));
  }
};
