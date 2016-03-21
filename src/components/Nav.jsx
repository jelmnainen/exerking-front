import React, { Component, PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import TeacherSection from '../containers/TeacherSection';

export default class Nav extends Component {

  renderMainMenu() {
    if (this.props.isSignedIn) {
      return (
        <div className="menu">
          <Link className="item" activeClassName="active" to="/exercises">Exercises</Link>
          <TeacherSection>
            <Link className="item" activeClassName="active" to="/submissions">Submissions</Link>
          </TeacherSection>
          <TeacherSection>
            <Link className="item" activeClassName="active" to="/categories">Categories</Link>
          </TeacherSection>
          <Link className="item" activeClassName="active" to="/me/submissions">My submissions</Link>
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
        <span className="right menu">
          <span className="item">
            {this.props.email}
          </span>
          <Link className="item" activeClassName="active" to="/logout">Logout</Link>
        </span>
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

Nav.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
  email: PropTypes.string,
};
