import React, { Component } from 'react';
import { Link } from 'react-router';

export default class LoginPage extends Component {

  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    const { inProgress } = this.props.auth;
    const { login } = this.props.actions;
    const { email: { value: email }, password: { value: password } } = this.refs;

    if (inProgress) {
      return;
    }

    login(email, password);
  }

  render() {
    const { isSignedIn, inProgress, email, errorMessages } = this.props.auth;

    let emailErrors;
    let passwordErrors;

    if (errorMessages && errorMessages.email) {
      emailErrors = <p>{ errorMessages.email.join(', ') }</p>;
    }
    if (errorMessages && errorMessages.password) {
      passwordErrors = <p>{ errorMessages.password.join(', ') }</p>;
    }

    return (
      <div className="login-page">
        <h2>Login</h2>
        { isSignedIn ?
          <p>
            You're signed in as { email }. {' '}
            <Link to="/logout">Logout</Link>
          </p>
          :
          <form onSubmit={ this.onSubmit }>
            Email
            <input ref="email" type="text" />
            { emailErrors }
            Password
            <input ref="password" type="password" />
            { passwordErrors }
            <button disabled={ inProgress } type="submit">Log in</button>
          </form>
        }
      </div>
    );
  }

}
