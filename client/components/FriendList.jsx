import React, { Component } from 'react';
import { Button, ListGroup, ListGroupItem, Col, Image } from 'react-bootstrap';

const Friend = ({ username, avatar, profileLink }) =>
  (<ListGroupItem className="list-item justify-content-left">
    <Image
      width="50"
      height="50"
      src={avatar}
      alt="Avatar"
      className="img-fluid rounded"
    />
    <i className="fa fa-github fa-2x ml-1 mr-1" />
    <Button
      href={profileLink}
      target="tab"
      className="no-padding no-outline mr-1"
    >
      <strong className="h5">
        {username}
      </strong>
    </Button>
  </ListGroupItem>);

class FriendList extends Component {
  renderFriends() {
    return (
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
    );
  }

  render() {
    return (
      <Col sm={12} className="no-padding h-100">
        {this.props.friends.length === 0
          ? <h1 className="text-center lead vertical-center">
            {this.props.errorMessage}
          </h1>
          : this.renderFriends()}
      </Col>
    );
  }
}

export default FriendList;
