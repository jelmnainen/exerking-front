import { decamelizeKeys } from 'humps';

export const CALL_API = Symbol('CALL_API');

export default store => next => action => {
  const api = action[CALL_API];
  if (typeof api === 'undefined') {
    next(action);
    return;
  }

  const { types, endpoint, method = 'get', payload, validate, authenticate = true } = api;
  const [REQUEST, SUCCESS, FAILURE] = types;

  next({ type: REQUEST });

  if (validate) {
    const errors = validate(payload);
    if (errors) {
      next({ type: FAILURE, payload: errors });
      return;
    }
  }

  const fullUrl = process.env.API_URL + endpoint;
  const headers = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  });
  const body = typeof payload !== 'undefined'
    ? JSON.stringify(decamelizeKeys(payload)) : undefined;

  if (authenticate) {
    const token = store.getState().getIn(['auth', 'token']);
    headers.set('Authorization', `Bearer ${token}`);
  }

  fetch(fullUrl, { method, headers, body })
    .then(response => response.json().then(json => ({ response, json })))
    .then(({ json, response }) => {
      if (response.ok) {
        next({ type: SUCCESS, payload: json });
      } else if (response.status === 422) { // unprocessable entity
        next({ type: FAILURE, payload: json.errors });
      } else {
        next({ type: FAILURE, payload: { base: [json.message || json.error] } });
      }
    })
    .catch(err => {
      next({ type: FAILURE, error: true, payload: err });
    });
};
