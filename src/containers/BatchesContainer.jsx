import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { fetchBatches, addBatch, addBatchReset, deleteBatch, updateBatch,
  updateBatchReset }
  from '../actions/batchesActions';
import BatchesNewPage from '../components/BatchesNewPage';

const getBatches = createSelector(
  [
    state => state.getIn(['batches', 'entries']),
  ],
  (batches) =>
    batches.sortBy(batch => batch.get('title').toLowerCase())
);

const getAddForm = createSelector(
  [
    state => state.getIn(['batches', 'forms', 'add']),
  ],
  (form) => form.toObject()
);

const getUpdateForm = createSelector(
  [
    state => state.getIn(['batches', 'forms', 'update']),
  ],
  (form) => form.toObject()
);

const mapStateToProps = (state) => ({
  addForm: getAddForm(state),
  updateForm: getUpdateForm(state),
  batches: getBatches(state),
});

const mapDispatchToProps = (dispatch) => ({
  addBatch(batch) {
    dispatch(addBatch(batch));
  },
  onPageLeave() {
    dispatch(addBatchReset());
  },
  fetchBatches() {
    dispatch(fetchBatches());
  },
  deleteBatch(id) {
    dispatch(deleteBatch(id));
  },
  updateBatch(id, batch) {
    dispatch(updateBatch(id, batch));
  },
  updateBatchReset() {
    dispatch(updateBatchReset());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BatchesNewPage);
