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
      titleErrors = (
        <div className="ui pointing red basic label">
          {errorMessages.title.join(', ')}
        </div>
      );
    }
    if (errorMessages && errorMessages.text) {
      textErrors = (
        <div className="ui pointing red basic label">
          {errorMessages.text.join(', ')}
        </div>
      );
    }
    if (errorMessages && errorMessages.deadline) {
      deadlineErrors = (
        <div className="ui pointing red basic label">
          {errorMessages.deadline.join(', ')}
        </div>
      );
    }

    if (isCreated) {
      created = (
        <div className="ui success message">
          <p>Exercise created</p>
        </div>
      );
    }

    return (
      <div className="row">
        <div className="column">
          <h2 className="ui header">Add new excercise</h2>
          {created}
          <form className="ui form" onSubmit={this.onSubmit}>
            <div className="field">
              <label>Title</label>
              <input ref="title" />
              {titleErrors}
            </div>
            <div className="field">
              <label>Text</label>
              <textarea ref="text" />
              {textErrors}
            </div>
            <div className="field">
              <label>Deadline</label>
              <input type="date" ref="deadline" />
              {deadlineErrors}
            </div>
            <div className="inline field">
              <div className="ui checkbox">
                <input type="checkbox" ref="fileUpload" />
                <label>Require file upload</label>
              </div>
            </div>
            <button
              className="ui primary button"
              disabled={inProgress}
              type="submit"
            >
              Add Exercise
            </button>
          </form>
        </div>
      </div>
    );
  }

}
