import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import { BounceLoader } from 'react-spinners';
import LanguageUsageChart from './LanguageUsageChart';
import FriendList from './FriendList';
import RepositoryList from './RepositoryList';

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
    const errorMessage =
      'Looks like you have no followers and you are not following anybody yet.';

    return (
      <Col className="square container">
        <Row className="similar-friends justify-content-center">
          <h4 className="mt-1 text-center">Friends Like You</h4>
        </Row>
        <Row className="justify-content-center block-40">
          {this.props.similarFriends
            ? <FriendList
              friends={this.props.similarFriends}
              errorMessage={errorMessage}
              avatarSize={50}
            />
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
        <Row className="justify-content-center block-40">
          {this.props.recommendedRepos
            ? <RepositoryList repositories={this.props.recommendedRepos} />
            : <Spinner color="#bd2c00" />}
        </Row>
      </Col>
    );
  }

  renderInterestingPeople() {
    const errorMessage =
      "We can't find any interesting people for you, right now.";

    return (
      <Col className="square container">
        <Row className="interesting-people justify-content-center">
          <h4 className="mt-1 text-center">Interesting People</h4>
        </Row>
        <Row className="justify-content-center block-40">
          {this.props.interestingPeople
            ? <FriendList
              friends={this.props.interestingPeople}
              errorMessage={errorMessage}
            />
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
