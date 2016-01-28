import { EXERCISES_REQUEST_SUCCESS } from '../actions/exercisesActions';

export default function (state = [], action) {
  if (action.type === EXERCISES_REQUEST_SUCCESS) {
    return action.payload;
  }

  return state;
}
