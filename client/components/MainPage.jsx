import React, { Component } from 'react';
import { Button, Col, Jumbotron } from 'react-bootstrap';

class MainPage extends Component {
  render() {
    return (
      <Col>
        <Col className="vertical-center">
          <h1 className="display-1 text-white">GitHub Pathfinder</h1>
          <hr className="mb-5" />

          <Jumbotron className="d-flex align-items-center justify-content-center">
            <Button
              bsStyle="success"
              bsSize="large"
              className="btn-social"
              onClick={this.props.handleFindPathClick}
            >
              <i className="fa fa-search" />
              Get Started
            </Button>

            <b className="mr-3 ml-3">or</b>

            <Button
              className="btn-social btn-github"
              bsSize="large"
              onClick={this.props.handleGithubProfileClick}
            >
              <i className="fa fa-github" />
              Analyse Profile
            </Button>
          </Jumbotron>
        </Col>
      </Col>
    );
  }
}

export default MainPage;
