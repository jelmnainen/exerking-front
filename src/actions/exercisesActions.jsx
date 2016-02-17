import { createAxios } from '../utils';

export const EXERCISES_REQUEST = 'EXERCISES_REQUEST';
export const EXERCISES_REQUEST_SUCCESS = 'EXERCISES_REQUEST_SUCCESS';
export const EXERCISES_REQUEST_FAILED = 'EXERCISES_REQUEST_FAILED';
export const EXERCISES_SINGLE_REQUEST_SUCCESS = 'EXERCISES_SINGLE_REQUEST_SUCCESS';
export const EXERCISES_SINGLE_REQUEST_FAIL = 'EXERCISES_SINGLE_REQUEST_FAIL';

const requestExercises = () => ({ type: EXERCISES_REQUEST });

const receiveExercises = (exercises) => ({
  type: EXERCISES_REQUEST_SUCCESS,
  payload: exercises,
});

const exercisesRequestFailed = () => ({
  type: EXERCISES_REQUEST_FAILED,
});

const receiveSingleExercise = (exercise) => ({
  type: EXERCISES_SINGLE_REQUEST_SUCCESS,
  payload: exercise,
});

const receiveSingleExerciseFail = () => ({
  type: EXERCISES_SINGLE_REQUEST_FAIL,
});

export const fetchExercises = () =>
  (dispatch, getState) => {
    dispatch(requestExercises());
    const accessToken = getState().auth.token;
    const axios = createAxios(accessToken);
    axios.get('/exercises')
      .then(response => {
        if (response.status === 200) {
          dispatch(receiveExercises(response.data));
        } else {
          dispatch(exercisesRequestFailed());
        }
      })
      .catch(e => {
        dispatch(exercisesRequestFailed());
        console.log(e);
      });

  };

export const fetchSingleExercise = (id) =>
  (dispatch, getState) => {
    const axios = createAxios(getState().auth.token);
    axios.get('/exercises/'+id)
      .then(response => {
        if (response.status === 200) {
          dispatch(receiveSingleExercise(response.data));
        }
      })
  };
