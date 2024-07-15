import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionFetchUserData } from "../state/user/userSlice";
import { actionFetchAllProducts } from "../state/product/productSlice";
import { useNavigate } from "react-router-dom";
import notFound from "../images/products/notfound.svg";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products || []);

  useEffect(() => {
    // document.body.style.backgroundColor = "#9c3c3c";
  }, []);
  useEffect(() => {
    dispatch(actionFetchAllProducts());
    if (localStorage.getItem("token")) {
      dispatch(actionFetchUserData());
    }
  }, [dispatch]);

  const handleShowProduct = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="mt-36 w-full lg:max-w-screen-xl xl:max-w-screen-2xl 2xl:max-w-screen-2xl mx-auto">
      <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:flex-wrap justify-center">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="w-full md:w-1/4 p-2">
              <div
                onClick={() => handleShowProduct(product._id)}
                className="p-4 bg-white cursor-pointer border border-gray-200 rounded-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="mb-4">
                  <img
                    className="max-w-full h-auto rounded"
                    src={notFound}
                    alt={product.productName}
                  />
                </div>
                <div className="px-2 pb-2">
                  <h1 className="text-xl font-semibold">
                    {product.productName}
                  </h1>
                  <p className="text-lg font-medium text-red-500">
                    Rs. {product.price}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default Products;
