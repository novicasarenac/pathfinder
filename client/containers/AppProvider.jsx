import React, { Component } from 'react';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';
import { persistStore } from 'redux-persist';
import configureStore from '../store';
import App from './App';

const history = createHistory();
const store = configureStore(history);

class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = { rehydrated: false };
  }

  componentWillMount() {
    persistStore(store, {}, () => {
      this.setState({ rehydrated: true });
    });
  }

  render() {
    // Wait for store to be loaded from localStorage
    if (!this.state.rehydrated) {
      return null;
    }

    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default AppProvider;
