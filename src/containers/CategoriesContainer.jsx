import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { fetchCategories, addCategory, addCategoryReset }
  from '../actions/categoriesActions';
import CategoriesPage from '../components/CategoriesPage';

const getCategories = createSelector(
  [
    state => state.getIn(['categories', 'entries']),
  ],
  (categories) =>
    categories.sortBy(category => category.get('title').toLowerCase())
);

const mapStateToProps = (state) => {
  const request = state.getIn(['categories', 'addRequest']);
  return {
    inProgress: request.get('inProgress'),
    isError: request.get('isError'),
    errorMessages: request.get('errorMessages'),
    isCreated: request.get('isCreated'),
    categories: getCategories(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  addCategory(category) {
    dispatch(addCategory(category));
  },
  onPageLeave() {
    dispatch(addCategoryReset());
  },
  fetchCategories() {
    dispatch(fetchCategories());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesPage);
