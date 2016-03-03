import { createAxios } from '../utils';

export const SUBMISSIONS_ADD = 'SUBMISSIONS_ADD';
export const SUBMISSIONS_ADD_SUCCESS = 'SUBMISSIONS_ADD_SUCCESS';
export const SUBMISSIONS_ADD_FAIL = 'SUBMISSIONS_ADD_FAIL';
export const SUBMISSIONS_ADD_RESET = 'SUBMISSIONS_ADD_RESET';
export const SUBMISSIONS_REQUEST = 'SUBMISSIONS_REQUEST';
export const SUBMISSIONS_SUCCESS = 'SUBMISSIONS_SUCCESS';
export const SUBMISSIONS_FAIL = 'SUBMISSIONS_FAIL';

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

const fetchSubmissionsRequest = () => ({ type: SUBMISSIONS_REQUEST });

const fetchSubmissionsSuccess = (submissions) => ({
  type: SUBMISSIONS_SUCCESS,
  payload: submissions,
});

const fetchSubmissionsFail = () => ({
  type: SUBMISSIONS_FAIL,
});

export const addSubmissionReset = () => ({ type: SUBMISSIONS_ADD_RESET });

export const submitExercise = (exerciseId, feedbackAsked, fileContent, fileType) =>
  (dispatch, getState) => {
    dispatch(addSubmission());
    const { id: userId, token } = getState().auth;
    const axios = createAxios(token);
    axios.post('/submissions', {
      user_id: userId,
      exercise_id: exerciseId,
      feedback_asked: feedbackAsked,
      file_content: fileContent,
      file_type: fileType,
    })
      .then(response => {
        dispatch(addSubmissionSuccess(response.data));
      })
      .catch(response => {
        dispatch(addSubmissionFail(response.data && response.data.errors));
        console.error(response);
      });
  };

export const fetchExerciseSubmissions = (exerciseId, userId) =>
  (dispatch, getState) => {
    dispatch(fetchSubmissionsRequest());
    const { token } = getState().auth;
    const params = {};
    if (userId) {
      params.user_id = userId;
    }
    const axios = createAxios(token);
    axios.get(`/exercises/${exerciseId}/submissions`, { params })
      .then(response => {
        dispatch(fetchSubmissionsSuccess(response.data));
      })
      .catch(e => {
        dispatch(fetchSubmissionsFail());
        console.log(e);
      });
  };

export const fetchCurrentUserExerciseSubmissions = (exerciseId) =>
  (dispatch, getState) => {
    const currentUserId = getState().auth.id;
    dispatch(fetchExerciseSubmissions(exerciseId, currentUserId));
  };
