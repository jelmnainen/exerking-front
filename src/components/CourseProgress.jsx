import React, { Component, PropTypes } from 'react';

import Progress from './../components/Progress';

export default class CourseProgress extends Component {

  render() {
    const { overall, categories } = this.props;

    return (
      <div>
        <div>
          <h2 className="ui header tiny">My progress</h2>
          <h2 className="ui header tiny">Total <small>{overall.done} / {overall.total}</small></h2>
          <Progress
            max={overall.total}
            value={overall.done}
          />
        </div>
        {categories.map(({ title, done, total }) =>
          <div>
            <h2 className="ui header tiny">
              {title}
              {' '}
              <small>{done} / {total}</small>
            </h2>
            <Progress
              max={total}
              value={done}
            />
          </div>
        )}
      </div>
    );
  }

}

CourseProgress.propTypes = {
  overall: PropTypes.shape({
    done: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    done: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    title: PropTypes.string,
  })).isRequired,
};
