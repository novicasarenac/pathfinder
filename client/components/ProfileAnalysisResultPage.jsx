import React, { Component } from 'react';
import { Col, Row, Button } from 'react-bootstrap';

class ProfileAnalysisResultPage extends Component {
  componentWillMount() {
    if (!this.props.user) {
      this.props.redirectToMainPage();
    }
  }

  renderNavbar() {
    return (
      <Row className="btn-toolbar justify-content-between">
        <Button bsStyle="link" onClick={this.props.redirectToProfileForm}>
          <i className="fa fa-arrow-left" />
          &nbsp; Back to profile form
        </Button>
        <Button bsStyle="link" onClick={this.props.redirectToMainPage}>
          <i className="fa fa-home" />
          &nbsp; Home
        </Button>
      </Row>
    );
  }

  render() {
    const { user } = this.props;

    if (!user) return null;

    return (
      <Col md={8} mdOffset={2} sm={12} className="page">
        {this.renderNavbar()}

        <h1>
          {user.name || user.login}
        </h1>
      </Col>
    );
  }
}

export default ProfileAnalysisResultPage;
