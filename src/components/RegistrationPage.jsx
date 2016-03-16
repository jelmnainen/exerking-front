import React, { Component } from 'react';
import { Link } from 'react-router';
import RegistrationForm from './RegistrationForm';

export default class RegistrationPage extends Component {

  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.onPageLeave();
  }

  onSubmit({ email, password, passwordConfirmation }) {
    const inProgress = this.props.reg.get('inProgress');

    if (inProgress) {
      return;
    }

    this.props.onRegistration(email, password, passwordConfirmation);
  }

  renderMessage() {
    return (
      <p>
        Welcome to Exerking! {' '}
        <Link to="/login">Login now</Link>
      </p>
    );
  }

  renderForm() {
    const { reg } = this.props;
    const inProgress = reg.get('inProgress');
    const errorMessages = reg.get('errorMessages');
    return (
      <RegistrationForm loading={inProgress} errors={errorMessages} onSubmit={this.onSubmit} />
    );
  }

  render() {
    const isOK = this.props.reg.get('isOK');
    return (
      <div className="row">
        <div className="six wide column">
          <h2 className="ui header">Registration</h2>
          {isOK ? this.renderMessage() : this.renderForm()}
        </div>
      </div>
    );
  }

}
