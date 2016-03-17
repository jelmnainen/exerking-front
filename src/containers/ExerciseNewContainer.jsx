import { connect } from 'react-redux';

import { fetchCategories } from '../actions/categoriesActions';
import { addExercise, addExerciseReset } from '../actions/exercisesActions';
import ExerciseNewPage from '../components/ExerciseNewPage';

const mapStateToProps = (state) => {
  const request = state.getIn(['exercises', 'addRequest']);
  return {
    inProgress: request.get('inProgress'),
    isError: request.get('isError'),
    errorMessages: request.get('errorMessages'),
    isCreated: request.get('isCreated'),
    categories: state.getIn(['categories', 'entries']),
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
});

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseNewPage);
