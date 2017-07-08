import React, { Component } from 'react';
import { Col, Image } from 'react-bootstrap';

class ProfileInfo extends Component {
  render() {
    const { user } = this.props;

    return (
      <Col sm={5} lg={3} className="mb-3">
        <Image src={user.avatar} alt="avatar" rounded responsive />
        <h3 className="mt-3">
          {user.name}
        </h3>
        <h5 className="text-muted">
          {user.username}
        </h5>
        <hr className="mr-3" />
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
    );
  }
}

export default ProfileInfo;
