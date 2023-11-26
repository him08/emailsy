import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';
window.axios=axios;
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

console.log('STRIPE KEY', process.env.REACT_APP_STRIPE_KEY);