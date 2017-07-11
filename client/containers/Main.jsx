import { connect } from 'react-redux';
import MainPage from '../components/MainPage';
import actions from '../actions';

const mapDispatchToProps = dispatch => ({
  handleGithubProfileClick: () =>
    dispatch(actions.redirect('/analysis-request')),
  handleFindPathClick: () => dispatch(actions.redirect('/explore'))
});

export default connect(null, mapDispatchToProps)(MainPage);
