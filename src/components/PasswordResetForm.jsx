import React, { Component, PropTypes } from 'react';
import cn from 'classnames';
import { Map } from 'immutable';
import FormInput from './FormInput';

export default class PasswordResetForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onEmailChange(email) {
    this.setState({ email });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(Object.assign({}, this.state));
  }

  render() {
    const { loading, errors = Map() } = this.props;
    const { email } = this.state;

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
        <button
          className="fluid ui primary button"
          disabled={loading}
          type="submit"
        >
          Send new password
        </button>
      </form>
    );
  }

}

PasswordResetForm.propTypes = {
  loading: PropTypes.bool,
  errors: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

PasswordResetForm.defaultProps = {
  loading: false,
};
