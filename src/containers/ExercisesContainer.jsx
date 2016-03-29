import { connect } from 'react-redux';

import ExercisesPage from '../components/ExercisesPage';
import { fetchCategories } from '../actions/categoriesActions';
import { fetchExercises } from '../actions/exercisesActions';

const mapStateToProps = (state) => ({
  exercises: state.getIn(['exercises', 'entries']),
  categories: state.getIn(['categories', 'entries']),
});

const mapDispatchToProps = (dispatch) => ({
  fetchExercises() {
    dispatch(fetchExercises());
    dispatch(fetchCategories());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ExercisesPage);
