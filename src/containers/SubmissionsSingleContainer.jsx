import { connect } from 'react-redux';

import { fetchExercises } from '../actions/exercisesActions';
import { fetchSubmission, patchSubmission, submissionUpdateReset }
  from '../actions/submissionsActions';
import SubmissionsSingleView from '../components/SubmissionsSingleView';

const mapStateToProps = (state, props) => {
  const id = +props.params.id;
  const submission = state.getIn(['submissions', 'entries', id]);
  const exercise = submission &&
    state.getIn(['exercises', 'entries', submission.get('exercise_id')]);
  const request = state.getIn(['submissions', 'updateRequest']);
  return {
    submission,
    exercise,
    request,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchSubmission(id) {
    dispatch(fetchExercises());
    dispatch(fetchSubmission(id));
  },
  patchSubmission(id, feedback, done) {
    dispatch(patchSubmission(id, feedback, done));
  },
  submissionUpdateReset() {
    dispatch(submissionUpdateReset());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionsSingleView);
