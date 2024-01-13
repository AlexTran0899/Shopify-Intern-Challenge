import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import {useStripe, useElements, PaymentRequestButtonElement} from "@stripe/react-stripe-js";
import axios from "axios";

export default function ApplePay({item_info, setOriginalImageLink}) {
    const [paymentRequest, setPaymentRequest] = useState(null)

    const navigate = useNavigate()
    const stripe = useStripe()
    const elements = useElements()

    const getOriginalImageLink = (stripe_payment_id) => {
        return axios.get(`${process.env.REACT_APP_API_URL}/api/payment/confirm/${stripe_payment_id}`)
            .then(res => res.data)
            .catch(err => console.log(err))
    }

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
                label: `For Picture of ${item_info.image_title}`,
                amount: item_info.price,
            }
        })
        pr.canMakePayment().then(res => {
            if(res) {
                // show some button on the page
                setPaymentRequest(pr)
            }
        })

        pr.on('paymentmethod', async (e) => {
            // create a payment intent on the server
            const payload = {paymentMethodType: 'card',image_key:item_info.image_key}
            const {clientSecret} = await axios.post(`${process.env.REACT_APP_API_URL}/api/payment/create-payment-intent`, payload).then(res => res.data)
            const {error, paymentIntent} = await stripe.confirmCardPayment(
                clientSecret, {
                    payment_method: e.paymentMethod.id,
                }, {
                    handleActions: false,
                }
            )
            if (error) {
                e.complete('fail')
                return;
            }
            e.complete('success')

            if(paymentIntent.status === 'require_action') {
                await stripe.confirmPayment(clientSecret);
            }

            else if (paymentIntent.status === 'succeeded'){
                const {original_image} = await getOriginalImageLink(paymentIntent.id)
                setOriginalImageLink(original_image)
            }
        })
    }, [stripe, elements]);

    const buttonStyle = {
            paymentRequestButton: {
                type: 'default',
                theme: 'dark',
                height: '50px',
                borderRadius:'0'
            }
        }

    return (
        <div >
            {paymentRequest && (
                <PaymentRequestButtonElement
                    options={{
                        paymentRequest,
                        style: buttonStyle
                    }}
                />
            )}
        </div>
    )
}
