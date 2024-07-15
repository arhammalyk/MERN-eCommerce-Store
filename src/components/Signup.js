import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputProfileImage from "./InputProfileImage";
import { useDispatch } from "react-redux";
import { actionSignupUser } from "../state/user/userSlice";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userCredentials, setUserCredentials] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    gender: "",
    profileImage: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in userCredentials) {
      formData.append(key, userCredentials[key]);
    }
    dispatch(actionSignupUser({ formData, navigate }));
  };

  const onChange = (e) => {
    setUserCredentials({
      ...userCredentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="mt-20 w-full  md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl m-auto">
      <h1 className="text-center text-2xl font-semibold">Arham Shop</h1>
      <div className="flex justify-center">
        <div className="w-11/12 lg:w-1/3 bg-white border border-gray-300 rounded-lg my-5">
          <form className="w-10/12 m-auto pb-5" onSubmit={handleSubmit}>
            <div>
              <h1 className="my-3 text-2xl ">Create account</h1>
              <input
                className="pl-2 border border-gray-400 rounded-md w-full h-7 mt-2"
                onChange={onChange}
                value={userCredentials.firstName}
                type="text"
                name="firstName"
                id="firstName"
                placeholder="first name"
              />
            </div>
            <div>
              <input
                className="pl-2 border border-gray-400 rounded-md w-full h-7 mt-2"
                onChange={onChange}
                value={userCredentials.lastName}
                type="text"
                name="lastName"
                id="lastName"
                placeholder="last name"
              />
            </div>
            <div>
              <input
                className="pl-2 border border-gray-400 rounded-md w-full h-7 mt-2"
                onChange={onChange}
                value={userCredentials.userName}
                type="text"
                name="userName"
                id="userName"
                required
                placeholder="username"
              />
            </div>
            <div>
              <input
                className="pl-2 border border-gray-400 rounded-md w-full h-7 mt-2"
                onChange={onChange}
                value={userCredentials.email}
                type="email"
                name="email"
                id="email"
                required
                placeholder="email"
              />
            </div>
            <div>
              <input
                className="pl-2 border border-gray-400 rounded-md w-full h-7 mt-2"
                onChange={onChange}
                value={userCredentials.password}
                type="password"
                name="password"
                id="password"
                required
                placeholder="At least 5 characters"
              />
            </div>
            <div className="mt-2">
              <label className="block text-lg">Gender</label>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={userCredentials.gender === "male"}
                  onChange={onChange}
                  className="mr-2"
                />
                <label className="mr-4">Male</label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={userCredentials.gender === "female"}
                  onChange={onChange}
                  className="mr-2"
                />
                <label className="mr-4">Female</label>
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={userCredentials.gender === "other"}
                  onChange={onChange}
                  className="mr-2"
                />
                <label>Other</label>
              </div>
            </div>
            <div>
              <InputProfileImage
                userCredentials={userCredentials}
                setUserCredentials={setUserCredentials}
              />
            </div>
            <div>
              <button
                type="submit"
                className="bg-[#07141d] text-white px-3 py-2 rounded-md mt-4 w-full hover:bg-[#113046] active:bg-blue-400"
              >
                Signup
              </button>
            </div>
            <h2 className="text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => {
                  navigate("/signin");
                }}
                className="cursor-pointer underline"
              >
                Signin
              </span>
            </h2>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
