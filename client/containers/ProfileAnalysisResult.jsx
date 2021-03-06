import { connect } from 'react-redux';
import ProfileAnalysisResultPage from '../components/ProfileAnalysisResultPage';
import actions from '../actions';

const mapStateToProps = state => ({
  user: state.profileAnalysis.user,
  languageUsageStats: state.profileAnalysis.languageUsageStats,
  similarFriends: state.profileAnalysis.similarFriends,
  interestingPeople: state.profileAnalysis.interestingPeople,
  recommendedRepos: state.profileAnalysis.recommendedRepos
});

const mapDispatchToProps = dispatch => ({
  handleBack: () => dispatch(actions.redirect('/analysis-request')),
  handleHome: () => dispatch(actions.redirect('/'))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  ProfileAnalysisResultPage
);
