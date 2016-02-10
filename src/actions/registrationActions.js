import axios from 'axios';

export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
export const REGISTRATION_REQUEST_SUCCESS = 'REGISTRATION_REQUEST_SUCCESS';
export const REGISTRATION_REQUEST_FAIL = 'REGISTRATION_REQUEST_FAIL';

const aInstance = axios.create({
  baseURL: process.env.API_URL,
  headers: { Accept: 'application/json' },
});

const requestRegistration = () => ({ type: REGISTRATION_REQUEST });

const requestRegistrationSuccess = (responseData) => ({
  type: REGISTRATION_REQUEST_SUCCESS,
  payload: responseData,
});

const requestRegistrationFail = (errors) => ({
  type: REGISTRATION_REQUEST_FAIL,
  errors,
});

export const register = (email, password) =>
  dispatch => {
    dispatch(requestRegistration());
    aInstance.post('/user', {
        user: {
          email,
          password,
        },
      })
      .then(response => {
        if (response.status === 201) {
          dispatch(requestRegistrationSuccess(response.data));
        } else if (response.status === 422) {
          dispatch(requestRegistrationFail(response.data.errors));
        } else {
          dispatch(requestRegistrationFail());
        }
      })
    .catch(e => {
      dispatch(requestRegistrationFail());
      console.log(e);
    });
  };
