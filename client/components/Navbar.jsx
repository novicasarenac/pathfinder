import React, { Component } from 'react';
import { Row, Button } from 'react-bootstrap';

class Navbar extends Component {
  render() {
    return (
      <Row className="btn-toolbar justify-content-between">
        <Button bsStyle="link" onClick={this.props.handleBack}>
          <i className="fa fa-arrow-left" />
          &nbsp; Back
        </Button>
        <Button bsStyle="link" onClick={this.props.handleHome}>
          <i className="fa fa-home" />
          &nbsp; Home
        </Button>
      </Row>
    );
  }
}

export default Navbar;
