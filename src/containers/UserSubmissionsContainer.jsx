import { connect } from 'react-redux';
import { fromJS, Map } from 'immutable';
import { createSelector, createStructuredSelector } from 'reselect';

import { fetchCurrentUserSubmissions, setFilter } from '../actions/submissionsActions';
import { fetchExercises } from '../actions/exercisesActions';
import { FILTER_FEEDBACK }
  from '../constants/submissionsConstants';
import SubmissionsPage from '../components/SubmissionsPage';

const getCurrentUserSubmissions = createSelector(
  [
    state => state.getIn(['submissions', 'entries']),
    state => state.getIn(['auth', 'id']),
    state => state.getIn(['submissions', 'filter']),
  ],
  (submissions, userId, filter) => {
    let filteredSubmissions = submissions
      .filter(submission => submission.get('user_id') === userId)
      .filter(submission => submission.get('superseded_by') === null);
    if (filter === FILTER_FEEDBACK) {
      filteredSubmissions = filteredSubmissions
        .filter(submission => submission.get('feedback_asked'));
    }
    return filteredSubmissions
      .sortBy(submission => -submission.get('id'));
  }
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

const filter = state => state.getIn(['submissions', 'filter']);

const mapStateToProps = createStructuredSelector({
  isLoading: getLoadingStatus,
  submissions: getCurrentUserSubmissions,
  exercises: getExercises,
  users: getUsers,
  currentFilter: filter,
});

const mapDispatchToProps = (dispatch) => ({
  fetchSubmissions() {
    dispatch(fetchCurrentUserSubmissions());
    dispatch(fetchExercises());
  },
  setFilter(type) {
    dispatch(setFilter(type));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionsPage);
