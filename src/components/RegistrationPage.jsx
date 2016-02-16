import React, { Component } from 'react';
import { Link } from 'react-router';

export default class RegistrationPage extends Component {

  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.onPageLeave();
  }

  onSubmit(event) {
    event.preventDefault();
    const { inProgress } = this.props.reg;
    const { email: { value: email }, password: { value: password } } = this.refs;

    if (inProgress || password === '' || email === '') {
      return;
    }

    this.props.onRegistration(email, password);
  }

  render() {
    const { isError, inProgress, isOK, errorMessages } = this.props.reg;

    let emailErrors;
    let passwordErrors;
    if (isError && errorMessages.email) {
      emailErrors = <p>{ errorMessages.email.join(', ') }</p>;
    }
    if (isError && errorMessages.password) {
      passwordErrors = <p>{ errorMessages.password.join(', ') }</p>;
    }

    return (
      <div className="registration-page">
        <h2>Registeration</h2>
        { isOK ?
          <p>
            Welcome to Exerking! {' '}
            <Link to="/login">Login now</Link>
          </p>
          :
          <form onSubmit={ this.onSubmit }>
            Email
            <input name="email" ref="email" type="text"/>
            { emailErrors }
            Password
            <input name="password" ref="password" type="password"/>
            { passwordErrors }
            <button disabled={ inProgress } type="submit">Sign up</button>
          </form>
        }
      </div>
    );
  }

}
