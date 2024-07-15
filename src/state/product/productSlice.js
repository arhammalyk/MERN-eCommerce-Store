import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiHelper } from "../../helperFunctions/apiHelper";

export const actionFetchAllProducts = createAsyncThunk(
  "product/actionFetchAllProducts",
  async () => {
    const response = await apiHelper("/product/fetchAllProducts", "GET");
    return response;
  }
);

export const actionFetchProductDetails = createAsyncThunk(
  "product/actionFetchProductDetails",
  async (productId) => {
    const response = await apiHelper(
      `/product/fetchProductDetails/${productId}`,
      "GET"
    );

    return response;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    selectedProduct: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actionFetchAllProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(actionFetchProductDetails.fulfilled, (state, action) => {
      state.selectedProduct = action.payload;
    });
  },
});

export default productsSlice.reducer;
