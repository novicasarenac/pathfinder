import React, { Component } from 'react';
import { Button, Col, Row, ListGroup, ListGroupItem } from 'react-bootstrap';
import Octicon from 'react-octicon';
import utils from '../utils';

const format = number =>
  (number >= 1000 ? `${(number / 1000).toFixed(1)}k` : number);

const Repo = ({ owner, name, link, stars, language }) =>
  (<ListGroupItem className="list-item">
    <Col sm={8}>
      <Row>
        <Octicon name="repo" className="octicon-margin" />
        <Button href={link} target="tab" className="ml-1 no-padding no-outline">
          <span className="medium-font lead text-center">{`${owner}/${name}`}</span>
        </Button>
      </Row>
    </Col>
    <Col sm={4}>
      <Row>
        <Octicon
          name="primitive-dot"
          mega
          style={{ color: utils.getColorForLanguage(language) }}
        />
        <h5 className="lead mt-2 ml-1 medium-font">
          {language}
        </h5>
        <span className="container-fluid" />
        <Octicon name="star" className="octicon-margin" />
        <h5 className="medium-font lead mt-1">
          {format(stars)}
        </h5>
      </Row>
    </Col>
  </ListGroupItem>);

const Repositories = ({ repos }) =>
  (<ListGroup className="h-100">
    {repos.map(repo =>
      (<Repo
        key={`${repo.name}/${repo.owner}`}
        owner={repo.owner}
        name={repo.name}
        link={repo.link}
        stars={repo.stars}
        language={repo.language}
      />)
    )}
  </ListGroup>);

class RepositoryList extends Component {
  render() {
    const sortedRepos = [...this.props.repositories].sort(
      (a, b) => b.stars - a.stars
    );

    return (
      <Col sm={12} className="container-fluid h-100 no-padding no-margin">
        <Repositories repos={sortedRepos} />
      </Col>
    );
  }
}

export default RepositoryList;
