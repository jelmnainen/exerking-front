import React, { Component } from 'react';

import ExercisesList from './ExercisesList';
import DeadlineLabel from './DeadlineLabel';

export default class BatchesList extends Component {

  renderBatch(batch) {
    return (
      <div className="row">
        <div className="column">
          <h2 className="ui medium header">
            {batch.get('title')}
            {' '}
            <DeadlineLabel deadline={batch.get('deadline')} />
          </h2>
          <ExercisesList
            exercises={this.props.exercises.get(batch.get('id'))}
            categories={this.props.categories}
          />
        </div>
      </div>
    );
  }

  render() {
    const { batches } = this.props;
    return (
      <div className="ui grid">
        {batches.valueSeq().map(batch => this.renderBatch(batch))}
      </div>
    );
  }
}
