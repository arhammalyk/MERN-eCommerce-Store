import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getToken from "../../helperFunctions/getToken";

export const actionFetchUserData = createAsyncThunk(
  "user/actionFetchUserData",
  async () => {
    const response = await fetch(
      `${process.env.REACT_APP_LOCAL}/user/fetchUserData`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: getToken(),
        },
      }
    );
    const responseData = await response.json();
    if (responseData.success === true) {
      return responseData.user;
    }
  }
);

export const actionSignupUser = createAsyncThunk(
  "user/actionSignupUser",
  async ({ formData, navigate }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_LOCAL}/user/signup`,
        {
          method: "POST",
          body: formData,
        }
      );
      const responseData = await response.json();
      if (responseData.success === true) {
        navigate("/signin");
      } else {
        alert("enter correct credentials");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const actionSigninUser = createAsyncThunk(
  "user/actionSigninUser",
  async ({ userCredentials, navigate }, { rejectWithValue }) => {
    const response = await fetch(`${process.env.REACT_APP_LOCAL}/user/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userCredentials.email,
        password: userCredentials.password,
      }),
    });
    const responseData = await response.json();
    if (responseData.success === true) {
      navigate("/");
      localStorage.setItem("token", responseData.authJwtToken);
      const expiryTime = new Date().getTime() + 2 * 60 * 60 * 1000; // 2 hours from now
      localStorage.setItem("tokenExpiry", expiryTime);
      // here
    } else {
      alert("enter correct credentials");
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    signinStatus: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actionFetchUserData.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});
export default userSlice.reducer;
