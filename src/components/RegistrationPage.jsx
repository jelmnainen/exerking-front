import React, { Component } from 'react';
import { Link } from 'react-router';

export default class RegistrationPage extends Component {

  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
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

    return (
      <div className="registration-page">
        { isError && <p>Check your password or username.</p> }
        { isOK ?
          <p>
            Welcome to Exerking! {' '}
            <Link to="/login">Login now</Link>
          </p>
          :
          <form onSubmit={ this.onSubmit }>
            Email
            <input name="email" ref="email" type="text"/>
            Password
            <input name="password" ref="password" type="password"/>
            <button disabled={ inProgress } type="submit">Sign up</button>
          </form>
        }
      </div>
    );
  }

}