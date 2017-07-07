import React, { Component } from 'react';
import { Button, Row, Col, Jumbotron } from 'react-bootstrap';
import GitHubForkRibbon from 'react-github-fork-ribbon';
import { homepage } from '../../package.json';
import './main.css';

const githubProfileButton = profile =>
  (<Button
    href={`http://github.com/${profile}`}
    target="tab"
    bsSize="small"
    className="btn btn-social"
  >
    <i className="fa fa-github" />
    <b>
      {profile}
    </b>
  </Button>);

const madeByFooter = (
  <Row className="mt-5 d-flex justify-content-center">
    <p className="text-white mr-3">Made by:</p>

    {githubProfileButton('novicasarenac')}

    <p className="mr-1 ml-1 text-white">and</p>

    {githubProfileButton('nemanja-m')}
  </Row>
);

class MainPage extends Component {
  render() {
    return (
      <Col className="container-fluid h-100 d-flex justify-content-center">
        <GitHubForkRibbon
          href={homepage}
          target="tab"
          position="right"
          color="green"
        >
          Fork me on GitHub
        </GitHubForkRibbon>

        <Col className="h-50 align-self-center">
          <h1 className="display-1 text-white">GitHub Pathfinder</h1>
          <hr className="mb-5" />

          <Jumbotron className="d-flex align-items-center justify-content-center">
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

          <div className="h-75">&nbsp;</div>

          {madeByFooter}
        </Col>
      </Col>
    );
  }
}

export default MainPage;
