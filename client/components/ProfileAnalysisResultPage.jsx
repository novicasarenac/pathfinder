import React, { Component } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import ProfileInfo from './ProfileInfo';
import AnalysisResults from './AnalysisResults';

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
      <Col lg={9} className="page container">
        {this.renderNavbar()}
        <hr />

        <Row className="block">
          <ProfileInfo user={user} />
          <AnalysisResults />
        </Row>
      </Col>
    );
  }
}

export default ProfileAnalysisResultPage;
