import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import TeacherVisualization from '../components/TeacherVisualization';
import { fetchAllSubmissions } from '../actions/submissionsActions';
import { fetchExercises } from '../actions/exercisesActions';
import { fetchAllUsers } from '../actions/usersActions';
import { fetchBatches } from '../actions/batchesActions';
import { fetchCategories } from '../actions/categoriesActions';

export class TeacherVisualizationContainer extends Component {

  componentWillMount() {
    this.props.fetchCourseData();
  }

  calculateExerciseProgress() {
    return {
      total: this.props.exercises.count() * this.props.users.count(),
      done: this.props.submissions.count(),
    };
  }

  calculateProgress(groupKey, getTitle, sortBy) {
    return this.props.exercises
      .filter(exercise => exercise.get(groupKey))
      .groupBy(exercise => exercise.get(groupKey))
      .map(exercises => ({
        total: exercises.count() * this.props.users.count(),
        done: exercises
          .map(exercise =>
            this.props.submissions
              .filter(submission => submission.get('exercise_id') === exercise.get('id'))
          )
          .reduce((prev, curr) => prev + curr.count(), 0),
      }))
      .map((result, id) => Object.assign(result, {
        id,
        title: getTitle(id),
      }))
      .sortBy(sortBy)
      .toArray();
  }

  calculateBatchProgress() {
    return this.calculateProgress(
      'batch_id',
      (id) => this.props.batches.getIn([id, 'title']),
      ({ id }) => this.props.batches.getIn([id, 'deadline'])
    );
  }

  calculateCategoryProgress() {
    return this.calculateProgress(
      'category_id',
      (id) => this.props.categories.getIn([id, 'title']),
      ({ title }) => title
    );
  }

  render() {
    return (
      <TeacherVisualization
        exerciseProgress={this.calculateExerciseProgress()}
        batchProgress={this.calculateBatchProgress()}
        categoryProgress={this.calculateCategoryProgress()}
      />
    );
  }

}

TeacherVisualizationContainer.propTypes = {
  submissions: PropTypes.object.isRequired,
  exercises: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  batches: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  submissions: state.getIn(['submissions', 'entries'])
    .filter(submission => submission.get('superseded_by') === null)
    .filter(submission => submission.get('done')),
  exercises: state.getIn(['exercises', 'entries']),
  categories: state.getIn(['categories', 'entries']),
  users: state.getIn(['users', 'entries']),
  batches: state.getIn(['batches', 'entries']),
});

const mapDispatchToProps = (dispatch) => ({
  fetchCourseData() {
    dispatch(fetchAllSubmissions());
    dispatch(fetchExercises());
    dispatch(fetchAllUsers());
    dispatch(fetchBatches());
    dispatch(fetchCategories());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherVisualizationContainer);
