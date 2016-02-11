import axios from 'axios';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS';
export const LOGIN_REQUEST_FAIL = 'LOGIN_REQUEST_FAIL';
export const LOGOUT = 'LOGOUT';

const aInstance = axios.create({
  baseURL: process.env.API_URL,
  headers: { Accept: 'application/json' },
});

const requestLogin = () => ({ type: LOGIN_REQUEST });

const requestLoginSuccess = (responseData) => ({
  type: LOGIN_REQUEST_SUCCESS,
  payload: responseData,
});

const requestLoginFail = () => ({
  type: LOGIN_REQUEST_FAIL,
});

export const login = (email, password) =>
  dispatch => {
    dispatch(requestLogin());
    aInstance.post('/user/sign_in', {
      email,
      password,
    })
      .then(response => {
        if (response.status === 200) {
          dispatch(requestLoginSuccess(response.data));
        } else {
          dispatch(requestLoginFail());
        }
      })
      .catch(e => {
        dispatch(requestLoginFail());
        console.log(e);
      });
  };

export const logout = () => ({ type: LOGOUT });
