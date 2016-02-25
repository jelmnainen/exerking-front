import React, { Component } from 'react';

export default class LogoutPage extends Component {

  componentDidMount() {
    this.props.onLogout();
  }

  render() {
    return (
      <div className="row">
        <div className="column">
          <h2 className="ui header">You have been logged out.</h2>
          <p>Please come again.</p>
        </div>
      </div>
    );
  }

}
