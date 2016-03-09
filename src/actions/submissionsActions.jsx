import { createAxios } from '../utils';

export const SUBMISSIONS_ADD = 'SUBMISSIONS_ADD';
export const SUBMISSIONS_ADD_SUCCESS = 'SUBMISSIONS_ADD_SUCCESS';
export const SUBMISSIONS_ADD_FAIL = 'SUBMISSIONS_ADD_FAIL';
export const SUBMISSIONS_ADD_RESET = 'SUBMISSIONS_ADD_RESET';
export const SUBMISSIONS_REQUEST = 'SUBMISSIONS_REQUEST';
export const SUBMISSIONS_SUCCESS = 'SUBMISSIONS_SUCCESS';
export const SUBMISSIONS_FAIL = 'SUBMISSIONS_FAIL';
export const SUBMISSIONS_SUBMIT_FEEDBACK_SUCCESS = 'SUBMISSIONS_SUBMIT_FEEDBACK_SUCCESS';
export const SUBMISSIONS_SUBMIT_FEEDBACK_FAIL = 'SUBMISSIONS_SUBMIT_FEEDBACK_FAIL';
export const SUBMISSIONS_SINGLE_REQUEST = 'SUBMISSIONS_SINGLE_REQUEST';
export const SUBMISSIONS_SINGLE_SUCCESS = 'SUBMISSIONS_SINGLE_SUCCESS';
export const SUBMISSIONS_SINGLE_FAILURE = 'SUBMISSIONS_SINGLE_FAILURE';

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

const submitFeedbackSuccess = (responseData) => ({
  type: SUBMISSIONS_SUBMIT_FEEDBACK_SUCCESS,
  payload: responseData,
});

const submitFeedbackFail = (responseData) => ({
  type: SUBMISSIONS_SUBMIT_FEEDBACK_FAIL,
  payload: responseData,
});

export const addSubmissionReset = () => ({ type: SUBMISSIONS_ADD_RESET });

export const submitExercise = (exerciseId, feedbackAsked, fileContent, fileType) =>
  (dispatch, getState) => {
    dispatch(addSubmission());
    const auth = getState().get('auth');
    const userId = auth.get('id');
    const token = auth.get('token');
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

const singleSubmissionRequest = () => ({
  type: SUBMISSIONS_SINGLE_REQUEST,
});

const singleSubmissionSuccess = (payload) => ({
  type: SUBMISSIONS_SINGLE_SUCCESS,
  payload,
});

const singleSubmissionFailure = () => ({
  type: SUBMISSIONS_SINGLE_FAILURE,
});

export const fetchSubmission = (id) =>
  (dispatch, getState) => {
    dispatch(singleSubmissionRequest());
    const token = getState().getIn(['auth', 'token']);
    const axios = createAxios(token);
    axios.get(`/submissions/${id}`)
      .then(response => {
        dispatch(singleSubmissionSuccess(response.data));
      })
      .catch(response => {
        dispatch(singleSubmissionFailure(response.data && response.data.errors));
      });
  };

export const patchSubmission = (submissionId, feedback, done) =>
  (dispatch, getState) => {
    const token = getState().getIn(['auth', 'token']);
    const axios = createAxios(token);
    axios.put(`/submissions/${submissionId}`, {
      feedback,
      done,
    })
      .then(response => {
        dispatch(submitFeedbackSuccess(response.data));
      })
      .catch(response => {
        dispatch(submitFeedbackFail(response.data && response.data.errors));
      });
  };

export const fetchExerciseSubmissions = (exerciseId, userId) =>
  (dispatch, getState) => {
    dispatch(fetchSubmissionsRequest());
    const token = getState().getIn(['auth', 'token']);
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
    const currentUserId = getState().getIn(['auth', 'id']);
    dispatch(fetchExerciseSubmissions(exerciseId, currentUserId));
  };

export const fetchAllSubmissions = () =>
  (dispatch, getState) => {
    dispatch(fetchSubmissionsRequest());
    const token = getState().getIn(['auth', 'token']);
    const axios = createAxios(token);
    axios.get(`/submissions`)
      .then(response => {
        dispatch(fetchSubmissionsSuccess(response.data));
      })
      .catch(e => {
        dispatch(fetchSubmissionsFail());
        console.log(e);
      });
  };

export const fetchUserSubmissions = (userId) =>
  (dispatch, getState) => {
    dispatch(fetchSubmissionsRequest());
    const token = getState().getIn(['auth', 'token']);
    const axios = createAxios(token);
    axios.get(`/users/${userId}/submissions`)
      .then(response => {
        dispatch(fetchSubmissionsSuccess(response.data));
      })
      .catch(e => {
        dispatch(fetchSubmissionsFail());
        console.log(e);
      });
  };

export const fetchCurrentUserSubmissions = () =>
  (dispatch, getState) => {
    const currentUserId = getState().getIn(['auth', 'id']);
    dispatch(fetchUserSubmissions(currentUserId));
  };
