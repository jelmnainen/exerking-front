import { connect } from 'react-redux';

import ExercisesPage from '../components/ExercisesPage';
import { fetchCategories } from '../actions/categoriesActions';
import { fetchExercises } from '../actions/exercisesActions';
import { fetchBatches, deleteBatch } from '../actions/batchesActions';

const mapStateToProps = (state) => {
  const exercises = state.getIn(['exercises', 'entries'])
    .toList()
    .sortBy(exercise => exercise.get('title').toLowerCase())
    .groupBy(exercise => exercise.get('batch_id'));

  const batches = state.getIn(['batches', 'entries'])
    .sortBy(batch => batch.get('deadline'));

  return {
    exercises,
    categories: state.getIn(['categories', 'entries']),
    batches,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchExercises() {
    dispatch(fetchExercises());
    dispatch(fetchCategories());
    dispatch(fetchBatches());
  },
  deleteBatch(id) {
    dispatch(deleteBatch(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ExercisesPage);
