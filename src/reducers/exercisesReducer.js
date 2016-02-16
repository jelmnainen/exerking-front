import { EXERCISES_REQUEST_SUCCESS, EXERCISES_REQUEST_FAILED } from '../actions/exercisesActions';
import { LOGOUT } from '../actions/authActions';

export default function (state = [], { type, payload }) {
  switch (type) {

  case EXERCISES_REQUEST_SUCCESS:
    return payload;
  case EXERCISES_REQUEST_FAILED:
    return [];
  case LOGOUT:
    return [];
  default:
    return state;
  }
}
