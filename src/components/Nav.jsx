import React, { Component } from 'react';
import { Link } from 'react-router';


export default class Nav extends Component {

  render() {
    return (
      <ul className="nav">
        <li> <Link to="/">Home</Link> </li>
        <li> <Link to="/login">Login</Link> </li>
        <li> <Link to="/register">Register</Link> </li>
        <li> <Link to="/logout">Logout</Link> </li>
        <li> <Link to="/exercises">Exercises</Link> </li>
      </ul>
    );
  }

}
