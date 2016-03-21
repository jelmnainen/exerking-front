import { connect } from 'react-redux';

import { fetchCategories, addCategory, addCategoryReset }
  from '../actions/categoriesActions';
import CategoryNewPage from '../components/CategoryNewPage';

const mapStateToProps = (state) => {
  const request = state.getIn(['categories', 'addRequest']);
  return {
    inProgress: request.get('inProgress'),
    isError: request.get('isError'),
    errorMessages: request.get('errorMessages'),
    isCreated: request.get('isCreated'),
    categories: state.getIn(['categories', 'entries']),
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryNewPage);
