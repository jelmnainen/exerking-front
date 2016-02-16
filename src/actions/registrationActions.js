import { createAxios } from '../utils';

export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
export const REGISTRATION_REQUEST_SUCCESS = 'REGISTRATION_REQUEST_SUCCESS';
export const REGISTRATION_REQUEST_FAIL = 'REGISTRATION_REQUEST_FAIL';
export const REGISTRATION_RESET = 'REGISTRATION_RESET';

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

export const register = (email, password) =>
  dispatch => {
    dispatch(requestRegistration());
    const axios = createAxios();
    axios.post('/user', {
      user: {
        email,
        password,
      },
    })
      .then(response => {
        dispatch(requestRegistrationSuccess(response.data));
      })
      .catch(response => {
        dispatch(requestRegistrationFail(response.data && response.data.errors));
        console.error(response);
      });
  };
