import React, { Component } from 'react';

export default class ExerciseSingleView extends Component {

  componentWillMount() {
    this.props.exercisesActions.fetchSingleExercise(this.props.params.id);
  }

  render() {
    const { exercise } = this.props;

    if (!exercise) {
      return <div>Loading</div>
    }

    return (
      <div className="exerciseSingle">
        <h1>{exercise.title}</h1>
        <p>Deadline: {exercise.deadline}</p>
        <p>{exercise.text}</p>
      </div>
    );
  }

}
