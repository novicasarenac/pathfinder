import React, { Component } from 'react';

class ProfileAnalysisResultPage extends Component {
  componentWillMount() {
    if (!this.props.user) {
      this.props.redirectToMainPage();
    }
  }

  render() {
    const { user } = this.props;

    if (!user) return null;

    return (
      <h1>
        {user.name || user.login}
      </h1>
    );
  }
}

export default ProfileAnalysisResultPage;
