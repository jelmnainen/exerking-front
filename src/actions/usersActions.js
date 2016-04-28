import { CALL_API } from '../middleware/api';

export const USERS_REQUEST = 'USERS_REQUEST';
export const USERS_SUCCESS = 'USERS_SUCCESS';
export const USERS_FAIL = 'USERS_FAIL';

export const fetchAllUsers = () => ({
  [CALL_API]: {
    types: [
      USERS_REQUEST,
      USERS_SUCCESS,
      USERS_FAIL,
    ],
    endpoint: '/users',
  },
});
