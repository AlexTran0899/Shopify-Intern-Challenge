import React, { useEffect, useState } from 'react';
import { PaymentRequestButtonElement, useStripe, useElements } from '@stripe/react-stripe-js';
import StatusMessages, { useMessages } from './StatusMessages';

const ApplePay = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [messages, addMessage] = useMessages();

  useEffect(() => {
    if (!stripe || !elements) {
      return;
    }

    const pr = stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: 'Demo total',
        amount: 60,
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
      const { error: backendError, clientSecret } = await fetch(
        `${process.env.REACT_APP_API_URI}/api/auth/create-payment-intent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentMethodType: 'card',
            currency: 'usd',
          }),
        }
      ).then((r) => r.json());

      if (backendError) {
        addMessage(backendError.message);
        return;
      }

      addMessage('Client secret returned');

      const { error: stripeError, paymentIntent, } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: e.paymentMethod.id,
      }, { handleActions: false });

      if (stripeError) {
        e.complete('fail')
        return;
      }
      e.complete('sucess');
      if (paymentIntent.status === 'requires_action') {
        stripe.confirmCardPayment(clientSecret)
      } else {
        return
      }
    });
  }, [stripe, elements, addMessage]);

  return (
    <>
      {paymentRequest && <PaymentRequestButtonElement options={{ paymentRequest }} />}

      <StatusMessages messages={messages} />

    </>
  );
};

export default ApplePay;