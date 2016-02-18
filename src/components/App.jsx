import React, { Component } from 'react';
import NavContainer from './smart/NavContainer';

export default class App extends Component {

  render() {
    return (
      <div>
        <h2>Exerking</h2>
        <NavContainer />
        {this.props.children}
      </div>
    );
  }
}
