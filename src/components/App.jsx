import React, { Component } from 'react';

export default class App extends Component {

  render() {
    return (
      <div>
        <h2>Exerking</h2>
        {this.props.children}
      </div>
    );
  }
}
