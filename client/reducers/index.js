import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import profileAnalysis from './profileAnalysis';
import ws from './ws';

const reducer = combineReducers({
  routing: routerReducer,
  form,
  ws,
  profileAnalysis
});

export default reducer;
