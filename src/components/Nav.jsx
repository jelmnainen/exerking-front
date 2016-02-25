import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';

export default class Nav extends Component {

  renderMainMenu() {
    if (this.props.isSignedIn) {
      return (
        <div className="menu">
          <Link className="item" activeClassName="active" to="/exercises">Exercises</Link>
        </div>
      );
    }
    return (
      <IndexLink className="item" activeClassName="active" to="/">Home</IndexLink>
    );
  }

  renderAuthMenu() {
    if (this.props.isSignedIn) {
      return (
        <Link className="right item" activeClassName="active" to="/logout">Logout</Link>
      );
    }
    return (
      <div className="right menu">
        <Link className="item" activeClassName="active" to="/register">Register</Link>
        <Link className="item" activeClassName="active" to="/login">Login</Link>
      </div>
    );
  }

  render() {
    return (
      <div className="ui pointing menu">
        <strong className="header item">Exerking</strong>
        {this.renderMainMenu()}
        {this.renderAuthMenu()}
      </div>
    );
  }

}
