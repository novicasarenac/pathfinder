import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainPage from '../components/MainPage';

class Main extends Component {
  render() {
    return <MainPage />;
  }
}

export default connect(null, null)(Main);
