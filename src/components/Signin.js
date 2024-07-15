import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actionSigninUser } from "../state/user/userSlice";

function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(actionSigninUser({ userCredentials, navigate }));
  };
  const onChange = (e) => {
    setUserCredentials({
      ...userCredentials,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <div className="mt-20 w-full  md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl m-auto">
        <h1 className="text-center text-2xl font-semibold">Arham Shop</h1>
        <div className="flex justify-center">
          <div className="w-11/12 lg:w-1/3 bg-white border border-gray-300 rounded-lg my-5">
            <form className="w-10/12 m-auto pb-5" onSubmit={handleSubmit}>
              <div>
                <h1 className="my-3 text-2xl ">Sign in</h1>
                <input
                  className="pl-2 border border-gray-400 rounded-md w-full h-7 mt-2"
                  placeholder="email"
                  onChange={onChange}
                  value={userCredentials.email}
                  type="email"
                  name="email"
                  id="email"
                  required
                />
              </div>
              <div>
                <input
                  className="pl-2 border border-gray-400 rounded-md w-full h-7 mt-2"
                  placeholder="password"
                  onChange={onChange}
                  value={userCredentials.password}
                  type="password"
                  name="password"
                  id="password"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-[#07141d] text-white px-3 py-2 rounded-md mt-4 w-full hover:bg-[#113046] active:bg-blue-400"
                >
                  signin
                </button>
                <h2 className="text-gray-600">
                  create account
                  <span
                    onClick={() => {
                      navigate("/signup");
                    }}
                    className="cursor-pointer underline ml-1"
                  >
                    signup
                  </span>
                </h2>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;
