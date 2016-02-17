import React, { Component } from 'react';
import { Link } from 'react-router';

export default class ExerciseList extends Component {

  renderExercise(exercise) {
    return (
      <li key={exercise.id} className="exercise-single">
        <h4>
          <Link to={`/exercises/${exercise.id}`}>{exercise.title}</Link>
        </h4>
        <span className="byline">{exercise.deadline}</span>
        <p>{exercise.text}</p>
      </li>
    );
  }

  render() {
    const { exercises } = this.props;
    return (
      <div className="exerciseList">
        <ul>
          { Object.keys(exercises).map(id => this.renderExercise(exercises[id])) }
        </ul>
      </div>
    );
  }

}
