import { CALL_API } from '../middleware/api';

export const CATEGORIES_REQUEST = 'CATEGORIES_REQUEST';
export const CATEGORIES_SUCCESS = 'CATEGORIES_SUCCESS';
export const CATEGORIES_FAILURE = 'CATEGORIES_FAILURE';

export const CATEGORIES_ADD_REQUEST = 'CATEGORIES_ADD_REQUEST';
export const CATEGORIES_ADD_SUCCESS = 'CATEGORIES_ADD_SUCCESS';
export const CATEGORIES_ADD_FAILURE = 'CATEGORIES_ADD_FAILURE';
export const CATEGORIES_ADD_RESET = 'CATEGORIES_ADD_RESET';

export const CATEGORIES_DELETE_REQUEST = 'CATEGORIES_DELETE_REQUEST';
export const CATEGORIES_DELETE_SUCCESS = 'CATEGORIES_DELETE_SUCCESS';
export const CATEGORIES_DELETE_FAILURE = 'CATEGORIES_DELETE_FAILURE';

export const CATEGORIES_UPDATE_REQUEST = 'CATEGORIES_UPDATE_REQUEST';
export const CATEGORIES_UPDATE_SUCCESS = 'CATEGORIES_UPDATE_SUCCESS';
export const CATEGORIES_UPDATE_FAILURE = 'CATEGORIES_UPDATE_FAILURE';
export const CATEGORIES_UPDATE_RESET = 'CATEGORIES_UPDATE_RESET';

export const fetchCategories = () => ({
  [CALL_API]: {
    types: [
      CATEGORIES_REQUEST,
      CATEGORIES_SUCCESS,
      CATEGORIES_FAILURE,
    ],
    endpoint: '/categories',
  },
});

export const deleteCategory = (id) => ({
  [CALL_API]: {
    types: [
      CATEGORIES_DELETE_REQUEST,
      CATEGORIES_DELETE_SUCCESS,
      CATEGORIES_DELETE_FAILURE,
    ],
    endpoint: `/categories/${id}`,
    method: 'delete',
  },
});

export const addCategoryReset = () => ({
  type: CATEGORIES_ADD_RESET,
});

const validateCategory = ({ title }) => {
  let valid = true;
  const errors = {
    title: [],
  };

  if (title === '') {
    valid = false;
    errors.title.push('Title is blank');
  }

  if (valid) {
    return false;
  }

  return errors;
};

export const addCategory = (category) => ({
  [CALL_API]: {
    types: [
      CATEGORIES_ADD_REQUEST,
      CATEGORIES_ADD_SUCCESS,
      CATEGORIES_ADD_FAILURE,
    ],
    endpoint: '/categories',
    method: 'post',
    body: category,
    validate: validateCategory,
  },
});

export const updateCategoryReset = () => ({
  type: CATEGORIES_UPDATE_RESET,
});

export const updateCategory = (id, category) => ({
  [CALL_API]: {
    types: [
      CATEGORIES_UPDATE_REQUEST,
      CATEGORIES_UPDATE_SUCCESS,
      CATEGORIES_UPDATE_FAILURE,
    ],
    endpoint: `/categories/${id}`,
    method: 'put',
    body: category,
    validate: validateCategory,
  },
});
