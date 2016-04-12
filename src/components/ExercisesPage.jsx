import React, { Component, PropTypes } from 'react';
import BatchesList from './BatchesList';
import { Link } from 'react-router';
import TeacherSection from '../containers/TeacherSection';
import CourseProgressContainer from '../containers/CourseProgressContainer';

export default class ExercisesPage extends Component {

  componentWillMount() {
    this.props.fetchExercises();
  }

  render() {
    const {
      batches,
      categories,
      exercises,
      deleteBatch,
      deleteExercise,
      canEdit,
    } = this.props;
    return (
      <div className="row">
        <div className="sixteen wide column">
          <div className="ui grid">
            <div className="row">
              <div className="column">
                <h1 className="ui large header">
                  Exercises
                  <TeacherSection>
                    <Link className="ui tiny green button right floated" to="/exercises/new">
                      Create exercise
                    </Link>
                  </TeacherSection>
                  {' '}
                  <TeacherSection>
                    <Link className="ui tiny green button right floated" to="/sets/new">
                      Create set
                    </Link>
                  </TeacherSection>
                </h1>

              </div>
            </div>
            <div className="ui grid">
              <div className="thirteen wide column">
                <BatchesList
                  batches={batches}
                  categories={categories}
                  exercises={exercises}
                  deleteBatch={deleteBatch}
                  deleteExercise={deleteExercise}
                  canEdit={canEdit}
                />
              </div>
              <div className="three wide column">
                <CourseProgressContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ExercisesPage.propTypes = {
  categories: PropTypes.object.isRequired,
  exercises: PropTypes.object.isRequired,
  batches: PropTypes.object.isRequired,
  deleteBatch: PropTypes.func.isRequired,
  fetchExercises: PropTypes.func.isRequired,
  deleteExercise: PropTypes.func.isRequired,
  canEdit: PropTypes.bool.isRequired,
};
