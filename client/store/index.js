import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import reducers from '../reducers';

const configureStore = (history) => {
  const middleware = [routerMiddleware(history), thunk];

  return createStore(reducers, applyMiddleware(...middleware));
};

export default configureStore;
