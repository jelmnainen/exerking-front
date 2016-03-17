import { CALL_API } from '../middleware/api';

export const SUBMISSIONS_ADD_REQUEST = 'SUBMISSIONS_ADD_REQUEST';
export const SUBMISSIONS_ADD_SUCCESS = 'SUBMISSIONS_ADD_SUCCESS';
export const SUBMISSIONS_ADD_FAILURE = 'SUBMISSIONS_ADD_FAILURE';
export const SUBMISSIONS_ADD_RESET = 'SUBMISSIONS_ADD_RESET';

export const SUBMISSIONS_REQUEST = 'SUBMISSIONS_REQUEST';
export const SUBMISSIONS_SUCCESS = 'SUBMISSIONS_SUCCESS';
export const SUBMISSIONS_FAILURE = 'SUBMISSIONS_FAILURE';

export const SUBMISSIONS_UPDATE_REQUEST = 'SUBMISSIONS_UPDATE_REQUEST';
export const SUBMISSIONS_UPDATE_SUCCESS = 'SUBMISSIONS_UPDATE_SUCCESS';
export const SUBMISSIONS_UPDATE_FAILURE = 'SUBMISSIONS_UPDATE_FAILURE';
export const SUBMISSIONS_UPDATE_RESET = 'SUBMISSIONS_UPDATE_RESET';

export const SUBMISSIONS_SINGLE_REQUEST = 'SUBMISSIONS_SINGLE_REQUEST';
export const SUBMISSIONS_SINGLE_SUCCESS = 'SUBMISSIONS_SINGLE_SUCCESS';
export const SUBMISSIONS_SINGLE_FAILURE = 'SUBMISSIONS_SINGLE_FAILURE';

export const addSubmissionReset = () => ({ type: SUBMISSIONS_ADD_RESET });

export const submitExercise = (exerciseId, feedbackAsked, fileContent, fileType) => ({
  [CALL_API]: {
    types: [
      SUBMISSIONS_ADD_REQUEST,
      SUBMISSIONS_ADD_SUCCESS,
      SUBMISSIONS_ADD_FAILURE,
    ],
    endpoint: '/submissions',
    method: 'post',
    body: state => ({
      userId: state.getIn(['auth', 'id']),
      exerciseId,
      feedbackAsked,
      fileContent,
      fileType,
    }),
  },
});

export const fetchSubmission = (id) => ({
  [CALL_API]: {
    types: [
      SUBMISSIONS_SINGLE_REQUEST,
      SUBMISSIONS_SINGLE_SUCCESS,
      SUBMISSIONS_SINGLE_FAILURE,
    ],
    endpoint: `/submissions/${id}`,
  },
});

export const submissionUpdateReset = () => ({
  type: SUBMISSIONS_UPDATE_RESET,
});

export const patchSubmission = (id, feedback, done) => ({
  [CALL_API]: {
    types: [
      SUBMISSIONS_UPDATE_REQUEST,
      SUBMISSIONS_UPDATE_SUCCESS,
      SUBMISSIONS_UPDATE_FAILURE,
    ],
    endpoint: `/submissions/${id}`,
    method: 'put',
    body: {
      feedback,
      done,
    },
  },
});

export const fetchExerciseSubmissions = (exerciseId, userId) => ({
  [CALL_API]: {
    types: [
      SUBMISSIONS_REQUEST,
      SUBMISSIONS_SUCCESS,
      SUBMISSIONS_FAILURE,
    ],
    endpoint: `/exercises/${exerciseId}/submissions`,
    query: { userId },
  },
});

export const fetchCurrentUserExerciseSubmissions = (exerciseId) =>
  (dispatch, getState) => {
    const currentUserId = getState().getIn(['auth', 'id']);
    dispatch(fetchExerciseSubmissions(exerciseId, currentUserId));
  };

export const fetchAllSubmissions = () => ({
  [CALL_API]: {
    types: [
      SUBMISSIONS_REQUEST,
      SUBMISSIONS_SUCCESS,
      SUBMISSIONS_FAILURE,
    ],
    endpoint: '/submissions',
  },
});

export const fetchUserSubmissions = (userId) => ({
  [CALL_API]: {
    types: [
      SUBMISSIONS_REQUEST,
      SUBMISSIONS_SUCCESS,
      SUBMISSIONS_FAILURE,
    ],
    endpoint: `/users/${userId}/submissions`,
  },
});

export const fetchCurrentUserSubmissions = () =>
  (dispatch, getState) => {
    const currentUserId = getState().getIn(['auth', 'id']);
    dispatch(fetchUserSubmissions(currentUserId));
  };
