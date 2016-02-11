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

    if (inProgress || password === '' || email === '') {
      return;
    }

    login(email, password);
  }

  render() {
    const { isSignedIn, isError, inProgress, email } = this.props.auth;

    return (
      <div className="login-page">
        <h2>Login</h2>
        { isError && <p>Email or password doesn't match.</p> }
        { isSignedIn ?
          <p>
            You're signed in as { email }. {' '}
            <Link to="/logout">Logout</Link>
          </p>
          :
          <form onSubmit={ this.onSubmit }>
            Email
            <input ref="email" type="text" />
            Password
            <input ref="password" type="password" />
            <button disabled={ inProgress } type="submit">Log in</button>
          </form>
        }
      </div>
    );
  }

}
