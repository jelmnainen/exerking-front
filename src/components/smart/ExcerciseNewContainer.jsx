import { connect } from 'react-redux';

import { addExercise, addExerciseReset } from '../../actions/exercisesActions';
import ExerciseNewPage from '../ExerciseNewPage';


const mapStateToProps = (state) => ({
  inProgress: state.exercises.addRequest.inProgress,
  isError: state.exercises.addRequest.isError,
  errorMessages: state.exercises.addRequest.errorMessages,
  isCreated: state.exercises.addRequest.isCreated,
});

const mapDispatchToProps = (dispatch) => ({
  addExercise: (exercise) =>
    dispatch(addExercise(exercise)),
  onPageLeave: () =>
    dispatch(addExerciseReset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseNewPage);
