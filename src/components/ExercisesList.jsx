import React, { Component } from 'react';
import { Link } from 'react-router';

export default class ExerciseList extends Component {
  render() {
    const { exercises } = this.props;
    return (
      <div className="exerciseList">
        <ul>
          { Object.keys(exercises).map(id => {
              const exercise = exercises[id];
              return <li key={id} className="exercise-single">
                <Link to={`/exercises/${exercise.id}`}><h4>{exercise.title}</h4></Link>
                <span className="byline">{exercise.deadline}</span>
                <p>{exercise.text}</p>
              </li>;
            })
          }
        </ul>
      </div>
    );
  }
}
