import React, { Component, PropTypes } from 'react';
import cn from 'classnames';
import { Map } from 'immutable';
import FormInput from './FormInput';

export default class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onEmailChange(email) {
    this.setState({ email });
  }

  onPasswordChange(password) {
    this.setState({ password });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(Object.assign({}, this.state));
  }

  render() {
    const { loading, errors = new Map() } = this.props;
    const { email, password } = this.state;

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
        <button
          className="fluid ui primary button"
          disabled={loading}
          type="submit"
        >
          Log in
        </button>
      </form>
    );
  }

}

LoginForm.propTypes = {
  loading: PropTypes.bool,
  errors: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
  loading: false,
};
