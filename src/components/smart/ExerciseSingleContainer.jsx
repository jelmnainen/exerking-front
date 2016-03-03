import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { filterMap } from '../../utils';

import * as exercisesActions from '../../actions/exercisesActions';
import {
  submitExercise,
  addSubmissionReset,
  fetchCurrentUserExerciseSubmissions,
} from '../../actions/submissionsActions';
import ExerciseSingleView from '../ExerciseSingleView';

const mapStateToProps = (state, props) => ({
  exercise: state.exercises.entries[props.params.id],
  submissions: filterMap(
    state.submissions.entries,
    submission => submission.exercise_id == props.params.id // eslint-disable-line eqeqeq
  ),
});

const mapDispatchToProps = (dispatch) => ({
  exercisesActions: bindActionCreators(exercisesActions, dispatch),
  submitExercise: (exerciseId, feedbackAsked, fileContent, fileType) =>
    dispatch(submitExercise(exerciseId, feedbackAsked, fileContent, fileType)),
  fetchSubmissions: (exerciseId) =>
    dispatch(fetchCurrentUserExerciseSubmissions(exerciseId)),
  onPageLeave: () => dispatch(addSubmissionReset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseSingleView);
