import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import Markdown from 'react-remarkable';

export default class ExerciseListItem extends Component {

  constructor(props) {
    super(props);
    this.deleteExercise = this.deleteExercise.bind(this);
  }

  deleteExercise(e) {
    e.stopPropagation();
    const { deleteExercise, exercise } = this.props;
    if (window.confirm(`You are about to delete set "${exercise.get('title')}"`)) {
      deleteExercise(exercise.get('id'));
    }
  }

  renderCategoryLabel() {
    const { category } = this.props;
    if (category) {
      return (
        <span className={`ui tiny ${category.get('color')} label`}>
          {category.get('title')}
        </span>
      );
    }
    return '';
  }

  render() {
    const { canEdit, exercise } = this.props;

    let deleteButton;
    let editButton;
    let doneMark;

    if (canEdit) {
      editButton = (
        <Link
          className="ui mini compact blue button right floated"
          to={`/exercises/${exercise.get('id')}/edit`}
        >
          Edit
        </Link>
      );
      deleteButton = (
        <button
          className="ui mini compact red button right floated"
          onClick={this.deleteExercise}
        >
          Delete
        </button>
      );
    }

    if (exercise.get('done')) {
      doneMark = <i className="checkmark icon green"></i>;
    }

    return (
      <div key={exercise.get('id')}>
        <div className="title">
          <i className="dropdown icon"></i>
          {doneMark}
          {exercise.get('title')} {' '}
          {exercise.get('deadline') &&
            <div className="ui tiny label">
             {moment(exercise.get('deadline')).format('LLL')}
            </div>
          }
          {this.renderCategoryLabel(exercise)}
          {deleteButton}
          {editButton}
          <Link
            className="ui mini compact blue button right floated"
            to={`/exercises/${exercise.get('id')}`}
          >
            View and submit
          </Link>
        </div>
        <div className="content">
          <Markdown source={exercise.get('text')} container="div" />
          <Link to={`/exercises/${exercise.get('id')}`}>
            {exercise.get('title')}
          </Link>
        </div>
      </div>
    );
  }
}

ExerciseListItem.propTypes = {
  deleteExercise: PropTypes.func.isRequired,
  exercise: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
  canEdit: PropTypes.bool.isRequired,
};
