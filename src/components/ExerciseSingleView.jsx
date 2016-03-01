import React, { Component } from 'react';

export default class ExerciseSingleView extends Component {

  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    this.props.exercisesActions.fetchSingleExercise(this.props.params.id);
    this.props.fetchSubmissions(this.props.params.id);
  }

  componentWillUnmount() {
    this.props.onPageLeave();
  }

  onSubmit(event) {
    event.preventDefault();
    const feedback = this.refs.feedbackAsked.checked;
    this.props.submitExercise(this.props.params.id, feedback);
  }

  renderForm(exercise) {
    return (
      <form onSubmit={ this.onSubmit }>
        { exercise.file_upload ?
          <p>File upload block</p>
          :
          <p>Submit exercise</p>
        }
        <input type="checkbox" ref="feedbackAsked"/>Ask for feedback
        <button type="submit">Submit</button>
      </form>
    );
  }

  renderSubmissionList() {
    const { submissions } = this.props;

    if (!submissions) {
      return (<p>No submissions.</p>);
    }
    return (
      <ol>
        { Object.keys(submissions).map(id => this.renderSubmission(submissions[id])) }
      </ol>
    );
  }

  renderSubmission(submission) {
    return (
      <li>
        <p>Done: {submission.done ? 'Yes' : 'No'}</p>
        { submission.feedback && <p>Feedback: {submission.feedback}</p> }
      </li>
    );
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
        { this.renderForm(exercise) }
        <h3>Submissions</h3>
        { this.renderSubmissionList() }
      </div>
    );
  }

}
