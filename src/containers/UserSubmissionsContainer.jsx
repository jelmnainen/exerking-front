import { connect } from 'react-redux';
import { fromJS, Map } from 'immutable';
import { createSelector, createStructuredSelector } from 'reselect';

import { fetchCurrentUserSubmissions } from '../actions/submissionsActions';
import { fetchExercises } from '../actions/exercisesActions';
import SubmissionsPage from '../components/SubmissionsPage';

const getCurrentUserSubmissions = createSelector(
  [
    state => state.getIn(['submissions', 'entries']),
    state => state.getIn(['auth', 'id']),
  ],
  (submissions, userId) =>
    submissions.filter(submission => submission.get('user_id') === userId)
      .sortBy(submission => -submission.get('id'))
);

const getLoadingStatus = (state) => {
  const submissions = state.getIn(['submissions', 'isFetching']);
  const exercises = state.getIn(['exercises', 'isFetching']);
  return submissions || exercises;
};

const getExercises = (state) => state.getIn(['exercises', 'entries']);

const getUsers = createSelector(
  [
    state => state.get('auth'),
  ],
  (auth) =>
    new Map([
      [auth.get('id'), fromJS({ email: auth.get('email') })],
    ])
);

const mapStateToProps = createStructuredSelector({
  isLoading: getLoadingStatus,
  submissions: getCurrentUserSubmissions,
  exercises: getExercises,
  users: getUsers,
});

const mapDispatchToProps = (dispatch) => ({
  fetchSubmissions() {
    dispatch(fetchCurrentUserSubmissions());
    dispatch(fetchExercises());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionsPage);
