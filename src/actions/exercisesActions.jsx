import { createAxios } from '../utils';

export const EXERCISES_REQUEST = 'EXERCISES_REQUEST';
export const EXERCISES_REQUEST_SUCCESS = 'EXERCISES_REQUEST_SUCCESS';

const requestExercises = () => ({ type: EXERCISES_REQUEST });

const receiveExercises = (exercises) => ({
  type: EXERCISES_REQUEST_SUCCESS,
  payload: exercises,
});

export const fetchExercises = () =>
  (dispatch, getState) => {
    dispatch(requestExercises());
    const accessToken = getState().auth.token;
    const axios = createAxios(accessToken);
    axios.get('/exercises')
			.then(exercises => dispatch(receiveExercises(exercises.data)))
			.catch(e => console.log(e));
  };
