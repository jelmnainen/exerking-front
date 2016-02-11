import { createAxios } from '../utils';

export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
export const REGISTRATION_REQUEST_SUCCESS = 'REGISTRATION_REQUEST_SUCCESS';
export const REGISTRATION_REQUEST_FAIL = 'REGISTRATION_REQUEST_FAIL';

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
    const axios = createAxios();
    axios.post('/user', {
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
