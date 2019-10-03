import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { render } from 'react-dom';

/**
 * Redux
 */
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './store/reducers';

import './index.css';
import App from './containers/App.jsx';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter } from 'react-router-dom'


const store = createStore(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

render (
  <BrowserRouter>
    <Provider store={store}>
        <App />
    </Provider>
  </BrowserRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
