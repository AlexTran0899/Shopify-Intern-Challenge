import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';


const stripePromise = loadStripe('pk_live_51Ja4hPJw6DDPcga4M8z4TcsaH6hjEsibJGdRIi77cIflXNYXVRGHWFUoZRWicoGw8V9OaudAF1nQ3k0yVtlrXW0W00l0CTF6uA');
ReactDOM.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
