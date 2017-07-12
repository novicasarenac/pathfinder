import { connect } from 'react-redux';
import ExplorerResultPage from '../components/ExplorerResultPage';
import actions from '../actions';

const mapStateToProps = state => ({
  recommendedRepos: state.explorer.recommendedRepos
});

const mapDispatchToProps = dispatch => ({
  handleBack: () => dispatch(actions.redirect('/explore')),
  handleMain: () => dispatch(actions.redirect('/'))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExplorerResultPage);
