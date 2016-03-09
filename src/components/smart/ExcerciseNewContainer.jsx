import { connect } from 'react-redux';

import { addExercise, addExerciseReset } from '../../actions/exercisesActions';
import ExerciseNewPage from '../ExerciseNewPage';

const mapStateToProps = (state) => {
  const request = state.getIn(['exercises', 'addRequest']);
  return {
    inProgress: request.get('inProgress'),
    isError: request.get('isError'),
    errorMessages: request.get('errorMessages'),
    isCreated: request.get('isCreated'),
  };
};

const mapDispatchToProps = (dispatch) => ({
  addExercise(exercise) {
    dispatch(addExercise(exercise));
  },
  onPageLeave() {
    dispatch(addExerciseReset());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseNewPage);
