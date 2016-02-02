import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducers';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducer);

if (module.hot) {
  module.hot.accept('./reducers/index', () => {
    const nextReducer = require('./reducers/index').default;
    store.replaceReducer(nextReducer);
  });
}

export default store;
