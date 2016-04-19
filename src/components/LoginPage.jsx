import React, { Component } from 'react';
import { Link } from 'react-router';
import LoginForm from './LoginForm';

export default class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit({ email, password }) {
    const inProgress = this.props.auth.get('inProgress');
    const { login } = this.props.actions;

    if (inProgress) {
      return;
    }

    login(email, password);
  }

  renderMessage() {
    const email = this.props.auth.get('email');
    return (
      <p>
        You're signed in as { email }. {' '}
        <Link to="/logout">Logout</Link>
      </p>
    );
  }

  renderForm() {
    const { auth } = this.props;
    const inProgress = auth.get('inProgress');
    const errorMessages = auth.get('errorMessages');
    return (
      <LoginForm loading={inProgress} errors={errorMessages} onSubmit={this.onSubmit} />
    );
  }

  render() {
    const isSignedIn = this.props.auth.get('isSignedIn');
    return (
      <div className="row">
        <div className="six wide column">
          <h2 className="ui header">Login</h2>
          {isSignedIn ? this.renderMessage() : this.renderForm()}
          <div className="ui hidden divider" />
          <Link to="/password-reset">Forgot password?</Link>
        </div>
      </div>
    );
  }

}
