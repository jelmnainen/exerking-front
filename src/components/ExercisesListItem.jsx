import React, { Component, PropTypes } from 'react';
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
        <span className={`ui tiny basic ${category.get('color')} label`}>
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
          className="ui mini icon compact blue button right floated"
          to={`/exercises/${exercise.get('id')}/edit`}
          title="Edit exercise"
        >
          <i className="write icon" />
        </Link>
      );
      deleteButton = (
        <button
          className="ui mini icon compact red button right floated"
          onClick={this.deleteExercise}
          title="Remove exercise"
        >
          <i className="remove icon" />
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
          {this.renderCategoryLabel(exercise)}
          {deleteButton}
          {editButton}
          <Link
            className="ui mini compact blue button right floated"
            to={`/exercises/${exercise.get('id')}`}
          >
            More
          </Link>
        </div>
        <div className="content">
          <Markdown source={exercise.get('text')} container="div" />
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
