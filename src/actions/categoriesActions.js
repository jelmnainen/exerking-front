import { CALL_API } from '../middleware/api';

export const CATEGORIES_REQUEST = 'CATEGORIES_REQUEST';
export const CATEGORIES_SUCCESS = 'CATEGORIES_SUCCESS';
export const CATEGORIES_FAILURE = 'CATEGORIES_FAILURE';

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
