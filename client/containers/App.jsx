import React, { Component } from 'react';
import { connect } from 'react-redux';
import GitHubForkRibbon from 'react-github-fork-ribbon';
import { Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Websocket from 'react-websocket';
import Footer from '../components/Footer';
import routes from '../routes';
import { homepage } from '../../package.json';
import { onWsMessage } from '../actions/ws';
import '../styles/app.css';

class App extends Component {
  render() {
    const webSocketServerUrl = process.env.API_URL.replace('http', 'ws');

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

        <Websocket
          url={webSocketServerUrl}
          onMessage={this.props.handleWsMessage}
        />
        <Footer />
      </Col>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  handleWsMessage: message => dispatch(onWsMessage(message))
});

export default withRouter(connect(null, mapDispatchToProps)(App));
