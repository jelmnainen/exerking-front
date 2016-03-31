import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import cn from 'classnames';

export default class DeadlineLabel extends Component {

  render() {
    const deadline = moment(this.props.deadline);
    const expired = moment().isAfter(deadline);
    const relative = moment().to(deadline);

    return (
      <div
        className={cn('ui small compact label', { 'red basic': expired })}
        title={deadline.format('LLL')}
      >
        {expired ? 'Expired' : 'Expires in'}
        {' '}
        {relative}
      </div>
    );
  }

}

DeadlineLabel.propTypes = {
  deadline: PropTypes.string.isRequired,
};
