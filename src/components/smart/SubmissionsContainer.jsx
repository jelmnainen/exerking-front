import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import { fetchAllSubmissions } from '../../actions/submissionsActions';
import { fetchExercises } from '../../actions/exercisesActions';
import { fetchAllUsers } from '../../actions/usersActions';
import SubmissionsPage from '../SubmissionsPage';

const getLoadingStatus = (state) => {
  const submissions = state.getIn(['submissions', 'isFetching']);
  const exercises = state.getIn(['exercises', 'isFetching']);
  const users = state.getIn(['users', 'isFetching']);
  return submissions || exercises || users;
};

const getSubmissions = createSelector(
  [
    state => state.getIn(['submissions', 'entries']),
  ],
  (submissions) =>
    submissions.sortBy(submission => -submission.get('id'))
);

const getExercises = state => state.getIn(['exercises', 'entries']);

const getUsers = state => state.getIn(['users', 'entries']);

const mapStateToProps = createStructuredSelector({
  isLoading: getLoadingStatus,
  submissions: getSubmissions,
  exercises: getExercises,
  users: getUsers,
});

const mapDispatchToProps = (dispatch) => ({
  fetchSubmissions() {
    dispatch(fetchAllSubmissions());
    dispatch(fetchExercises());
    dispatch(fetchAllUsers());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionsPage);
