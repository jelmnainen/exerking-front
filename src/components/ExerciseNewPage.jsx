import React, { Component } from 'react';
import { Map, List } from 'immutable';

export default class ExercisesNewPage extends Component {

  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    this.props.fetchCategories();
    this.props.fetchBatches();
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
    const fileUpload = this.refs.fileUpload.checked;
    const categoryId = this.refs.category.value;
    const batchId = this.refs.batchId.value;

    if (inProgress) {
      return;
    }

    addExercise({ title, text, fileUpload, categoryId, batchId });
  }

  render() {
    const { inProgress, errorMessages = Map(), isCreated, categories, batches } = this.props;

    let titleErrors;
    let textErrors;
    let created;
    let batchIdErrors;

    if (!errorMessages.get('title', List()).isEmpty()) {
      titleErrors = (
        <div className="ui pointing red basic label">
          {errorMessages.get('title').join(', ')}
        </div>
      );
    }
    if (!errorMessages.get('text', List()).isEmpty()) {
      textErrors = (
        <div className="ui pointing red basic label">
          {errorMessages.get('text').join(', ')}
        </div>
      );
    }

    if (!errorMessages.get('batchId', List()).isEmpty()) {
      batchIdErrors = (
        <div className="ui pointing red basic label">
          {errorMessages.get('batchId').join(', ')}
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
              <label>Set</label>
              <select className="ui dropdown" ref="batchId">
                <option value="">Select set</option>
                {batches.valueSeq().map(batch =>
                  <option key={batch.get('id')} value={batch.get('id')}>
                    {batch.get('title')}
                  </option>
                )}
              </select>
              {batchIdErrors}
            </div>
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
                  <option key={category.get('id')} value={category.get('id')}>
                    {category.get('title')}
                  </option>
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
