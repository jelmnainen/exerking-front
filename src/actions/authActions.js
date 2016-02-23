import { createAxios } from '../utils';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS';
export const LOGIN_REQUEST_FAIL = 'LOGIN_REQUEST_FAIL';
export const LOGOUT = 'LOGOUT';

const requestLogin = () => ({ type: LOGIN_REQUEST });

const requestLoginSuccess = (responseData) => ({
  type: LOGIN_REQUEST_SUCCESS,
  payload: responseData,
});

const requestLoginFail = (errors) => ({
  type: LOGIN_REQUEST_FAIL,
  errors,
});

const checkErrors = (email, password) => {
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

export const login = (email, password) =>
  dispatch => {
    dispatch(requestLogin());
    const errors = checkErrors(email, password);
    if (errors) {
      dispatch(requestLoginFail(errors));
    } else {
      const axios = createAxios();
      axios.post('/users/sign_in', {
        email,
        password,
      })
        .then(response => {
          dispatch(requestLoginSuccess(response.data));
        })
        .catch(response => {
          let messages;
          if (response.status === 422) {
            messages = { email: [response.data.message] };
          }
          dispatch(requestLoginFail(messages));
          console.error(response);
        });
    }
  };

export const logout = () => ({ type: LOGOUT });
