import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import { BounceLoader } from 'react-spinners';
import LanguageUsageChart from './LanguageUsageChart';
import FriendList from './FriendList';

const Spinner = ({ color }) =>
  (<div className="justify-content-center mt-5">
    <span className="mt-3">&nbsp;</span>
    <BounceLoader size={100} color={color} />
    <h1 className="lead text-center mt-5">Loading...</h1>
  </div>);

class AnalysisResults extends Component {
  renderLanguageUsageStats() {
    return (
      <Col className="square container">
        <Row className="language-stats justify-content-center">
          <h4 className="mt-1 text-center">Language Usage</h4>
        </Row>
        <Row className="justify-content-center">
          {this.props.languageStats
            ? <LanguageUsageChart data={this.props.languageStats} />
            : <Spinner color="#6e5494" />}
        </Row>
      </Col>
    );
  }

  renderSimilarFriends() {
    return (
      <Col className="square container">
        <Row className="similar-friends justify-content-center">
          <h4 className="mt-1 text-center">Friends Like You</h4>
        </Row>
        <Row className="justify-content-center block-40">
          {this.props.similarFriends
            ? <FriendList friends={this.props.similarFriends} />
            : <Spinner color="#4078c0" />}
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
        <Row className="justify-content-center">
          {this.props.recommendedRepos
            ? <LanguageUsageChart data={this.props.recommendedRepos} />
            : <Spinner color="#bd2c00" />}
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
        <Row className="justify-content-center">
          {this.props.interestingPeople
            ? <LanguageUsageChart data={this.props.interestingPeople} />
            : <Spinner color="#6cc644" />}
        </Row>
      </Col>
    );
  }

  render() {
    return (
      <Col lg={9}>
        {this.renderLanguageUsageStats()}
        {this.renderSimilarFriends()}
        {this.renderRecommendedRepos()}
        {this.renderInterestingPeople()}
      </Col>
    );
  }
}

export default AnalysisResults;
