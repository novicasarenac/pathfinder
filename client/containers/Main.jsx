import React, { Component } from 'react';
import { connect } from 'react-redux';

class Main extends Component {
  render() {
    return <h1>Hello World</h1>;
  }
}

export default connect(null, null)(Main);
