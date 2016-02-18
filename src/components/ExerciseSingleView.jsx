import React, { Component } from 'react';

export default class ExerciseSingleView extends Component {

  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    this.props.exercisesActions.fetchSingleExercise(this.props.params.id);
  }

  componentWillUnmount() {
    this.props.onPageLeave();
  }

  onSubmit(event) {
    event.preventDefault();
    const feedback = this.refs.feedbackAsked.checked;
    this.props.submitExercise(this.props.params.id, feedback);
  }

  render() {
    const { exercise } = this.props;

    if (!exercise) {
      return <div>Loading</div>;
    }

    return (
      <div className="exerciseSingle">
        <h1>{exercise.title}</h1>
        <p>Deadline: {exercise.deadline}</p>
        <p>{exercise.text}</p>
        <h3>Submit exercise</h3>
        <form onSubmit={ this.onSubmit }>
          <input type="checkbox" ref="feedbackAsked"/>Ask for feedback
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }

}
