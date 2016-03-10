import { connect } from 'react-redux';

import { fetchSingleExercise } from '../../actions/exercisesActions';
import * as submissionsActions from '../../actions/submissionsActions';
import SubmissionsSingleView from '../SubmissionsSingleView';

const mapStateToProps = (state, props) => {
  const { submissions: { entries } } = state;
  const submission = entries[props.params.id];
  return ({
    submission,
    exercise: state.exercises.entries[submission.exercise_id],
  });
};

const mapDispatchToProps = (dispatch) => ({
  fetchSingleExercise: (id) =>
    dispatch(fetchSingleExercise(id)),
  fetchSubmissions: (exerciseId) =>
    dispatch(submissionsActions.fetchCurrentUserExerciseSubmissions(exerciseId)),
  patchSubmission: (id, feedback) =>
    dispatch(submissionsActions.patchExercise(id, feedback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionsSingleView);
