import { EXERCISES_REQUEST_SUCCESS } from '../actions/exercisesActions';

export default function (state = [], { type, payload }) {
  switch (type) {

  case EXERCISES_REQUEST_SUCCESS:
    return payload;
  default:
    return state;
  }
}
