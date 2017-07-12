import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import ProfileInfo from './ProfileInfo';
import AnalysisResults from './AnalysisResults';
import Navbar from './Navbar';

class ProfileAnalysisResultPage extends Component {
  componentWillMount() {
    if (!this.props.user) {
      this.props.handleMain();
    }
  }

  render() {
    const {
      user,
      languageUsageStats,
      similarFriends,
      interestingPeople,
      recommendedRepos,
      handleHome,
      handleBack
    } = this.props;

    if (!user) return null;

    return (
      <Col lg={10} className="page container scrollable-container">
        <Navbar handleBack={handleBack} handleHome={handleHome} />
        <hr />

        <Row className="block-75">
          <ProfileInfo user={user} />
          <AnalysisResults
            languageStats={languageUsageStats}
            similarFriends={similarFriends}
            interestingPeople={interestingPeople}
            recommendedRepos={recommendedRepos}
          />
        </Row>
      </Col>
    );
  }
}

export default ProfileAnalysisResultPage;
