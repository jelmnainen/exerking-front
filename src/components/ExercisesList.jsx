import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment';

export default class ExerciseList extends Component {

  componentDidMount() {
    $(this.refs.container).accordion({ exclusive: false }); // eslint-disable-line no-undef
  }

  renderExercise(exercise) {
    const { categories } = this.props;
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

          {exercise.get('category_id') &&
            <a className="ui tiny teal label">
              {categories.getIn([exercise.get('category_id'), 'title'])}
            </a>
          }

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
    return (
      <div className="ui styled fluid accordion" ref="container">
        {exercises.valueSeq().map(exercise => this.renderExercise(exercise))}
      </div>
    );
  }

}
