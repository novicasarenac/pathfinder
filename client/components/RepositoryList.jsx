import React, { Component } from 'react';
import { Button, Col, Row, ListGroup, ListGroupItem } from 'react-bootstrap';
import Octicon from 'react-octicon';
import utils from '../utils';

const format = number =>
  (number >= 1000 ? `${(number / 1000).toFixed(1)}k` : number);

const Repo = ({ owner, name, link, stars, forks, language }) =>
  (<ListGroupItem className="list-item justify-content-left">
    <Col sm={12} className="h-100">
      <Row className="">
        <Octicon name="repo" className="octicon-margin" />
        <Button href={link} target="tab" className="ml-1 no-padding no-outline">
          <span className="repo-name lead text-center">{`${owner}/${name}`}</span>
        </Button>
      </Row>
      <Row className="mt-1">
        <Octicon name="repo-forked" className="octicon-margin" />
        <h5 className="lead ml-1 mt-1">
          {format(forks)}
        </h5>
        <Octicon name="star" className="octicon-margin ml-3" />
        <h5 className="lead mt-1">
          {format(stars)}
        </h5>
        <Octicon
          name="primitive-dot"
          mega
          className="ml-5"
          style={{ color: utils.getColorForLanguage(language) }}
        />
        <h5 className="lead mt-1 ml-1">
          {language}
        </h5>
      </Row>
    </Col>
  </ListGroupItem>);

const Column = ({ repos }) =>
  (<Col sm={6} className="no-padding no-margin h-100">
    <ListGroup className="h-100 mt-1">
      {repos.map(repo =>
        (<Repo
          key={repo.key}
          owner={repo.owner}
          name={repo.name}
          link={repo.link}
          stars={repo.stars}
          forks={repo.forks}
          language={repo.language}
        />)
      )}
    </ListGroup>
  </Col>);

class RepositoryList extends Component {
  render() {
    const rightHalf = [...this.props.repositories];
    const mid = Math.ceil(this.props.repositories.length / 2);
    const leftHalf = rightHalf.splice(0, mid);

    return (
      <Col sm={12} className="h-100">
        <Row className="h-100">
          <Column repos={leftHalf} key="left" />
          <Column repos={rightHalf} key="right" />
        </Row>
      </Col>
    );
  }
}

export default RepositoryList;
