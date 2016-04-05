import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router';

export default class ExerciseList extends Component {

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

    if (canEdit) {
      deleteButton = (
        <button
          className="ui mini compact red button right floated"
          onClick={this.deleteExercise}
        >
          Delete
        </button>
      );
    }

    return (
      <div key={exercise.get('id')}>
        <div className="title">
          <i className="dropdown icon"></i>
          {exercise.get('title')} {' '}
          {exercise.get('deadline') &&
            <div className="ui tiny label">
             {moment(exercise.get('deadline')).format('LLL')}
            </div>
          }
          {this.renderCategoryLabel(exercise)}
          {deleteButton}
          <Link
            className="ui mini compact blue button right floated"
            to={`/exercises/${exercise.get('id')}`}
          >
            View and submit
          </Link>
        </div>
        <div className="content">
          <p>{exercise.get('text')}</p>
          <Link to={`/exercises/${exercise.get('id')}`}>
            {exercise.get('title')}
          </Link>
        </div>
      </div>
    );
  }

}
