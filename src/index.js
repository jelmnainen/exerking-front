import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {Router} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import reducer from './reducers';
import routes from './routes';

const history = createBrowserHistory();


const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducer);


const container = document.createElement('div');
document.body.appendChild(container);

const root = (
  <Provider store={store}>
      <Router routes={routes} history={history} />
  </Provider>
);



ReactDOM.render(root, container);
