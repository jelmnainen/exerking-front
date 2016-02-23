import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as exercisesActions from '../../actions/exercisesActions';
import { submitExercise, addSubmissionReset, fetchCurrentUserSubmissions, }
  from '../../actions/submissionsActions';
import ExerciseSingleView from '../ExerciseSingleView';

const mapStateToProps = (state, props) => ({
  exercise: state.exercises[props.params.id],
});

const mapDispatchToProps = (dispatch) => ({
  exercisesActions: bindActionCreators(exercisesActions, dispatch),
  submitExercise: (exerciseId, feedbackAsked) =>
    dispatch(submitExercise(exerciseId, feedbackAsked)),
  fetchCurrentUserSubmissions: () =>
    dispatch(fetchCurrentUserSubmissions()),
  onPageLeave: () => dispatch(addSubmissionReset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseSingleView);
