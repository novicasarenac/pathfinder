import React, { Component } from 'react';
import { Button, Row } from 'react-bootstrap';

function renderGithubProfileLink(profile) {
  return (
    <Button href={`http://github.com/${profile}`} bsSize="small" target="tab">
      <i className="fa fa-github" />
      <b>
        &nbsp;
        {profile}
      </b>
    </Button>
  );
}

class Footer extends Component {
  render() {
    return (
      <footer>
        <Row className="fixed-bottom d-flex justify-content-center">
          <b className="text-white mr-1">Made by:</b>

          {renderGithubProfileLink('novicasarenac')}

          <b className="text-white mr-1 ml-1">and</b>

          {renderGithubProfileLink('nemanja-m')}
        </Row>
      </footer>
    );
  }
}

export default Footer;
