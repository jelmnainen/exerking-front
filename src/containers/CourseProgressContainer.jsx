import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import CourseProgress from '../components/CourseProgress';

export class CourseProgressContainer extends Component {

  calculateOverallProgress() {
    const total = this.props.exercises.count();
    const done = this.props.submissions
      .filter(submission => submission.get('superseded_by') === null)
      .filter(submission => submission.get('done'))
      .filter(submission => submission.get('user_id') === this.props.currentUserId)
      .count();
    return {
      total,
      done,
    };
  }

  calculateCategoriesProgress() {
    const exerciseSubmission = this.props.submissions
      .filter(submission => submission.get('user_id') === this.props.currentUserId)
      .groupBy(submission => submission.get('exercise_id'))
      .map(submissions => submissions.sortBy(submission => submission.get('id')).last());

    const categoryProgress = this.props.exercises
      .filter(exercise => exercise.get('category_id'))
      .groupBy(exercise => exercise.get('category_id'))
      .map(exercises =>
        exercises.map(exercise => exerciseSubmission.get(exercise.get('id'), null))
      )
      .map(submissions => submissions.reduce(
        (prev, curr) => ({
          total: prev.total + 1,
          done: prev.done + (curr && curr.get('done') ? 1 : 0),
        }),
        {
          total: 0,
          done: 0,
        }
      ))
      .map((result, categoryId) => Object.assign(result, {
        title: this.props.categories.getIn([categoryId, 'title']),
      }))
      .toArray();

    return categoryProgress;
  }

  render() {
    const overall = this.calculateOverallProgress();
    const categories = this.calculateCategoriesProgress();

    return (
      <CourseProgress
        overall={overall}
        categories={categories}
      />
    );
  }
}

CourseProgressContainer.propTypes = {
  submissions: PropTypes.object.isRequired,
  exercises: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  currentUserId: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  submissions: state.getIn(['submissions', 'entries']),
  exercises: state.getIn(['exercises', 'entries']),
  categories: state.getIn(['categories', 'entries']),
  currentUserId: state.getIn(['auth', 'id']),
});

export default connect(mapStateToProps)(CourseProgressContainer);
