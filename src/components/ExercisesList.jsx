import React, { Component } from 'react';

import ExercisesListItem from './ExercisesListItem';

export default class ExerciseList extends Component {

  componentDidMount() {
    $(this.refs.container).accordion({ exclusive: false }); // eslint-disable-line no-undef
  }

  render() {
    const { exercises, categories, canEdit, deleteExercise } = this.props;

    if (!exercises || exercises.isEmpty()) {
      return (
        <div className="ui info message">
          <div>
            No exercises
          </div>
        </div>
      );
    }

    return (
      <div className="ui styled fluid accordion" ref="container">
        {exercises.valueSeq().map(exercise =>
          <ExercisesListItem
            canEdit={canEdit}
            exercise={exercise}
            deleteExercise={deleteExercise}
            key={exercise.get('id')}
            category={categories.getIn([exercise.get('category_id')])}
          />
        )}
      </div>
    );
  }
}
