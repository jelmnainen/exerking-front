import { createAxios } from '../utils';

export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
export const REGISTRATION_REQUEST_SUCCESS = 'REGISTRATION_REQUEST_SUCCESS';
export const REGISTRATION_REQUEST_FAIL = 'REGISTRATION_REQUEST_FAIL';
export const REGISTRATION_RESET = 'REGISTRATION_RESET';

const checkErrors = (email, password, passwordConfirmation) => {
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

const requestRegistration = () => ({ type: REGISTRATION_REQUEST });

const requestRegistrationSuccess = (responseData) => ({
  type: REGISTRATION_REQUEST_SUCCESS,
  payload: responseData,
});

const requestRegistrationFail = (errors) => ({
  type: REGISTRATION_REQUEST_FAIL,
  errors,
});

export const resetRegistration = () => ({ type: REGISTRATION_RESET });

export const register = (email, password, passwordConfirmation) =>
  dispatch => {
    dispatch(requestRegistration());

    const errors = checkErrors(email, password, passwordConfirmation);
    if (errors) {
      dispatch(requestRegistrationFail(errors));
    } else {
      const axios = createAxios();
      axios.post('/users', {
        email,
        password,
      })
        .then(response => {
          dispatch(requestRegistrationSuccess(response.data));
        })
        .catch(response => {
          dispatch(requestRegistrationFail(response.data && response.data.errors));
          console.error(response);
        });
    }
  };
