import React, { Component, PropTypes } from 'react';
import { Map } from 'immutable';
import cn from 'classnames';
import FormInput from './FormInput';

export default class RegistrationForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
    };
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onPasswordConfirmationChange = this.onPasswordConfirmationChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onEmailChange(email) {
    this.setState({ email });
  }

  onPasswordChange(password) {
    this.setState({ password });
  }

  onPasswordConfirmationChange(passwordConfirmation) {
    this.setState({ passwordConfirmation });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(Object.assign({}, this.state));
  }

  render() {
    const { loading, errors = new Map() } = this.props;
    const { email, password, passwordConfirmation } = this.state;

    return (
      <form
        className={cn('ui form', { loading })}
        onSubmit={this.onSubmit}
      >
        <FormInput
          name="email"
          errors={errors.get('email')}
          value={email}
          onChange={this.onEmailChange}
        >
          Email
        </FormInput>
        <FormInput
          name="password"
          type="password"
          errors={errors.get('password')}
          value={password}
          onChange={this.onPasswordChange}
        >
          Password
        </FormInput>
        <FormInput
          name="password_confirmation"
          type="password"
          value={passwordConfirmation}
          onChange={this.onPasswordConfirmationChange}
        >
          Password
        </FormInput>
        <button
          className="fluid ui primary button"
          disabled={loading}
          type="submit"
        >
          Sign up
        </button>
      </form>
    );
  }

}

RegistrationForm.propTypes = {
  loading: PropTypes.bool,
  errors: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

RegistrationForm.defaultProps = {
  loading: false,
};
