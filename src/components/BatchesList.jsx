import React, { Component, PropTypes } from 'react';
import { List } from 'immutable';

import BatchesListItem from './BatchesListItem';

export default class BatchesList extends Component {
  render() {
    const { batches, categories, exercises, canEdit, deleteExercise } = this.props;
    return (
      <div className="ui grid">
        {batches.valueSeq().map(batch =>
          <BatchesListItem
            key={batch.get('id')}
            batch={batch}
            onDeleteClick={this.props.deleteBatch}
            categories={categories}
            exercises={exercises.get(batch.get('id'), List())}
            canEdit={canEdit}
            deleteExercise={deleteExercise}
          />
        )}
      </div>
    );
  }
}

BatchesList.propTypes = {
  batches: PropTypes.object.isRequired,
  exercises: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  deleteBatch: PropTypes.func.isRequired,
};
