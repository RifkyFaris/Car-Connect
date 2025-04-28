import React, { useCallback } from "react";
import { useLocation } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51RGhSzFNC9lumuod1YciBcs8fWrnrUvUUznVMpl4FITPAzpTFLzcdBMEeXs9QMu0t63bQwEEnHsHFo6IlR1FT8uI00lTPccNmm');

const CheckoutForm = () => {
  const location = useLocation();
  const bookingDetails = location.state?.bookingDetails;

  const fetchClientSecret = useCallback(() => {
    return fetch("http://localhost:3000/api/create/checkout/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingDetails })
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, [bookingDetails]);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default CheckoutForm;