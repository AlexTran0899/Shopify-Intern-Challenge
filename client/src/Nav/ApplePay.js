import React, {useState, useEffect} from 'react';
import {PaymentRequestButtonElement, useStripe, useElements} from '@stripe/react-stripe-js';


const CheckoutForm = () => {
  const stripe = useStripe();
  const [paymentRequest, setPaymentRequest] = useState(null);
    const elements = useElements()
  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: 'Demo total',
          amount: 1099,
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
    }
  }, [stripe, elements]);

  if (paymentRequest) {
    return <PaymentRequestButtonElement options={{paymentRequest}} />
  }

  return (
  <>
  <h1>Apple Pay</h1>
  </>)
  ;
}
export default CheckoutForm;