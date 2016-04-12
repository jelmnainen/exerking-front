import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import { fetchAllSubmissions, setFilter } from '../actions/submissionsActions';
import { FILTER_FEEDBACK }
  from '../constants/submissionsConstants';
import { fetchExercises } from '../actions/exercisesActions';
import { fetchAllUsers } from '../actions/usersActions';
import SubmissionsPage from '../components/SubmissionsPage';

const getLoadingStatus = (state) => {
  const submissions = state.getIn(['submissions', 'isFetching']);
  const exercises = state.getIn(['exercises', 'isFetching']);
  const users = state.getIn(['users', 'isFetching']);
  return submissions || exercises || users;
};

const getSubmissions = createSelector(
  [
    state => state.getIn(['submissions', 'entries']),
    state => state.getIn(['submissions', 'filter']),
  ],
  (submissions, filter) => {
    let filteredSubmissions = submissions
      .filter(submission => submission.get('superseded_by') === null);
    if (filter === FILTER_FEEDBACK) {
      filteredSubmissions = filteredSubmissions
        .filter(submission => submission.get('feedback_asked'));
    }
    return filteredSubmissions
      .sortBy(submission => -submission.get('id'));
  }
);

const getExercises = state => state.getIn(['exercises', 'entries']);
const filter = state => state.getIn(['submissions', 'filter']);
const getUsers = state => state.getIn(['users', 'entries']);

const mapStateToProps = createStructuredSelector({
  isLoading: getLoadingStatus,
  submissions: getSubmissions,
  exercises: getExercises,
  users: getUsers,
  currentFilter: filter,
});

const mapDispatchToProps = (dispatch) => ({
  fetchSubmissions() {
    dispatch(fetchAllSubmissions());
    dispatch(fetchExercises());
    dispatch(fetchAllUsers());
  },
  setFilter(type) {
    dispatch(setFilter(type));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionsPage);
