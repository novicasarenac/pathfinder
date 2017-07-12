import { connect } from 'react-redux';
import ExplorerPage from '../components/ExplorerPage';
import actions from '../actions';

const mapStateToProps = state => ({
  isWaiting: state.explorer.isWaiting
});

const mapDispatchToProps = dispatch => ({
  handleBack: () => dispatch(actions.redirect('/')),
  onSubmit: (areas) => {
    dispatch({ type: 'EXPLORE_REQUEST_SENT' });
    return dispatch(actions.exploreGithub(areas));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ExplorerPage);
