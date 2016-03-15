import { createAxios } from '../utils';

export const EXERCISES_REQUEST = 'EXERCISES_REQUEST';
export const EXERCISES_REQUEST_SUCCESS = 'EXERCISES_REQUEST_SUCCESS';
export const EXERCISES_REQUEST_FAILED = 'EXERCISES_REQUEST_FAILED';
export const EXERCISES_SINGLE_REQUEST = 'EXERCISES_SINGLE_REQUEST';
export const EXERCISES_SINGLE_REQUEST_SUCCESS = 'EXERCISES_SINGLE_REQUEST_SUCCESS';
export const EXERCISES_SINGLE_REQUEST_FAIL = 'EXERCISES_SINGLE_REQUEST_FAIL';
export const EXERCISES_ADD_REQUEST = 'EXERCISES_ADD_REQUEST';
export const EXERCISES_ADD_REQUEST_SUCCESS = 'EXERCISES_ADD_REQUEST_SUCCESS';
export const EXERCISES_ADD_REQUEST_FAIL = 'EXERCISES_ADD_REQUEST_FAIL';
export const EXERCISES_ADD_RESET = 'EXERCISES_ADD_RESET';

const requestExercises = () => ({ type: EXERCISES_REQUEST });

const receiveExercises = (exercises) => ({
  type: EXERCISES_REQUEST_SUCCESS,
  payload: exercises,
});

const exercisesRequestFailed = () => ({
  type: EXERCISES_REQUEST_FAILED,
});

const receiveSingleRequest = () => ({
  type: EXERCISES_SINGLE_REQUEST,
});

const receiveSingleExerciseSuccess = (exercise) => ({
  type: EXERCISES_SINGLE_REQUEST_SUCCESS,
  payload: exercise,
});

const receiveSingleExerciseFail = () => ({
  type: EXERCISES_SINGLE_REQUEST_FAIL,
});

const addExerciseRequest = () => ({
  type: EXERCISES_ADD_REQUEST,
});

const addExercisesSuccess = (payload) => ({
  type: EXERCISES_ADD_REQUEST_SUCCESS,
  payload,
});

const addExercisesFail = (payload) => ({
  type: EXERCISES_ADD_REQUEST_FAIL,
  payload,
});

export const addExerciseReset = () => ({
  type: EXERCISES_ADD_RESET,
});

const checkErrors = ({ title, text, deadline }) => {
  let valid = true;
  const errors = {
    title: [],
    text: [],
    deadline: [],
  };

  if (title === '') {
    valid = false;
    errors.title.push('Title is blank');
  }
  if (text === '') {
    valid = false;
    errors.text.push('Text is blank');
  }
  if (deadline === '') {
    valid = false;
    errors.deadline.push('Deadline is blank');
  }
  if (valid) {
    return false;
  }
  return errors;
};

export const fetchExercises = () =>
  (dispatch, getState) => {
    dispatch(requestExercises());
    const accessToken = getState().getIn(['auth', 'token']);
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
    dispatch(receiveSingleRequest());
    const accessToken = getState().getIn(['auth', 'token']);
    const axios = createAxios(accessToken);
    axios.get(`/exercises/${id}`)
      .then(response => {
        if (response.status === 200) {
          dispatch(receiveSingleExerciseSuccess(response.data));
        }
      })
      .catch(e => {
        dispatch(receiveSingleExerciseFail());
        console.log(e);
      });
  };

export const addExercise = (exercise) =>
  (dispatch, getState) => {
    dispatch(addExerciseRequest());
    const errors = checkErrors(exercise);
    if (errors) {
      dispatch(addExercisesFail(errors));
    } else {
      const accessToken = getState().getIn(['auth', 'token']);
      const axios = createAxios(accessToken);
      axios.post('/exercises', {
        title: exercise.title,
        text: exercise.text,
        deadline: exercise.deadline,
        file_upload: exercise.fileUpload,
      })
        .then(response => {
          dispatch(addExercisesSuccess(response.data));
        })
        .catch(response => {
          dispatch(addExercisesFail(response.data));
        });
    }
  };
