import React from 'react';
import ReactDOM from 'react-dom/client';
import './Fonts/fontStyles.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from '@stripe/react-stripe-js';
import axios from "axios";


const {publishableKey} = await axios.get(`${process.env.REACT_APP_API_URL}/api/payment/config`).then(res => res.data)
console.log(process.env.REACT_APP_API_URL)
const stripePromise = loadStripe(publishableKey)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <BrowserRouter>
        <Elements stripe={stripePromise}>
            <App />
        </Elements>
    </BrowserRouter>
    // </React.StrictMode>
);

reportWebVitals();