import React, { useEffect, useState } from 'react';
import { PaymentRequestButtonElement, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import StatusMessages, { useMessages } from '../Nav/StatusMessages';
import axios from 'axios'


const ApplePay = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [messages, addMessage] = useMessages();
  const [loading, setloading] = useState(false)
  const [link, setLink] = useState(false)




  useEffect(() => {
    if (!stripe || !elements) {
      return;
    }

    const pr = stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: 'Demo total',
        amount: props.price,
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    // Check the availability of the Payment Request API.
    pr.canMakePayment().then(result => {
      if (result) {
        setPaymentRequest(pr);
      }
    });

    pr.on('paymentmethod', async (e) => {
      const { clientSecret, error: backendError } = await axios.post(`${process.env.REACT_APP_API_URI}/api/auth/create-payment-intent`, {
        amount: props.price,
        image_key: props.image_key
      }).then(res => res.data)

      if (backendError) {
        addMessage(backendError.message);
        return;
      }

      const { error: stripeError, paymentIntent, } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: e.paymentMethod.id,
      }, { handleActions: false });
      if (stripeError) {
        e.complete('fail')
        return;
      }
      e.complete('success');
      if (paymentIntent.status === 'requires_action') {
        stripe.confirmCardPayment(clientSecret)
      }
      const pi = paymentIntent.id
      axios.get(`${process.env.REACT_APP_API_URI}/api/auth/confirm/${pi}`)
        .then(res => setLink(res.data.original_image))
    });
  }, [props]);

  const pay = async (e) => {
    e.preventDefault()
    setloading(true)
    const cardElement = elements.getElement(CardElement);
    const paymentMethodRequest = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: null
    });

    const { clientSecret, error: backendError } = await axios.post(`${process.env.REACT_APP_API_URI}/api/auth/create-payment-intent`, {
      amount: props.price,
      image_key: props.image_key
    }).then(res => res.data)
    const confirmPayment = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethodRequest?.paymentMethod?.id,
    })

    if (confirmPayment) {
      const pi = confirmPayment?.paymentIntent?.id
      axios.get(`${process.env.REACT_APP_API_URI}/api/auth/confirm/${pi}`)
        .then(res => setLink(res.data.original_image))
      setloading(false)
    }
  }
  const cardOption = {
    hidePostalCode: true
  }

  return (
    <>
      {paymentRequest && <PaymentRequestButtonElement options={{ paymentRequest }} />}
      <br />

      <form id='payment-form' onSubmit={pay}>
        <CardElement options={cardOption} />
        <br />
        {loading ? <div><p>loading...</p></div> : null}
        <br />
        {link ? <a href={link}>click here to download image</a> : <button>pay</button>}
        <button onClick={()=> props.setIsModalVisible(false)}>close</button>
      </form>

    </>
  );
};

export default ApplePay;

