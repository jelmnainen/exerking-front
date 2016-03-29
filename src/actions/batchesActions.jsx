import { CALL_API } from '../middleware/api';

export const BATCHES_REQUEST = 'BATCHES_REQUEST';
export const BATCHES_SUCCESS = 'BATCHES_SUCCESS';
export const BATCHES_FAILURE = 'BATCHES_FAILURE';

export const BATCHES_DELETE_REQUEST = 'BATCHES_DELETE_REQUEST';
export const BATCHES_DELETE_SUCCESS = 'BATCHES_DELETE_SUCCESS';
export const BATCHES_DELETE_FAILURE = 'BATCHES_DELETE_FAILURE';

export const BATCHES_ADD_REQUEST = 'BATCHES_ADD_REQUEST';
export const BATCHES_ADD_SUCCESS = 'BATCHES_ADD_SUCCESS';
export const BATCHES_ADD_FAILURE = 'BATCHES_ADD_FAILURE';
export const BATCHES_ADD_RESET = 'BATCHES_ADD_RESET';

export const fetchBatches = () => ({
  [CALL_API]: {
    types: [
      BATCHES_REQUEST,
      BATCHES_SUCCESS,
      BATCHES_FAILURE,
    ],
    endpoint: '/batches',
  },
});

export const deleteBatch = (id) => ({
  [CALL_API]: {
    types: [
      BATCHES_DELETE_REQUEST,
      BATCHES_DELETE_SUCCESS,
      BATCHES_DELETE_FAILURE,
    ],
    endpoint: `/batches/${id}`,
    method: 'delete',
  },
});

const validateBatch = ({ title, deadline }) => {
  let valid = true;
  const errors = {
    title: [],
  };

  if (title === '') {
    valid = false;
    errors.title.push('Title is blank');
  }

  if (deadline === '') {
    valid = false;
    errors.deadline.push('Deadline is blank');
  }

  if (valid) {
    return false;
  }

  return errors;
};

export const addBatch = (batch) => ({
  [CALL_API]: {
    types: [
      BATCHES_ADD_REQUEST,
      BATCHES_ADD_SUCCESS,
      BATCHES_ADD_FAILURE,
    ],
    endpoint: '/batches',
    method: 'post',
    body: batch,
    validate: validateBatch,
  },
});

export const addBatchReset = () => ({
  type: BATCHES_ADD_RESET,
});
