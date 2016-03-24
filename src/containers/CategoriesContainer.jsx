import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { fetchCategories, addCategory, addCategoryReset, deleteCategory, updateCategory,
  updateCategoryReset }
  from '../actions/categoriesActions';
import CategoriesPage from '../components/CategoriesPage';

const getCategories = createSelector(
  [
    state => state.getIn(['categories', 'entries']),
  ],
  (categories) =>
    categories.sortBy(category => category.get('title').toLowerCase())
);

const getAddForm = createSelector(
  [
    state => state.getIn(['categories', 'forms', 'add']),
  ],
  (form) => form.toObject()
);

const getUpdateForm = createSelector(
  [
    state => state.getIn(['categories', 'forms', 'update']),
  ],
  (form) => form.toObject()
);

const mapStateToProps = (state) => ({
  addForm: getAddForm(state),
  updateForm: getUpdateForm(state),
  categories: getCategories(state),
});

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
  deleteCategory(id) {
    dispatch(deleteCategory(id));
  },
  updateCategory(id, category) {
    dispatch(updateCategory(id, category));
  },
  updateCategoryReset() {
    dispatch(updateCategoryReset());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesPage);
