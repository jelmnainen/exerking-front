import React, { Component } from 'react';

export default class ExerciseList extends Component {

  render() {
    return (
      <div className="exerciseList">
        <ul>
          {this.props.exercises.map((exercise, i) =>
            (<li key={i} className={'exsercise-single'}>
              <h4>{exercise.title}</h4>
              <span className="byline">{exercise.deadline}</span>
              <p>{exercise.text}</p>
            </li>)
          )}
        </ul>
      </div>
    );
  }
}
