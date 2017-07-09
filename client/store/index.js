import thunk from 'redux-thunk';
import { compose, createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { autoRehydrate } from 'redux-persist';
import reducers from '../reducers';

const configureStore = (history) => {
  const middleware = [routerMiddleware(history), thunk];

  const store = createStore(
    reducers,
    compose(autoRehydrate(), applyMiddleware(...middleware))
  );

  return store;
};

export default configureStore;
