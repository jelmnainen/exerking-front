import { CALL_API } from '../middleware/api';

export const PASSWORD_RESET_REQUEST = 'PASSWORD_RESET_REQUEST';
export const PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS';
export const PASSWORD_RESET_FAILURE = 'PASSWORD_RESET_FAILURE';
export const PASSWORD_RESET_RESET = 'PASSWORD_RESET_RESET';

const validateEmail = ({ email }) => {
  let valid = true;
  const errors = {
    email: [],
  };

  if (email === '') {
    valid = false;
    errors.email.push('Email is blank');
  }

  if (valid) {
    return false;
  }

  return errors;
};

export const resetPassword = (email) => ({
  [CALL_API]: {
    types: [
      PASSWORD_RESET_REQUEST,
      PASSWORD_RESET_SUCCESS,
      PASSWORD_RESET_FAILURE,
    ],
    endpoint: '/users/password',
    method: 'post',
    body: { email },
    validate: validateEmail,
  },
});

export const resetPasswordReset = () => ({
  type: PASSWORD_RESET_RESET,
});
