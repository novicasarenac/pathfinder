import React, { Component } from 'react';
import { connect } from 'react-redux';
import GithubProfileForm from '../components/GithubProfileForm';
import actions from '../actions';

class GithubProfileAnalysis extends Component {
  handleSubmit(username) {
    this.props.waitResponse();

    return this.props.startAnalysis(username);
  }

  render() {
    return (
      <GithubProfileForm
        onSubmit={values => this.handleSubmit(values.username)}
        handleBack={this.props.handleBack}
        isWaiting={this.props.isWaiting}
      />
    );
  }
}

const mapStateToProps = state => ({
  isWaiting: state.profileAnalysis.isWaiting
});

const mapDispatchToProps = dispatch => ({
  startAnalysis: username =>
    dispatch(actions.startGithubProfileAnalysis(username)),

  handleBack: () => dispatch(actions.redirect('/')),
  waitResponse: () => dispatch({ type: 'REQUEST_SENT' })
});

export default connect(mapStateToProps, mapDispatchToProps)(
  GithubProfileAnalysis
);
