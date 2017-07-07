import React, { Component } from 'react';
import { connect } from 'react-redux';
import GitHubForkRibbon from 'react-github-fork-ribbon';
import { Col } from 'react-bootstrap';
import Footer from '../components/Footer';
import routes from '../routes';
import { homepage } from '../../package.json';
import '../styles/app.css';

class App extends Component {
  render() {
    return (
      <Col className="container-fluid h-100">
        <GitHubForkRibbon
          href={homepage}
          target="tab"
          position="right"
          color="green"
        >
          Fork me on GitHub
        </GitHubForkRibbon>

        <Col className="h-100 d-flex align-items-center justify-content-center">
          {routes}
        </Col>

        <Footer />
      </Col>
    );
  }
}

export default connect(null, null)(App);
