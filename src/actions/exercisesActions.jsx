import axios from 'axios';
export const EXERCISES_REQUEST = 'EXERCISES_REQUEST';
export const EXERCISES_REQUEST_SUCCESS = 'EXERCISES_REQUEST_SUCCESS';

const aInstance = axios.create({
  baseURL: process.env.API_URL,
  headers: { Accept: 'application/json' },
});

const requestExercises = () => ({ type: EXERCISES_REQUEST });

const receiveExercises = (exercises) => ({
  type: EXERCISES_REQUEST_SUCCESS,
  payload: exercises,
});

export const fetchExercises = () =>
  dispatch => {
    dispatch(requestExercises());
    aInstance.get('/exercises')
			.then(exercises => dispatch(receiveExercises(exercises.data)))
			.catch(e => console.log(e));
  };
