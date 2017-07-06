import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer } from 'react-router-redux';

const reducers = combineReducers({
  routing: routerReducer,
  form
});

export default reducers;
