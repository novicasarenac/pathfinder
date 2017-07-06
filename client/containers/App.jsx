import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import PropTypes from 'prop-types';
import routes from '../routes';

class App extends Component {
  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        {routes}
      </ConnectedRouter>
    );
  }
}

App.propTypes = {
  history: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

export default connect(null, null)(App);
