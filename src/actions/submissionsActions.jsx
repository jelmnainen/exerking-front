import { createAxios } from '../utils';

export const SUBMISSIONS_ADD = 'SUBMISSIONS_ADD';
export const SUBMISSIONS_ADD_SUCCESS = 'SUBMISSIONS_ADD_SUCCESS';
export const SUBMISSIONS_ADD_FAIL = 'SUBMISSIONS_ADD_FAIL';
export const SUBMISSIONS_ADD_RESET = 'SUBMISSIONS_ADD_RESET';

const addSubmission = () => ({
  type: SUBMISSIONS_ADD,
});

const addSubmissionSuccess = (responseData) => ({
  type: SUBMISSIONS_ADD_SUCCESS,
  payload: responseData,
});

const addSubmissionFail = (errors) => ({
  type: SUBMISSIONS_ADD_FAIL,
  errors,
});

export const addSubmissionReset = () => ({ type: SUBMISSIONS_ADD_RESET });

export const submitExercise = (exerciseId, feedbackAsked) =>
  (dispatch, getState) => {
    dispatch(addSubmission());
    const axios = createAxios(getState().auth.token);
    axios.post('/submissions', {
      exercise_id: exerciseId,
      feedback_asked: feedbackAsked,
    })
      .then(response => {
        dispatch(addSubmissionSuccess(response.data));
      })
      .catch(response => {
        dispatch(addSubmissionFail(response.data && response.data.errors));
        console.error(response);
      });
  };
