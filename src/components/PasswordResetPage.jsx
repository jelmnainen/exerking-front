import React, { Component } from 'react';
import PasswordResetForm from './PasswordResetForm';

export default class PasswordResetPage extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.onPageLeave();
  }

  onSubmit({ email }) {
    const { resetPassword } = this.props;
    resetPassword(email);
  }

  render() {
    let success;
    const { form } = this.props;
    const errorMessages = form.get('errorMessages');
    const inProgress = form.get('inProgress');
    const isSuccess = form.get('isSuccess');

    if (isSuccess) {
      success = (
        <div className="ui success message">
          <p>New password has been sent to provided email</p>
        </div>
      );
    }

    return (
      <div className="row">
        <div className="six wide column">
          <h2 className="ui header">Password reset</h2>
          {success}
          <PasswordResetForm onSubmit={this.onSubmit} loading={inProgress} errors={errorMessages} />
        </div>
      </div>
    );
  }
}
