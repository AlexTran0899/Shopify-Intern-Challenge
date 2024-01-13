import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import {useStripe, useElements, PaymentRequestButtonElement} from "@stripe/react-stripe-js";

export default function ApplePay() {
    const [paymentRequest, setPaymentRequest] = useState(null)

    const navigate = useNavigate()
    const stripe = useStripe()
    const elements = useElements()

    useEffect(() => {
        if(!stripe || !elements) {
            return;
        }
        const pr = stripe.paymentRequest({
            currency : 'usd',
            country: 'US',
            requestPayerEmail: true,
            requestPayerName: true,
            total: {
                label: 'demo payment',
                amount:50,
            }
        })
        pr.canMakePayment().then(res => {
            if(res) {
                // show some button on the page
                setPaymentRequest(pr)
            }
        })
    }, [stripe, elements]);

    return (
        <div>
            {paymentRequest && <PaymentRequestButtonElement options={{paymentRequest}}/>}
        </div>
    )
}
