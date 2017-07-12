import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import Navbar from './Navbar';
import RepositoryList from './RepositoryList';
import FriendList from './FriendList';

class ExplorerResultPage extends Component {
  componentWillMount() {
    const { handleHome, recommendedRepos, interestingPeople } = this.props;
    if (!recommendedRepos && !interestingPeople) {
      handleHome();
    }
  }

  render() {
    const {
      recommendedRepos,
      interestingPeople,
      handleBack,
      handleHome
    } = this.props;

    if (!recommendedRepos && !interestingPeople) {
      return null;
    }

    return (
      <Col className="container page scrollable-container">
        <Navbar handleBack={handleBack} handleHome={handleHome} />
        <hr />

        <Row className="ml-1 container-fluid justify-content-center block-75">
          <Col lg={6} className="mb-3" style={{ paddingRight: '20px' }}>
            <Row className="explore-recommended-repos justify-content-center ">
              <h4 className="mt-1 text-center">Recommended Projects</h4>
            </Row>
            <Row className="justify-content-center block-40">
              <RepositoryList repositories={recommendedRepos} />
            </Row>
          </Col>
          <Col lg={6} className="mb-3" style={{ paddingLeft: '20px' }}>
            <Row className="explore-interesting-people justify-content-center">
              <h4 className="mt-1 text-center">Interesting People</h4>
            </Row>
            <Row className="justify-content-center block-40">
              <FriendList friends={interestingPeople} avatarSize={30} />
            </Row>
          </Col>
        </Row>
      </Col>
    );
  }
}

export default ExplorerResultPage;
