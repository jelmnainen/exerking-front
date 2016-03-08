import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment';

export default class ExerciseList extends Component {

  componentDidMount() {
    $(this.refs.container).accordion({ exclusive: false }); // eslint-disable-line no-undef
  }

  renderExercise(exercise) {
    return (
      <div key={exercise.id}>
        <div className="title">
          <i className="dropdown icon"></i>
          {exercise.title} {' '}
          {!!exercise.deadline ?
            <div className="ui tiny label">
             {moment(exercise.deadline).format('LLL')}
            </div> :
          ''}
          <Link
            className="ui mini compact blue button right floated"
            to={`/exercises/${exercise.id}`}
          >
            View and submit
          </Link>
        </div>
        <div className="content">
          <p>{exercise.text}</p>
          <Link to={`/exercises/${exercise.id}`}>
            {exercise.title}
          </Link>
        </div>
      </div>
    );
  }

  render() {
    const { exercises } = this.props;
    return (
      <div className="ui styled fluid accordion" ref="container">
        {Object.keys(exercises).map(id => this.renderExercise(exercises[id]))}
      </div>
    );
  }

}
