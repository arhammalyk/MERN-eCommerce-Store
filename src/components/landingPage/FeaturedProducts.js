import React from "react";

import notFound from "../../images/products/notfound.svg";

function FeaturedProducts() {
  return (
    <>
      <div className="absolute top-1/4 md:top-2/3 w-full lg:max-w-screen-xl xl:max-w-screen-2xl 2xl:max-w-screen-2xl mx-auto">
        <div className="space-y-6 md:space-y-0 md:flex">
          <div className="md:w-1/4 w-10/12 bg-white mx-auto">
            <div className="border rounded-lg shadow-lg bg-white">
              <img
                src={notFound}
                alt="Example"
                className="max-w-full h-auto rounded"
              />
              <h1 className="text-center">product name</h1>
            </div>
          </div>
          <div className="md:w-1/4 w-10/12 bg-white mx-auto">
            <div className="border rounded-lg shadow-lg bg-white">
              <img
                src={notFound}
                alt="Example"
                className="max-w-full h-auto rounded"
              />
              <h1 className="text-center">product name</h1>
            </div>
          </div>
          <div className="md:w-1/4 w-10/12 bg-white mx-auto">
            <div className="border rounded-lg shadow-lg bg-white">
              <img
                src={notFound}
                alt="Example"
                className="max-w-full h-auto rounded"
              />
              <h1 className="text-center">product name</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FeaturedProducts;
