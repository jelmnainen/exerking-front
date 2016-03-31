import React, { Component } from 'react';

export default class BatchesNewPage extends Component {

  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.addForm.isSuccess) {
      this.refs.title.value = '';
      this.refs.deadline.value = '';
    }
  }

  onSubmit(event) {
    event.preventDefault();

    const { addBatch, addForm: { inProgress } } = this.props;
    const title = this.refs.title.value;
    const deadline = this.refs.deadline.value;

    if (inProgress) {
      return;
    }

    addBatch({ title, deadline });
  }

  render() {
    const { addForm: { inProgress, isSuccess, errorMessages } } = this.props;

    let created;
    let titleErrors;
    let deadlineErrors;

    if (errorMessages && errorMessages.get('title')) {
      titleErrors = (
        <div className="ui pointing red basic label">
          {errorMessages.get('title').join(', ')}
        </div>
      );
    }

    if (errorMessages && errorMessages.get('deadline')) {
      deadlineErrors = (
        <div className="ui pointing red basic label">
          {errorMessages.get('deadline').join(', ')}
        </div>
      );
    }

    if (isSuccess) {
      created = (
        <div className="ui success message">
          <p>Set was created successfully</p>
        </div>
      );
    }

    return (
      <div className="row">
        <div className="column">
          <h2 className="ui header">Create set</h2>
          {created}
          <form className="ui form" onSubmit={this.onSubmit}>
            <div className="field">
              <input ref="title" />
              {titleErrors}
            </div>
            <div className="field">
              <input type="date" ref="deadline" />
              {deadlineErrors}
            </div>
            <button
              className="ui primary button"
              disabled={inProgress}
              type="submit"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    );
  }
}
