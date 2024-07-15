import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { actionCheckoutSession } from "../state/order/orderSlice";

function CheckoutPayment() {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckOut = async (e) => {
    e.preventDefault();
    if (!localStorage.getItem("token")) {
      alert("Login required");
      navigate("/signin");
      return;
    }

    if (!stripe || !elements) {
      return;
    }

    try {
      const card = elements.getElement(CardElement);

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (error) {
        setError(error.message);
        return;
      }

      const currency = "pkr";
      const paymentMethodId = paymentMethod.id;

      await dispatch(
        actionCheckoutSession({
          cartItems,
          currency,
          paymentMethodId,
          navigate,
          dispatch,
        })
      );

      setSuccess(true); // Set success state after successful dispatch
    } catch (error) {
      console.error("Error during checkout:", error);
      setError("Failed to process payment. Please try again.");
    }
  };

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#ffffff",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <form onSubmit={handleCheckOut} className="space-y-4">
      <div className="p-4 border border-gray-300 rounded-lg">
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </div>
      <button
        type="submit"
        disabled={!stripe}
        className="bg-red-900 text-white p-2 rounded-md w-full"
      >
        Check out
      </button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
      {success && (
        <div className="text-green-500 mt-2">Payment Successful!</div>
      )}
    </form>
  );
}

export default CheckoutPayment;
