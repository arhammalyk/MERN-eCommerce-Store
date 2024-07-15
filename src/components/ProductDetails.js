import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { actionFetchProductDetails } from "../state/product/productSlice";
import { addToCart, removeFromCart } from "../state/userCart/cartSlice";
import notFound from "../images/products/notfound.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

function ProductDetails() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.selectedProduct);
  const cart = useSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(actionFetchProductDetails(productId));
  }, [dispatch, productId]);

  const cartItem = cart.find((item) => item._id === productId);
  const [addedQuantity, setAddedQuantity] = useState(
    cartItem ? cartItem.quantity : 0
  );

  const handleAddToCart = () => {
    if (addedQuantity < product.quantity) {
      dispatch(addToCart(product));
      setAddedQuantity(addedQuantity + 1);
    }
  };

  const handleRemoveFromCart = () => {
    if (addedQuantity > 0) {
      dispatch(removeFromCart(product));
      setAddedQuantity(addedQuantity - 1);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="w-full lg:max-w-screen-xl xl:max-w-screen-2xl 2xl:max-w-screen-2xl mx-auto">
        <div className="mt-16">
          <button
            className="p-4 bg-red-900 text-white"
            onClick={() => navigate(-1)}
          >
            <FontAwesomeIcon icon={faLeftLong} />
          </button>
        </div>

        <div className="p-6 bg-white md:flex">
          <div className=" bg-black md:w-1/4">
            <img className="max-w-full h-auto" src={notFound} alt="" />
          </div>
          <div className="md:w-1/2 p-5">
            <h1 className="text-2xl text-gray-500">{product.productName}</h1>
            <hr className="border-gray-500 my-2" />
            <p>Quantity: {product.quantity}</p>
            {product.quantity === 0 ? (
              <p className="text-red-600">out of stock</p>
            ) : (
              <p className="text-green-600">in stock</p>
            )}
            <div>
              <h1 className="text-xl mt-8 font-bold">Product Details</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo,
                praesentium.
              </p>
            </div>
          </div>
          <div className="md:w-1/4 border border-gray-300 rounded-md p-4">
            {" "}
            <p>
              Rs:{" "}
              <span className="text-2xl font-bold text-red-600">
                {product.price}
              </span>{" "}
              pkr
            </p>
            <div className="mt-6 flex space-x-4 items-center text-gray-500">
              <FontAwesomeIcon
                className="cursor-pointer text-lg"
                onClick={handleRemoveFromCart}
                icon={faMinus}
              />
              <p>{addedQuantity}</p>
              <FontAwesomeIcon
                className="cursor-pointer text-lg"
                onClick={handleAddToCart}
                icon={faPlus}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
