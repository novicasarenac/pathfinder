import React, { Component } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import Navbar from './Navbar';

class ExplorerResultPage extends Component {
  render() {
    const { recommendedRepos, handleBack, handleHome } = this.props;

    if (!recommendedRepos) {
      return null;
    }

    return (
      <Col className="container page">
        <Navbar handleBack={handleBack} handleHome={handleHome} />
        <hr />

        <ul>
          {this.props.recommendedRepos.map(repo =>
            (<li key={repo.name}>
              {repo.name} - {repo.stars}
            </li>)
          )}
        </ul>
      </Col>
    );
  }
}

export default ExplorerResultPage;
