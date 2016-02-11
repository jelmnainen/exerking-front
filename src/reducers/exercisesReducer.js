import { EXERCISES_REQUEST_SUCCESS, EXERCISES_REQUEST_FAILED } from '../actions/exercisesActions';

export default function (state = [], { type, payload }) {
  switch (type) {

  case EXERCISES_REQUEST_SUCCESS:
    return payload;
  case EXERCISES_REQUEST_FAILED:
    return [];
  default:
    return state;
  }
}
