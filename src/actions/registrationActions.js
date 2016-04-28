import { CALL_API } from '../middleware/api';

export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
export const REGISTRATION_REQUEST_SUCCESS = 'REGISTRATION_REQUEST_SUCCESS';
export const REGISTRATION_REQUEST_FAIL = 'REGISTRATION_REQUEST_FAIL';
export const REGISTRATION_RESET = 'REGISTRATION_RESET';

const checkErrors = ({ email, password, passwordConfirmation }) => {
  let valid = true;
  const errors = {
    email: [],
    password: [],
  };

  if (email === '') {
    valid = false;
    errors.email.push('Email is blank');
  }
  if (password.length < 8) {
    valid = false;
    errors.password.push('Password must be at least 8 characters long');
  } else if (password !== passwordConfirmation) {
    valid = false;
    errors.password.push('Passwords doesn\'t match!');
  }

  if (valid) {
    return false;
  }
  return errors;
};

export const resetRegistration = () => ({ type: REGISTRATION_RESET });

export const register = (credentials) => ({
  [CALL_API]: {
    types: [
      REGISTRATION_REQUEST,
      REGISTRATION_REQUEST_SUCCESS,
      REGISTRATION_REQUEST_FAIL,
    ],
    endpoint: '/users',
    method: 'post',
    body: credentials,
    validate: checkErrors,
  },
});

