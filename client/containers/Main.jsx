import { connect } from 'react-redux';
import MainPage from '../components/MainPage';
import actions from '../actions';

const mapDispatchToProps = dispatch => ({
  handleGithubProfileClick: () =>
    dispatch(actions.redirect('/github-profile-analysis')),
  handleFindPathClick: () => dispatch(actions.redirect('/development-path'))
});

export default connect(null, mapDispatchToProps)(MainPage);
