import {
  faCaretRight,
  faCircleCheck,
  faLeftLong,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function OrderSummary() {
  const navigate = useNavigate();
  const orderSummary = useSelector((state) => state.order.orderSummary);
  return (
    <>
      <div className="w-full mt-16 lg:max-w-screen-xl xl:max-w-screen-2xl 2xl:max-w-screen-2xl mx-auto">
        <button
          className="p-4 bg-red-900 text-white"
          onClick={() => navigate(-1)}
        >
          <FontAwesomeIcon icon={faLeftLong} />
        </button>
        <div className="w-2/3 md:w-1/3 m-auto border border-gray-300 rounded-lg">
          <div className="flex justify-center pt-6">
            <FontAwesomeIcon
              className="text-4xl text-green-700"
              icon={faCircleCheck}
            />
          </div>
          <div className="p-4 font-thin">
            <h1 className="text-xl font-thin">Order Summary</h1>
            <hr className="border-gray-400 my-2" />
            <div className="flex ">
              <div className="w-2/5">
                <p>Status</p>
                <p> Email</p>
                <p>Shipping Address</p>
                <p>Price</p>
                <p>Payment method</p>
                <p>ID</p>
              </div>
              <div className="w-3/5">
                <p>
                  <span>
                    <FontAwesomeIcon icon={faCaretRight} />
                  </span>{" "}
                  {orderSummary?.status}
                </p>
                <p>
                  <span>
                    <FontAwesomeIcon icon={faCaretRight} />
                  </span>{" "}
                  {orderSummary?.receiptEmail}
                </p>
                <p>
                  {" "}
                  <span>
                    <FontAwesomeIcon icon={faCaretRight} />
                  </span>{" "}
                  {orderSummary?.shippingAddress}
                </p>
                <p>
                  <span>
                    <FontAwesomeIcon icon={faCaretRight} />
                  </span>{" "}
                  {orderSummary?.totalPrice} pkr
                </p>
                <p>
                  {" "}
                  <span>
                    <FontAwesomeIcon icon={faCaretRight} />
                  </span>{" "}
                  {orderSummary?.paymentMethodType}
                </p>
                <p>
                  <span>
                    <FontAwesomeIcon icon={faCaretRight} />
                  </span>
                  {orderSummary?._id}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderSummary;
