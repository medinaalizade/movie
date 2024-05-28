import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import "../src/styles/index.css";
import { ListProvider } from "../src/components/ListContext";

ReactDOM.render(
  <Provider store={store}>
    <ListProvider>
      <App />
    </ListProvider>
  </Provider>,
  document.getElementById('root')
);
