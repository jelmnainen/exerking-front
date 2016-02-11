import React, { Component } from 'react';

export default class LogoutPage extends Component {

  componentDidMount() {
    this.props.onLogout();
  }

  render() {
    return (
      <div>You have been logged out.</div>
    );
  }

}
