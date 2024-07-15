import React from "react";

function PageNotFound() {
  return (
    <>
      <div className="text-center lg:max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-7xl text-gray-600">404 :3</h1>
        <div className="w-full flex justify-center">
          <div className="w-2/3 p-10 bg-blue-500 rounded-xl text-white text-3xl">
            <p>This is not the web page you are looking for.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default PageNotFound;
