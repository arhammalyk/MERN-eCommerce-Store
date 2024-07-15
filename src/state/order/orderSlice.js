import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { clearCart, toggleCart } from "../userCart/cartSlice";
import getToken from "../../helperFunctions/getToken";

export const actionCheckoutSession = createAsyncThunk(
  "order/actionCheckoutSession",
  async (
    { cartItems, currency, paymentMethodId, navigate, dispatch },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_LOCAL}/order/createCheckoutSession`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: getToken(),
          },
          body: JSON.stringify({
            cartItems,
            currency,
            paymentMethodId,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }
      const responseData = await response.json();
      if (responseData.success === true) {
        alert("payment successful");
        navigate("/orderSummary");
        dispatch(clearCart());
        dispatch(toggleCart());
        return responseData.order;
      }
    } catch (error) {
      console.error("Error in actionCheckoutSession:", error);
      return rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    status: "idle",
    orderSummary: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actionCheckoutSession.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actionCheckoutSession.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orderSummary = action.payload;
      })
      .addCase(actionCheckoutSession.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
