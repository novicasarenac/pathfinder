import React, { Component } from 'react';
import { Row, Form, Checkbox, Col, Button, Jumbotron } from 'react-bootstrap';
import { reduxForm, Field } from 'redux-form';
import Spinner from './Spinner';

const PROGRAMMING_AREAS = [
  'Virtual Reality',
  'Operating Systems',
  'Security',
  'Game Development',
  'Mobile Development',
  'Back-end Web Development',
  'Front-end Web Development',
  'DevOps',
  'Machine Learning',
  'Programming Languages'
];

const renderCheckbox = ({ input, label }) =>
  (<Checkbox {...input}>
    <span className="ml-3 lead">
      {label}
    </span>
  </Checkbox>);

const Column = ({ areas }) =>
  (<Col sm={6}>
    {areas.map(area =>
      <Field key={area} label={area} name={area} component={renderCheckbox} />
    )}
  </Col>);

class ExplorerPage extends Component {
  renderForm() {
    const rightHalf = [...PROGRAMMING_AREAS];
    const mid = Math.ceil(rightHalf.length / 2);
    const leftHalf = rightHalf.splice(0, mid);

    const { error } = this.props;

    return (
      <Form onSubmit={this.props.handleSubmit}>
        <Row className="container-fluid">
          <Column areas={leftHalf} />
          <Column areas={rightHalf} />
        </Row>
        {error &&
          <p className="text-center text-danger mt-3 mb-3 form-text text-muted">
            {error}
          </p>}
        <div className="text-center mt-5">
          <Button
            type="submit"
            bsStyle="success"
            disabled={this.props.pristine}
          >
            Explore
          </Button>
          <Button bsStyle="link" onClick={this.props.handleBack}>
            &nbsp; Back
          </Button>
        </div>
      </Form>
    );
  }

  render() {
    return (
      <Col md={6} mdOffset={3} sm={12}>
        <div className="mt-5 mb-5">&nbsp;</div>
        <Jumbotron>
          <p className="display-4 text-center mt-3">
            Select programming areas to get started
          </p>
          <p className="muted text-center mt-3 text-primary">
            We will recommend you some interesting projects and cool people.
          </p>
          <hr />

          <Col lg={10} lgOffset={1} className="container mt-5">
            {this.props.isWaiting ? <Spinner /> : this.renderForm()}
          </Col>
        </Jumbotron>
      </Col>
    );
  }
}

export default reduxForm({
  form: 'exploreForm'
})(ExplorerPage);
