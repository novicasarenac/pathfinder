import { connect } from 'react-redux';
import ProfileAnalysisResultPage from '../components/ProfileAnalysisResultPage';
import actions from '../actions';

const mapStateToProps = state => ({
  user: state.profileAnalysis.user,
  languageUsageStats: state.profileAnalysis.languageUsageStats,
  similarFriends: state.profileAnalysis.similarFriends
});

const mapDispatchToProps = dispatch => ({
  redirectToProfileForm: () =>
    dispatch(actions.redirect('github-profile-analysis')),

  redirectToMainPage: () => dispatch(actions.redirect('/'))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  ProfileAnalysisResultPage
);
