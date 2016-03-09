import { connect } from 'react-redux';

import { fetchCurrentUserSubmissions } from '../../actions/submissionsActions';
import { fetchExercises } from '../../actions/exercisesActions';
import SubmissionsPage from '../SubmissionsPage';
import { filterMap } from '../../utils';

const mapStateToProps = (state) => {
  const { submissions, exercises, auth } = state;
  return {
    isLoading: submissions.isFetching || exercises.isFetching,
    submissions: filterMap(submissions.entries, submission => submission.user_id === auth.id),
    exercises: exercises.entries,
    users: {
      [state.auth.id]: {
        id: state.auth.id,
        email: state.auth.email,
      },
    },
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchSubmissions: () => {
    dispatch(fetchCurrentUserSubmissions());
    dispatch(fetchExercises());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionsPage);
