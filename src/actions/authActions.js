import { CALL_API } from '../middleware/api';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS';
export const LOGIN_REQUEST_FAIL = 'LOGIN_REQUEST_FAIL';
export const LOGOUT = 'LOGOUT';

const checkErrors = ({ email, password }) => {
  let valid = true;
  const errors = {
    email: [],
    password: [],
  };

  if (email === '') {
    valid = false;
    errors.email.push('Email is blank');
  }
  if (password === '') {
    valid = false;
    errors.password.push('Password is blank');
  }

  if (valid) {
    return false;
  }
  return errors;
};

export const login = (email, password) => ({
  [CALL_API]: {
    types: [
      LOGIN_REQUEST,
      LOGIN_REQUEST_SUCCESS,
      LOGIN_REQUEST_FAIL,
    ],
    endpoint: '/users/sign_in',
    method: 'post',
    body: { email, password },
    validate: checkErrors,
  },
});

export const logout = () => ({ type: LOGOUT });
