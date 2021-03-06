import React, { Component, PropTypes } from 'react';

export default class Progress extends Component {
  render() {
    const { value, max, color, size } = this.props;
    const percentage = Math.round((value / max) * 100);
    return (
      <div className={`ui ${color} ${size} progress`}>
        <div className="bar" style={{ width: `${percentage}%` }}>
          <div className="progress">{`${percentage}%`}</div>
        </div>
      </div>
    );
  }
}

Progress.defaultProps = {
  color: 'blue',
  size: 'standard',
};

Progress.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  color: PropTypes.string,
  size: PropTypes.oneOf(['tiny', 'small', 'large', 'standard']),
};
