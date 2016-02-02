import React, { Component } from 'react';
import ExercisesList from './ExercisesList';

export default class ExercisesPage extends Component {

  componentDidMount() {
    this.props.exercisesActions.fetchExercises();
  }

  render() {
    return (
      <div className="exercises-page">
        <h3>Exercises</h3>
        <ExercisesList {...this.props}/>
      </div>
    );
  }
}
