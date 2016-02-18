import React, { Component } from 'react';
import ExercisesList from './ExercisesList';
import { Link } from 'react-router';

export default class ExercisesPage extends Component {

  componentDidMount() {
    this.props.exercisesActions.fetchExercises();
  }

  render() {
    return (
      <div className="exercises-page">
        <h3>Exercises</h3>
        { this.props.teacher && <Link to="/exercises/new">Add exercise</Link> }
        <ExercisesList {...this.props}/>
      </div>
    );
  }
}
