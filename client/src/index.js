// noinspection BadExpressionStatementJS

import React from 'react';
import ReactDOM from 'react-dom/client';
import './Fonts/fontStyles.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from '@stripe/react-stripe-js';
import axios from "axios";
import {REACT_APP_API_URL} from './Utils/Config'

const {publishableKey} = await axios.get(`${REACT_APP_API_URL}/api/payment/config`).then(res => res.data)
const stripePromise = loadStripe(publishableKey)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Elements stripe={stripePromise}>
            <App />
        </Elements>
    </BrowserRouter>
);

reportWebVitals();
