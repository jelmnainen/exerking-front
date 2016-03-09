import { createAxios } from '../utils';

export const USERS_REQUEST = 'USERS_REQUEST';
export const USERS_SUCCESS = 'USERS_SUCCESS';
export const USERS_FAIL = 'USERS_FAIL';

const fetchUsersRequest = () => ({ type: USERS_REQUEST });

const fetchUsersSuccess = (users) => ({
  type: USERS_SUCCESS,
  payload: users,
});

const fetchUsersFail = () => ({
  type: USERS_FAIL,
});

export const fetchAllUsers = () =>
  (dispatch, getState) => {
    dispatch(fetchUsersRequest());
    const token = getState().getIn(['auth', 'token']);
    const axios = createAxios(token);
    axios.get('/users')
      .then(response => {
        dispatch(fetchUsersSuccess(response.data));
      })
      .catch(e => {
        dispatch(fetchUsersFail());
        console.log(e);
      });
  };
