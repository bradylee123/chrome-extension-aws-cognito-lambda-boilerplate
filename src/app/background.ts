import { applyMiddleware, createStore } from 'redux';
import { alias, wrapStore } from 'webext-redux';
import rootReducers from '../store/reducers';
import { authAliases, profileAliases, songAliases } from '../store/aliases/index';

import thunkMiddleware from 'redux-thunk';
 
const middleware = [thunkMiddleware];

const store = createStore(
  rootReducers,
  applyMiddleware(
    alias(authAliases),
    alias(profileAliases),
    alias(songAliases),
    ...middleware
  )
);

wrapStore(store, {portName: 'MY_APP'});

chrome.runtime.onInstalled.addListener(() => {

	chrome.storage.sync.set({}, () => {

	})

});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Background got a message!", message)
})