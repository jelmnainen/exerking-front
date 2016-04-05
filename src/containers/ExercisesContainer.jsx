import { connect } from 'react-redux';

import ExercisesPage from '../components/ExercisesPage';
import { fetchCategories } from '../actions/categoriesActions';
import { fetchExercises, deleteExercise } from '../actions/exercisesActions';
import { fetchBatches, deleteBatch } from '../actions/batchesActions';
import { fetchCurrentUserSubmissions } from '../actions/submissionsActions';

const mapStateToProps = (state) => {
  const exercises = state.getIn(['exercises', 'entries'])
    .toList()
    .sortBy(exercise => exercise.get('title').toLowerCase())
    .groupBy(exercise => exercise.get('batch_id'));

  const batches = state.getIn(['batches', 'entries'])
    .sortBy(batch => batch.get('deadline'));

  const canEdit = state.getIn(['auth', 'isTeacher']) && state.getIn(['auth', 'isSignedIn']);
  const currentUserId = state.getIn(['auth', 'id']);

  return {
    exercises,
    categories: state.getIn(['categories', 'entries']),
    batches,
    canEdit,
    submissions: state.getIn(['submissions', 'entries'])
      .filter(submission => submission.get('user_id') === currentUserId),
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchExercises() {
    dispatch(fetchExercises());
    dispatch(fetchCategories());
    dispatch(fetchBatches());
    dispatch(fetchCurrentUserSubmissions());
  },
  deleteBatch(id) {
    dispatch(deleteBatch(id));
  },
  deleteExercise(id) {
    dispatch(deleteExercise(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ExercisesPage);
