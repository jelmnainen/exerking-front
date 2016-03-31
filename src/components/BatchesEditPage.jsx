import React, { Component } from 'react';
import moment from 'moment';

export default class BatchesEditPage extends Component {

  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    this.props.fetchBatch(this.props.params.id);
  }

  componentWillReceiveProps(props) {
    const batch = props.batch;
    if (batch !== this.props.batch) {
      this.assignInputValues(batch);
    }
  }

  onSubmit(event) {
    event.preventDefault();

    const { updateBatch, form: { inProgress } } = this.props;
    const title = this.refs.title.value;
    const deadline = this.refs.deadline.value;

    if (inProgress) {
      return;
    }

    updateBatch(this.props.params.id, { title, deadline });
  }

  assignInputValues(batch) {
    this.refs.title.value = batch.get('title');
    this.refs.deadline.value = moment(batch.get('deadline')).format('YYYY-MM-DD');
  }

  render() {
    const { form: { inProgress, isSuccess, errorMessages } } = this.props;

    let updated;
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
      updated = (
        <div className="ui success message">
          <p>Set was edited successfully</p>
        </div>
      );
    }

    return (
      <div className="row">
        <div className="column">
          <h2 className="ui header">Edit set</h2>
          {updated}
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
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
