import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import configureStore from './store';
import App from './containers/App';

const history = createHistory();
const store = configureStore(history);

render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById('app')
);
