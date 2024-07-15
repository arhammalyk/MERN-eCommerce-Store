import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiHelper } from "../../helperFunctions/apiHelper";
import getToken from "../../helperFunctions/getToken";

export const actionFetchUserData = createAsyncThunk(
  "user/actionFetchUserData",
  async () => {
    const headers = {
      token: getToken(),
    };
    const response = await apiHelper(
      `${process.env.REACT_APP_LOCAL}/user/fetchUserData`,
      "GET",
      null,
      headers
    );
    if (response.success === true) {
      return response.user;
    }
  }
);

export const actionSignupUser = createAsyncThunk(
  "user/actionSignupUser",
  async ({ formData, navigate }, { rejectWithValue }) => {
    try {
      const response = await apiHelper(`/user/signup`, "POST", formData);
      if (response.success === true) {
        navigate("/signin");
      } else {
        alert("Enter correct credentials");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const actionSigninUser = createAsyncThunk(
  "user/actionSigninUser",
  async ({ userCredentials, navigate }, { rejectWithValue }) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await apiHelper(
      `/user/signin`,
      "POST",
      userCredentials,
      headers
    );
    if (response.success === true) {
      navigate("/");
      localStorage.setItem("token", response.authJwtToken);
      const expiryTime = new Date().getTime() + 2 * 60 * 60 * 1000; // 2 hours from now
      localStorage.setItem("tokenExpiry", expiryTime);
    } else {
      alert("Enter correct credentials");
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
