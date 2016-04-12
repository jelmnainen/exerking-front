import React, { Component, PropTypes } from 'react';
import { Map, List } from 'immutable';

export default class ExercisesEditPage extends Component {

  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    this.props.fetchExercise(this.props.params.id);
  }

  componentWillUnmount() {
    this.props.onPageLeave();
  }

  onSubmit(e) {
    e.preventDefault();
    const { title, text, category, batch, fileUpload } = this.refs;
    const { exercise, handleSubmit } = this.props;

    handleSubmit(
      exercise.get('id'),
      title.value,
      text.value,
      category.value,
      batch.value,
      fileUpload.checked
    );
  }

  renderSelect(set, chosenMemberId, name, allowNull) {
    let nullOption;

    if (allowNull) {
      nullOption = <option value="">No {name.toLowerCase()}</option>;
    }

    return (
      <div className="field">
        <label>{name}</label>
        <select className="ui dropdown" defaultValue={chosenMemberId} ref={name.toLowerCase()}>
          {nullOption}
          {set
            .valueSeq()
            .map(member =>
              <option key={member.get('id')} value={member.get('id')}>
                {member.get('title')}
              </option>
            )
          }
        </select>
      </div>
    );
  }

  render() {
    const { exercise, categories, batches, form, userIsAllowedToEdit } = this.props;

    if (!exercise || !categories || !batches || !form) {
      return (
        <h3>Loading...</h3>
      );
    }

    const errorMessages = form.get('errorMessages', Map());
    const isUpdated = form.get('isCreated');

    if (!userIsAllowedToEdit) {
      return (
        <h3>
          You don't have the rights to edit this exercise
        </h3>
      );
    }

    let titleErrors;
    let textErrors;
    let updated;

    if (errorMessages.get('title', List()).count() > 0) {
      titleErrors = (
        <div className="ui pointing red basic label">
          {errorMessages.get('title').join(', ')}
        </div>
      );
    }
    if (errorMessages.get('text', List()).count() > 0) {
      textErrors = (
        <div className="ui pointing red basic label">
          {errorMessages.get('text').join(', ')}
        </div>
      );
    }

    if (isUpdated) {
      updated = (
        <div className="ui success message">
          <p>Exercise updated</p>
        </div>
      );
    }

    return (
      <div className="row">
        <div className="column">
          {updated}
          <h2 className="ui header">Edit exercise</h2>
          <form className="ui form" onSubmit={this.onSubmit}>
            <div className="field">
              <label>Title</label>
              <input ref="title" defaultValue={exercise.get('title')} />
              {titleErrors}
            </div>
            <div className="field">
              <label>Text</label>
              <textarea ref="text" defaultValue={exercise.get('text')} />
              {textErrors}
            </div>
            {this.renderSelect(categories, exercise.get('category_id'), 'Category', true)}
            {this.renderSelect(batches, exercise.get('batch_id'), 'Batch', false)}
            <div className="inline field">
              <div className="ui checkbox">
                <input
                  type="checkbox"
                  ref="fileUpload"
                  defaultChecked={exercise.get('file_upload')}
                />
                <label>Require file upload</label>
              </div>
            </div>
            <button
              className="ui primary button"
              type="submit"
            >
              Edit exercise
            </button>
          </form>
        </div>
      </div>
    );
  }
}

ExercisesEditPage.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  fetchExercise: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  onPageLeave: PropTypes.func.isRequired,
  exercise: PropTypes.object,
  categories: PropTypes.object,
  batches: PropTypes.object,
  userIsAllowedToEdit: PropTypes.bool.isRequired,
};
