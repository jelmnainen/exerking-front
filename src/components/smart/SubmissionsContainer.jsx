import { connect } from 'react-redux';

import { fetchAllSubmissions } from '../../actions/submissionsActions';
import { fetchExercises } from '../../actions/exercisesActions';
import { fetchAllUsers } from '../../actions/usersActions';
import SubmissionsPage from '../SubmissionsPage';

const mapStateToProps = (state) => {
  const { submissions, exercises, users } = state;
  return {
    isLoading: submissions.isFetching || exercises.isFetching || users.isFetching,
    submissions: submissions.entries,
    exercises: exercises.entries,
    users: users.entries,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchAllSubmissions: () => dispatch(fetchAllSubmissions()),
  fetchExercises: () => dispatch(fetchExercises()),
  fetchAllUsers: () => dispatch(fetchAllUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionsPage);
