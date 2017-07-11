/* eslint no-nested-ternary: "off" */

import React, { Component } from 'react';
import { BounceLoader } from 'react-spinners';
import {
  Col,
  Jumbotron,
  Button,
  Form,
  FormGroup,
  FormControl,
  InputGroup
} from 'react-bootstrap';
import { reduxForm, Field } from 'redux-form';

const renderInput = ({ input, placeholder, type, meta: { touched, error } }) =>
  (<div>
    <FormGroup controlId="githubUsernameField" bsSize="small">
      <InputGroup>
        <InputGroup.Addon className="btn-github">
          <i className="fa fa-github fa-2x" />
        </InputGroup.Addon>
        <FormControl
          {...input}
          placeholder={placeholder}
          type={type}
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
        />
      </InputGroup>
    </FormGroup>
    {touched &&
      error &&
      <p className="text-center text-danger mt-3 mb-3 form-text text-muted">
        {error}
      </p>}
  </div>);

const Spinner = () =>
  (<div className="mt-5 mb-5 d-flex justify-content-center">
    <span className="mt-3">&nbsp;</span>
    <BounceLoader size={80} color="green" />
  </div>);

class GithubProfileForm extends Component {
  renderButtons() {
    return (
      <div className="mt-5">
        <Button type="submit" bsStyle="success" disabled={this.props.pristine}>
          Analyse Profile
        </Button>
        <Button bsSize="small" bsStyle="link" onClick={this.props.handleBack}>
          &nbsp; Back to Main page
        </Button>
      </div>
    );
  }

  renderForm() {
    return (
      <Jumbotron className="vertical-center">
        <p className="text-center lead display-4 mt-3">
          Enter <strong>Github</strong> username to start analysis
        </p>
        <p className="lead text-center mt-3 text-primary">
          You will get usefull information such as given user&#39;s similiar
          followers, language usage stats, recommended open source repos etc.
        </p>
        <hr className="my-4" />

        <Col lg={6} className="container">
          <Form onSubmit={this.props.handleSubmit}>
            <Field
              name="username"
              component={renderInput}
              type="text"
              placeholder="Github username"
            />

            <div className="text-center">
              {this.props.isWaiting ? <Spinner /> : this.renderButtons()}
            </div>
          </Form>
        </Col>
      </Jumbotron>
    );
  }

  render() {
    return (
      <Col md={6} mdOffset={3} sm={12} className="h-75">
        {this.renderForm()}
      </Col>
    );
  }
}

export default reduxForm({
  form: 'githubProfileName'
})(GithubProfileForm);
