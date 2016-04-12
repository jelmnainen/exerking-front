import { CALL_API } from '../middleware/api';

export const EXERCISES_REQUEST = 'EXERCISES_REQUEST';
export const EXERCISES_SUCCESS = 'EXERCISES_SUCCESS';
export const EXERCISES_FAILURE = 'EXERCISES_FAILURE';

export const EXERCISES_SINGLE_REQUEST = 'EXERCISES_SINGLE_REQUEST';
export const EXERCISES_SINGLE_SUCCESS = 'EXERCISES_SINGLE_SUCCESS';
export const EXERCISES_SINGLE_FAILURE = 'EXERCISES_SINGLE_FAILURE';

export const EXERCISES_ADD_REQUEST = 'EXERCISES_ADD_REQUEST';
export const EXERCISES_ADD_SUCCESS = 'EXERCISES_ADD_SUCCESS';
export const EXERCISES_ADD_FAILURE = 'EXERCISES_ADD_FAILURE';
export const EXERCISES_ADD_RESET = 'EXERCISES_ADD_RESET';

export const EXERCISES_DELETE_REQUEST = 'EXERCISES_DELETE_REQUEST';
export const EXERCISES_DELETE_SUCCESS = 'EXERCISES_DELETE_SUCCESS';
export const EXERCISES_DELETE_FAILURE = 'EXERCISES_DELETE_FAILURE';

export const EXERCISES_UPDATE_REQUEST = 'EXERCISES_UPDATE_REQUEST';
export const EXERCISES_UPDATE_SUCCESS = 'EXERCISES_UPDATE_SUCCESS';
export const EXERCISES_UPDATE_FAILURE = 'EXERCISES_UPDATE_FAILURE';
export const EXERCISES_UPDATE_RESET = 'EXERCISES_UPDATE_RESET';


export const fetchExercises = () => ({
  [CALL_API]: {
    types: [
      EXERCISES_REQUEST,
      EXERCISES_SUCCESS,
      EXERCISES_FAILURE,
    ],
    endpoint: '/exercises',
  },
});

export const fetchSingleExercise = (id) => ({
  [CALL_API]: {
    types: [
      EXERCISES_SINGLE_REQUEST,
      EXERCISES_SINGLE_SUCCESS,
      EXERCISES_SINGLE_FAILURE,
    ],
    endpoint: `/exercises/${id}`,
  },
});

export const addExerciseReset = () => ({
  type: EXERCISES_ADD_RESET,
});

const validateExercise = ({ title, text, batchId }) => {
  let valid = true;
  const errors = {
    title: [],
    text: [],
    batchId: [],
  };

  if (title === '') {
    valid = false;
    errors.title.push('Title is blank');
  }
  if (text === '') {
    valid = false;
    errors.text.push('Text is blank');
  }
  if (batchId === '') {
    valid = false;
    errors.batchId.push('Set is required');
  }
  if (valid) {
    return false;
  }
  return errors;
};

export const addExercise = (exercise) => ({
  [CALL_API]: {
    types: [
      EXERCISES_ADD_REQUEST,
      EXERCISES_ADD_SUCCESS,
      EXERCISES_ADD_FAILURE,
    ],
    endpoint: '/exercises',
    method: 'post',
    body: exercise,
    validate: validateExercise,
  },
});

export const deleteExercise = (id) => ({
  [CALL_API]: {
    types: [
      EXERCISES_DELETE_REQUEST,
      EXERCISES_DELETE_SUCCESS,
      EXERCISES_DELETE_FAILURE,
    ],
    endpoint: `/exercises/${id}`,
    method: 'delete',
  },
});

export const patchExercise = (id, title, text, categoryId, batchId, fileUpload) => ({
  [CALL_API]: {
    types: [
      EXERCISES_UPDATE_REQUEST,
      EXERCISES_UPDATE_SUCCESS,
      EXERCISES_UPDATE_FAILURE,
    ],
    endpoint: `/exercises/${id}`,
    method: 'put',
    body: {
      title,
      text,
      category_id: categoryId,
      batch_id: batchId,
      file_upload: fileUpload,
    },
    validate: validateExercise,
  },
});

export const updateExerciseFormReset = () => ({
  type: EXERCISES_UPDATE_RESET,
});
