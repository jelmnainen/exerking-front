import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { addBatch, addBatchReset } from '../actions/batchesActions';
import BatchesNewPage from '../components/BatchesNewPage';

const getAddForm = createSelector(
  [
    state => state.getIn(['batches', 'forms', 'add']),
  ],
  (form) => form.toObject()
);

const mapStateToProps = (state) => ({
  form: getAddForm(state),
});

const mapDispatchToProps = (dispatch) => ({
  addBatch(batch) {
    dispatch(addBatch(batch));
  },
  onPageLeave() {
    dispatch(addBatchReset());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BatchesNewPage);
