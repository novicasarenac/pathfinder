import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';

class AnalysisResults extends Component {
  renderLanguageUsageStats() {
    return (
      <Col className="square container">
        <Row className="language-stats justify-content-center">
          <h4 className="mt-1 text-center">Language Usage</h4>
        </Row>
      </Col>
    );
  }

  renderSimilarFollowers() {
    return (
      <Col className="square container">
        <Row className="similar-followers justify-content-center">
          <h4 className="mt-1 text-center">Followers Like You</h4>
        </Row>
      </Col>
    );
  }

  renderRecommendedRepos() {
    return (
      <Col className="square container">
        <Row className="recommended-repos justify-content-center">
          <h4 className="mt-1 text-center">Recommended Projects</h4>
        </Row>
      </Col>
    );
  }

  renderInterestingPeople() {
    return (
      <Col className="square container">
        <Row className="interesting-people justify-content-center">
          <h4 className="mt-1 text-center">Interesting People</h4>
        </Row>
      </Col>
    );
  }

  render() {
    return (
      <Col lg={9}>
        {this.renderLanguageUsageStats()}
        {this.renderSimilarFollowers()}
        {this.renderRecommendedRepos()}
        {this.renderInterestingPeople()}
      </Col>
    );
  }
}

export default AnalysisResults;
