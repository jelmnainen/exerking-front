import { createAxios } from '../utils';

export const SUBMISSIONS_ADD = 'SUBMISSIONS_ADD';
export const SUBMISSIONS_ADD_SUCCESS = 'SUBMISSIONS_ADD_SUCCESS';
export const SUBMISSIONS_ADD_FAIL = 'SUBMISSIONS_ADD_FAIL';
export const SUBMISSIONS_ADD_RESET = 'SUBMISSIONS_ADD_RESET';
export const SUBMISSIONS_CURRENT_USER_REQUEST = 'SUBMISSIONS_CURRENT_USER_REQUEST';
export const SUBMISSIONS_CURRENT_USER_SUCCESS = 'SUBMISSIONS_CURRENT_USER_SUCCESS';
export const SUBMISSIONS_CURRENT_USER_FAIL = 'SUBMISSIONS_CURRENT_USER_FAIL';

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

const requestCurrentUserSubmissions = () => ({ type: SUBMISSIONS_CURRENT_USER_REQUEST });

const fetchCurrentUserSubmissionsSuccess = (submissions) => ({
  type: SUBMISSIONS_CURRENT_USER_SUCCESS,
  payload: submissions,
});

const fetchCurrentUserSubmissionsFail = () => ({
  type: SUBMISSIONS_CURRENT_USER_FAIL,
});

export const addSubmissionReset = () => ({ type: SUBMISSIONS_ADD_RESET });

export const submitExercise = (exerciseId, feedbackAsked) =>
  (dispatch, getState) => {
    dispatch(addSubmission());
    const { id: userId, token } = getState().auth;
    const axios = createAxios(token);
    axios.post('/submissions', {
      user_id: userId,
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

export const fetchCurrentUserSubmissions = () =>
  (dispatch, getState) => {
    dispatch(requestCurrentUserSubmissions());
    const { id: userId, token } = getState().auth;
    const axios = createAxios(token);
    axios.get(`/users/${userId}/submissions`)
      .then(response => {
        dispatch(fetchCurrentUserSubmissionsSuccess(response.data));
      })
      .catch(e => {
        dispatch(fetchCurrentUserSubmissionsFail());
        console.log(e);
      });
  };
