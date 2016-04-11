import { connect } from 'react-redux';

import ExercisesEditPage from '../components/ExercisesEditPage';
import { fetchCategories } from '../actions/categoriesActions';
import
  { fetchSingleExercise, patchExercise, updateExerciseFormReset }
from '../actions/exercisesActions';
import { fetchBatches } from '../actions/batchesActions';

const mapStateToProps = (state, props) => ({
  exercise: state.getIn(['exercises', 'entries', +props.params.id]),
  categories: state.getIn(['categories', 'entries']),
  batches: state.getIn(['batches', 'entries']),
  userIsAllowedToEdit: state.getIn(['auth', 'isTeacher']) && state.getIn(['auth', 'isSignedIn']),
  form: state.getIn(['exercises', 'updateForm']),
});


const mapDispatchToProps = (dispatch) => ({
  fetchExercise(exerciseId) {
    dispatch(fetchCategories());
    dispatch(fetchBatches());
    dispatch(fetchSingleExercise(exerciseId));
  },
  handleSubmit(id, title, text, category, batch, fileUpload) {
    dispatch(patchExercise(id, title, text, category, batch, fileUpload));
  },
  onPageLeave() {
    dispatch(updateExerciseFormReset());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ExercisesEditPage);
