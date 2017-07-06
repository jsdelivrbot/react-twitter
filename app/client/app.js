import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
// import io from 'socket.io-client';

import reducers from './reducers';
import TweetsIndex from './components/tweets_index';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

// const socket = io.connect();
// socket.on('tweet', (tweet) => {
//   console.log(tweet);
// });

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <TweetsIndex />
  </Provider>  
  , document.getElementById('app'));
