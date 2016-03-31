import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { updateBatch, updateBatchReset, fetchSingleBatch } from '../actions/batchesActions';
import BatchesEditPage from '../components/BatchesEditPage';


const getUpdateForm = createSelector(
  [
    state => state.getIn(['batches', 'forms', 'update']),
  ],
  (form) => form.toObject()
);

const mapStateToProps = (state, props) => ({
  batch: state.getIn(['batches', 'entries', +props.params.id]),
  form: getUpdateForm(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchBatch(id) {
    dispatch(fetchSingleBatch(id));
  },
  updateBatch(id, batch) {
    dispatch(updateBatch(id, batch));
  },
  updateBatchReset() {
    dispatch(updateBatchReset());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BatchesEditPage);
