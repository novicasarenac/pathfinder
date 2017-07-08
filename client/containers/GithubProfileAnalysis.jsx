import React, { Component } from 'react';
import { connect } from 'react-redux';
import GithubProfileForm from '../components/GithubProfileForm';
import actions from '../actions';

class GithubProfileAnalysis extends Component {
  handleSubmit(username) {
    return this.props.startAnalysis(username);
  }

  render() {
    return (
      <GithubProfileForm
        onSubmit={values => this.handleSubmit(values.username)}
        handleBack={this.props.handleBack}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startAnalysis: username =>
    dispatch(actions.startGithubProfileAnalysis(username)),

  handleBack: () => dispatch(actions.redirect('/'))
});

export default connect(null, mapDispatchToProps)(GithubProfileAnalysis);
