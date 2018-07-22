import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware'


import AppReducer from './src/reducers';
import { AppNavigator, middleware } from './src/navigators/AppNavigator';

const store = createStore(AppReducer, applyMiddleware(middleware,logger,promiseMiddleware()));

export default class Apps extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}