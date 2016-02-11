import React, { Component } from 'react';
import Nav from './Nav';

export default class App extends Component {

  render() {
    return (
      <div>
        <h2>Exerking</h2>
        <Nav />
        {this.props.children}
      </div>
    );
  }
}
