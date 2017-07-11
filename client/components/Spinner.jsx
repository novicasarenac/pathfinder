import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import { BounceLoader } from 'react-spinners';

class Spinner extends Component {
  render() {
    return (
      <Col className="container">
        <div className="mt-5 mb-3 d-flex justify-content-center">
          <BounceLoader size={80} color="green" />
        </div>
        <p className="text-center lead">Loading</p>
      </Col>
    );
  }
}

export default Spinner;
