import React, { Component } from 'react';
import { Button, ListGroup, ListGroupItem, Col, Image } from 'react-bootstrap';

const Friend = ({ username, avatar, profileLink }) =>
  (<ListGroupItem className="list-item">
    <Image width="50" height="50" src={avatar} className="img-fluid rounded" />
    <Button href={profileLink} target="tab">
      <b className="lead">
        {username}
      </b>
    </Button>
  </ListGroupItem>);

class FriendList extends Component {
  render() {
    return (
      <Col sm={12} className="no-padding h-100">
        <ListGroup className="h-100 mt-1">
          {this.props.friends.map(friend =>
            (<Friend
              key={friend.username}
              username={friend.username}
              avatar={friend.avatar}
              profileLink={friend.profileLink}
            />)
          )}
        </ListGroup>
      </Col>
    );
  }
}

export default FriendList;
