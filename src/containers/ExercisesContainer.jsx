import { connect } from 'react-redux';

import ExercisesPage from '../components/ExercisesPage';
import { fetchCategories } from '../actions/categoriesActions';
import { fetchExercises, deleteExercise } from '../actions/exercisesActions';
import { fetchBatches, deleteBatch } from '../actions/batchesActions';
import { fetchCurrentUserSubmissions } from '../actions/submissionsActions';

const mapStateToProps = (state) => {
  const currentUserId = state.getIn(['auth', 'id']);
  const submissions = state.getIn(['submissions', 'entries'])
    .filter(submission => submission.get('user_id') === currentUserId);
  const exercises = state.getIn(['exercises', 'entries'])
    .map(exercise => exercise.set(
      'done',
      submissions.some(submission =>
        submission.get('exercise_id') === exercise.get('id') &&
        !submission.get('superseded_by') &&
        submission.get('done')
      )
    ))
    .toList()
    .sortBy(exercise => exercise.get('title').toLowerCase())
    .groupBy(exercise => exercise.get('batch_id'));

  const batches = state.getIn(['batches', 'entries'])
    .sortBy(batch => batch.get('deadline'));

  const canEdit = state.getIn(['auth', 'isTeacher']) && state.getIn(['auth', 'isSignedIn']);

  return {
    exercises,
    categories: state.getIn(['categories', 'entries']),
    batches,
    canEdit,
    submissions,
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
