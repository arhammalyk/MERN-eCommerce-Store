import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, toggleCart } from "../state/userCart/cartSlice";
import { useNavigate } from "react-router-dom";
import CheckoutPayment from "./CheckoutPayment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

function Cart() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleCloseCart = () => {
    dispatch(toggleCart());
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="w-10/12 md:w-1/2 bg-[#07141d] rounded-md text-white fixed top-32 md:top-1/4 right-8 shadow-lg">
      <div className="p-1">
        <button onClick={handleCloseCart} className="p-2 text-white">
          <FontAwesomeIcon icon={faClose} />
        </button>
      </div>
      <div className=" max-h-96 overflow-y-scroll p-4">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div className="border border-white bg-[#07141d] mb-4 p-4 rounded-md" key={item._id}>

              <h1 className="font-bold text-lg">{item.productName}</h1>
              <p>Price: {item.price} PKR</p>
              <p>Quantity: {item.quantity}</p>

              <div>
                <button
                  onClick={() => {
                    dispatch(removeFromCart(item));
                  }}
                  className="mt-2 p-2 bg-red-900 text-white rounded"
                >
                  Remove from cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>
            <p>Your cart is empty</p>
            {!localStorage.getItem("token") && (
              <div>
                <button
                  onClick={() => navigate("/signin")}
                  className="bg-red-900 p-2"
                >
                  sign in to your account
                </button>
              </div>
            )}
          </div>
        )}
        {cartItems.length > 0 && (
          <div className="p-2">
            <p>Total: {calculateTotal()} PKR</p>
            <Elements stripe={stripePromise}>
              <CheckoutPayment />
            </Elements>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
