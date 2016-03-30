import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment';

export default class ExerciseList extends Component {

  componentDidMount() {
    $(this.refs.container).accordion({ exclusive: false }); // eslint-disable-line no-undef
  }

  renderCategoryLabel(exercise) {
    if (!exercise.get('category_id')) {
      return null;
    }
    const category = this.props.categories.get(exercise.get('category_id'));
    return (
      <span className={`ui tiny ${category.get('color')} label`}>
        {category.get('title')}
      </span>
    );
  }

  renderExercise(exercise) {
    return (
      <div key={exercise.get('id')}>
        <div className="title">
          <i className="dropdown icon"></i>
          {exercise.get('title')} {' '}
          {this.renderCategoryLabel(exercise)}
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

  render() {
    const { exercises } = this.props;

    if (!exercises || exercises.isEmpty()) {
      return (
        <div className="ui info message">
          <div>
            No exercises
          </div>
        </div>
      );
    }

    return (
      <div className="ui styled fluid accordion" ref="container">
        {exercises.valueSeq().map(exercise => this.renderExercise(exercise))}
      </div>
    );
  }

}
