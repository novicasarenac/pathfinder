import React, { Component } from 'react';
import { Col, Image } from 'react-bootstrap';

class ProfileInfo extends Component {
  render() {
    const { user } = this.props;

    return (
      <Col lg={3} className="h-100">
        <Col className="ml-3">
          <Image src={user.avatar} alt="avatar" className="img-fluid" />
          <h3 className="mt-3">
            {user.name}
          </h3>
          <h5 className="text-muted mb-3">
            {user.username}
          </h5>
          {user.company &&
            <div>
              <span className="lead">
                <i className="fa fa-building-o" />
                &nbsp; {user.company}
              </span>
            </div>}
          {user.location &&
            <div>
              <span className="lead">
                <i className="fa fa-map-marker mr-1" />
                &nbsp; {user.location}
              </span>
            </div>}
        </Col>
      </Col>
    );
  }
}

export default ProfileInfo;
