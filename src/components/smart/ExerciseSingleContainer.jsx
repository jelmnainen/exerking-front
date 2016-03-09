import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as exercisesActions from '../../actions/exercisesActions';
import {
  submitExercise,
  addSubmissionReset,
  fetchCurrentUserExerciseSubmissions,
} from '../../actions/submissionsActions';
import ExerciseSingleView from '../ExerciseSingleView';

const mapStateToProps = (state, props) => {
  const id = +props.params.id;
  return {
    exercise: state.getIn(['exercises', 'entries', id]),
    submissions: state.getIn(['submissions', 'entries'])
      .filter(submission => submission.get('exercise_id') === id)
      .sortBy(submission => -submission.get('id')),
  };
};

const mapDispatchToProps = (dispatch) => ({
  exercisesActions: bindActionCreators(exercisesActions, dispatch),
  submitExercise(exerciseId, feedbackAsked, fileContent, fileType) {
    dispatch(submitExercise(exerciseId, feedbackAsked, fileContent, fileType));
  },
  fetchSubmissions(exerciseId) {
    dispatch(fetchCurrentUserExerciseSubmissions(exerciseId));
  },
  onPageLeave() {
    dispatch(addSubmissionReset());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseSingleView);
