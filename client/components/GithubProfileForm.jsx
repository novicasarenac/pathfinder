import React, { Component } from 'react';
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

const renderInput = field =>
  (<FormGroup bsSize="small">
    <InputGroup>
      <InputGroup.Addon className="btn-github">
        <i className="fa fa-github fa-2x" />
      </InputGroup.Addon>
      <FormControl
        {...field.input}
        placeholder={field.placeholder}
        type={field.type}
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
      />
    </InputGroup>
  </FormGroup>);

class GithubProfileForm extends Component {
  render() {
    return (
      <Col md={6} mdOffset={3} sm={12} className="h-75">
        <Jumbotron>
          <Button bsSize="small" bsStyle="link" onClick={this.props.handleBack}>
            <i className="fa fa-arrow-left" />
            &nbsp; Back to Main page
          </Button>

          <p className="lead text-center mt-3">
            Please, enter <strong>Github</strong> username to start analysis.
            You will get usefull information such as given user&#39;s similiar
            followers, language usage stats, recommended open source repos etc.
          </p>
          <hr className="my-4" />

          <Col lg={4} className="container">
            <Form onSubmit={this.props.handleSubmit}>
              <Field
                name="username"
                component={renderInput}
                type="text"
                placeholder="Github username"
              />

              <div className="text-center">
                <Button
                  className="mt-3"
                  type="submit"
                  bsStyle="success"
                  disabled={this.props.pristine}
                >
                  Analyse Profile
                </Button>
              </div>
            </Form>
          </Col>
        </Jumbotron>
      </Col>
    );
  }
}

export default reduxForm({
  form: 'githubProfileName'
})(GithubProfileForm);
