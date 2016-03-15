import React, { Component, PropTypes } from 'react';
import NavContainer from '../containers/NavContainer';

export default class App extends Component {

  render() {
    return (
      <div className="ui vertically padded grid container">
        <div className="row">
          <div className="column">
            <NavContainer />
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
};
