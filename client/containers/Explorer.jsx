import { connect } from 'react-redux';
import ExplorerPage from '../components/ExplorerPage';
import actions from '../actions';

const mapDispatchToProps = dispatch => ({
  handleBack: () => dispatch(actions.redirect('/')),
  onSubmit: areas => dispatch(actions.exploreGithub(areas))
});

export default connect(null, mapDispatchToProps)(ExplorerPage);
