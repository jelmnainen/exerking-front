import { connect } from 'react-redux';

import { fetchCategories } from '../actions/categoriesActions';
import { addExercise, addExerciseReset } from '../actions/exercisesActions';
import { fetchBatches } from '../actions/batchesActions';
import ExerciseNewPage from '../components/ExerciseNewPage';

const mapStateToProps = (state) => {
  const request = state.getIn(['exercises', 'addRequest']);
  return {
    inProgress: request.get('inProgress'),
    isError: request.get('isError'),
    errorMessages: request.get('errorMessages'),
    isCreated: request.get('isCreated'),
    categories: state.getIn(['categories', 'entries']),
    batches: state.getIn(['batches', 'entries']),
  };
};

const mapDispatchToProps = (dispatch) => ({
  addExercise(exercise) {
    dispatch(addExercise(exercise));
  },
  onPageLeave() {
    dispatch(addExerciseReset());
  },
  fetchCategories() {
    dispatch(fetchCategories());
  },
  fetchBatches() {
    dispatch(fetchBatches());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseNewPage);
