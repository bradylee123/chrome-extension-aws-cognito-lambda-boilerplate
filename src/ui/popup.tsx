import * as React from "react"
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import {Store, applyMiddleware} from 'webext-redux';
import thunkMiddleware from 'redux-thunk';
import Ui from "./ui";

import "../styles/popup.css";

const store = new Store({portName: 'MY_APP'});
const middleware = [thunkMiddleware];
const storeWithMiddleware = applyMiddleware(store, ...middleware);

// wait for the store to connect to the background page
storeWithMiddleware.ready().then(() => {    
  // The store implements the same interface as Redux's store
  // so you can use tools like `react-redux` no problem!
  ReactDOM.render(
    <Provider store={storeWithMiddleware}><Ui /></Provider>,
    document.getElementById('root')
  );
});