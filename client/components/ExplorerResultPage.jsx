import React, { Component } from 'react';
import { Col, Row, Button } from 'react-bootstrap';

class ExplorerResultPage extends Component {
  render() {
    return (
      <Col className="container page">
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
