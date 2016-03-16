import { decamelizeKeys } from 'humps';

function buildQueryString(query) {
  const keys = query && Object.keys(decamelizeKeys(query)).filter(key => query[key] !== undefined);

  if (!keys || keys.length === 0) {
    return '';
  }

  const qs = keys.map(key => [key, query[key]].map(encodeURIComponent).join('='))
    .join('&');

  return `?${qs}`;
}

function buildUrl(state, endpoint, query) {
  let url = process.env.API_URL;

  if (typeof endpoint === 'function') {
    url += endpoint(state);
  } else {
    url += endpoint;
  }

  url += buildQueryString(query);

  return url;
}

function buildHeaders(state, authenticate) {
  const headers = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  });

  if (authenticate) {
    const token = state.getIn(['auth', 'token']);
    headers.set('Authorization', `Bearer ${token}`);
  }

  return headers;
}

function buildBody(state, payload) {
  let body = payload;

  if (typeof body === 'function') {
    body = body(state);
  }
  if (typeof body !== 'undefined') {
    body = JSON.stringify(decamelizeKeys(body));
  }

  return body;
}

export const CALL_API = Symbol('CALL_API');

export default store => next => action => {
  const api = action[CALL_API];
  if (typeof api === 'undefined') {
    next(action);
    return;
  }

  const state = store.getState();
  const { types, method = 'get', endpoint, query, validate, authenticate = true } = api;
  let { body } = api;

  const [REQUEST, SUCCESS, FAILURE] = types;

  next({ type: REQUEST });

  if (validate) {
    const errors = validate(body);
    if (errors) {
      next({ type: FAILURE, payload: errors });
      return;
    }
  }

  const fullUrl = buildUrl(state, endpoint, query);
  const headers = buildHeaders(state, authenticate);
  body = buildBody(state, body);

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
