import React, { Component } from 'react';

export default class ExercisesNewPage extends Component {

  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    this.props.fetchCategories();
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
    const categoryId = this.refs.category.value;

    if (inProgress) {
      return;
    }

    addExercise({ title, text, deadline, fileUpload, categoryId });
  }

  render() {
    const { inProgress, errorMessages, isCreated, categories } = this.props;

    let titleErrors;
    let textErrors;
    let deadlineErrors;
    let created;

    if (errorMessages && errorMessages.get('title')) {
      titleErrors = (
        <div className="ui pointing red basic label">
          {errorMessages.get('title').join(', ')}
        </div>
      );
    }
    if (errorMessages && errorMessages.get('text')) {
      textErrors = (
        <div className="ui pointing red basic label">
          {errorMessages.get('text').join(', ')}
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
            <div className="field">
              <label>Category</label>
              <select className="ui dropdown" ref="category">
                <option value="">Select category</option>
                {categories.valueSeq().map(category =>
                  <option value={category.get('id')}>{category.get('title')}</option>
                )}
              </select>
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
