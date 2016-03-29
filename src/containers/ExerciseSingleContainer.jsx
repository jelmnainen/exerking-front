import { connect } from 'react-redux';

import { fetchSingleExercise } from '../actions/exercisesActions';
import { fetchCategories } from '../actions/categoriesActions';
import {
  submitExercise,
  addSubmissionReset,
  fetchCurrentUserExerciseSubmissions,
} from '../actions/submissionsActions';
import ExerciseSingleView from '../components/ExerciseSingleView';

const mapStateToProps = (state, props) => {
  const id = +props.params.id;
  return {
    exercise: state.getIn(['exercises', 'entries', id]),
    submissions: state.getIn(['submissions', 'entries'])
      .filter(submission => submission.get('exercise_id') === id)
      .sortBy(submission => -submission.get('id')),
    categories: state.getIn(['categories', 'entries']),
  };
};

const mapDispatchToProps = (dispatch) => ({
  submitExercise(exerciseId, feedbackAsked, fileContent, fileType) {
    dispatch(submitExercise(exerciseId, feedbackAsked, fileContent, fileType));
  },
  fetchExercise(exerciseId) {
    dispatch(fetchCurrentUserExerciseSubmissions(exerciseId));
    dispatch(fetchCategories());
    dispatch(fetchSingleExercise(exerciseId));
  },
  onPageLeave() {
    dispatch(addSubmissionReset());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseSingleView);
