import React, { Component, PropTypes } from 'react';

import Progress from './../components/Progress';

export default class TeacherVisualization extends Component {

  render() {
    const {
      exerciseProgress,
      batchProgress,
      categoryProgress,
    } = this.props;

    return (
      <div className="row">
        <div className="column">
          <div className="ui stacked segments">
            <div className="ui raised segment">
              <h2 className="ui header medium">All submissions and exercises</h2>
              <Progress
                max={exerciseProgress.total}
                value={exerciseProgress.done}
                size="large"
              />
              <h2 className="ui header medium">Sets</h2>
              {batchProgress.map(batch =>
                <div key={batch.id}>
                  <h3 className="ui header tiny">{batch.title}</h3>
                  <Progress
                    max={batch.total}
                    value={batch.done}
                  />
                </div>
              )}
              <h2 className="ui header medium">Categories</h2>
              {categoryProgress.map(category =>
                <div key={category.id}>
                  <h3 className="ui header tiny">{category.title}</h3>
                  <Progress
                    max={category.total}
                    value={category.done}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    );
  }
}

TeacherVisualization.propTypes = {
  exerciseProgress: PropTypes.object.isRequired,
  batchProgress: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  categoryProgress: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};
