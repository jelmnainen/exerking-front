import React, { Component } from 'react';

export default class ExercisesNewPage extends Component {

  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.onPageLeave();
  }

  onSubmit(event) {
    event.preventDefault();

    const { inProgress } = this.props;
    const { addExercise } = this.props;
    const title = this.refs.title.value;
    const text = this.refs.text.value;
    const deadline = this.refs.deadline.value;
    const fileUpload = this.refs.fileUpload.checked;

    if (inProgress) {
      return;
    }

    addExercise({ title, text, deadline, fileUpload });
  }

  render() {
    const { inProgress, errorMessages, isCreated } = this.props;

    let titleErrors;
    let textErrors;
    let deadlineErrors;
    let created;

    if (errorMessages && errorMessages.title) {
      titleErrors = <p>{ errorMessages.title.join(', ') }</p>;
    }
    if (errorMessages && errorMessages.text) {
      textErrors = <p>{ errorMessages.text.join(', ') }</p>;
    }
    if (errorMessages && errorMessages.deadline) {
      deadlineErrors = <p>{ errorMessages.deadline.join(', ') }</p>;
    }
    if (isCreated) {
      created = <p>Exercise created</p>;
    }

    return (
      <div className="exercise-add">
        <h2>Add new exercise</h2>
        { created }
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Title</label>
            <input ref="title" />
            { titleErrors }
          </div>
          <div>
            <label>Text</label>
            <textarea ref="text" />
            { textErrors }
          </div>
          <div>
            <label>Deadline</label>
            <input type="date" ref="deadline" />
            { deadlineErrors }
          </div>
          <div>
            <input type="checkbox" ref="fileUpload" />Require file upload
          </div>
          <button disabled={ inProgress } type="submit">Add Exercise</button>
        </form>
      </div>
    );
  }

}
