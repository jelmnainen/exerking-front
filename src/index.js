import 'core-js/shim';
import 'isomorphic-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import store from './store';
import routes from './routes';

const history = createBrowserHistory();
const container = document.getElementById('root');
const root = (
  <Provider store={store}>
    <Router routes={routes} history={history} />
  </Provider>
);

ReactDOM.render(root, container);
