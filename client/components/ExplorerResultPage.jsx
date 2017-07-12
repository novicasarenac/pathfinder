import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import Navbar from './Navbar';
import RepositoryList from './RepositoryList';

class ExplorerResultPage extends Component {
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
            <Row className="recommended-repos justify-content-center ">
              <h4 className="mt-1 text-center">Recommended Projects</h4>
            </Row>
            <Row className="justify-content-center block-40">
              <RepositoryList repositories={recommendedRepos} />
            </Row>
          </Col>
          <Col lg={6} className="mb-3" style={{ paddingLeft: '20px' }}>
            <Row className="interesting-people justify-content-center">
              <h4 className="mt-1 text-center">Interesting People</h4>
            </Row>
            <ul>
              {this.props.recommendedRepos.map(repo =>
                (<li key={repo.name}>
                  {repo.name} - {repo.stars}
                </li>)
              )}
            </ul>
          </Col>
        </Row>
      </Col>
    );
  }
}

export default ExplorerResultPage;
