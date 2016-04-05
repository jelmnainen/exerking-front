import React, { Component, PropTypes } from 'react';

export default class Progress extends Component {
  render() {
    const { value, max } = this.props;
    const percentage = Math.round((value / max) * 100);
    return (
      <div className="ui blue small progress">
        <div className="bar" style={{ width: `${percentage}%` }}>
          <div className="progress">{`${percentage}%`}</div>
        </div>
      </div>
    );
  }
}

Progress.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};
