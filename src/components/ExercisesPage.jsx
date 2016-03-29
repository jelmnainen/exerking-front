import React, { Component } from 'react';
import ExercisesList from './ExercisesList';
import { Link } from 'react-router';
import TeacherSection from '../containers/TeacherSection';

export default class ExercisesPage extends Component {

  componentWillMount() {
    this.props.fetchExercises();
  }

  render() {
    return (
      <div className="row">
        <div className="column">
          <h1 className="ui large header">
            Exercises
            <TeacherSection>
              <Link className="ui tiny green button right floated" to="/exercises/new">
                Create new
              </Link>
            </TeacherSection>
          </h1>
          <ExercisesList {...this.props} />
        </div>
      </div>
    );
  }
}
