import React, { Component } from 'react';
import { Button, Col, Jumbotron } from 'react-bootstrap';
import GitHubForkRibbon from 'react-github-fork-ribbon';
import { homepage } from '../../package.json';
import './main.css';

const githubRibbon = (
  <GitHubForkRibbon href={homepage} target="tab" position="right" color="green">
    Fork me on GitHub
  </GitHubForkRibbon>
);

class MainPage extends Component {
  render() {
    return (
      <Col className="h-100 d-flex justify-content-center">
        {githubRibbon}

        <Col className="my-auto">
          <h1 className="display-1 text-white">GitHub Pathfinder</h1>
          <hr className="mb-5" />

          <Jumbotron className="my-auto d-flex align-items-center justify-content-center">
            <Button bsStyle="success" bsSize="large" className="btn-social">
              <i className="fa fa-search" />
              Find Your Path
            </Button>

            <b className="mr-3 ml-3">or</b>

            <Button className="btn-social btn-github" bsSize="large">
              <i className="fa fa-github" />
              Sign In With Github
            </Button>
          </Jumbotron>
        </Col>
      </Col>
    );
  }
}

export default MainPage;
