import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

import reducer from './reducers';
import App from './components/App';


const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducer);


const container = document.createElement('div');
document.body.appendChild(container);

const root = (
  <Provider store={store}>
    <App/>
  </Provider>
);

ReactDOM.render(root, container);
