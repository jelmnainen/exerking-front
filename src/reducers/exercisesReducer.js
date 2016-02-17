import { EXERCISES_REQUEST_SUCCESS, EXERCISES_REQUEST_FAILED, EXERCISES_SINGLE_REQUEST_SUCCESS,
  EXERCISES_SINGLE_REQUEST_FAIL } from '../actions/exercisesActions';
import { LOGOUT } from '../actions/authActions';

export default function (state = {}, { type, payload }) {
  switch (type) {

  case EXERCISES_REQUEST_SUCCESS:
    return payload.reduce((map, exercise) => {
      map[exercise.id] = exercise;
      return map;
    }, {});
  case EXERCISES_REQUEST_FAILED:
    return {};
  case LOGOUT:
    return {};
  case EXERCISES_SINGLE_REQUEST_SUCCESS:
    return Object.assign({}, state, {
      [payload.id]: payload,
    });
  case EXERCISES_SINGLE_REQUEST_FAIL:
  default:
    return state;
  }
}
