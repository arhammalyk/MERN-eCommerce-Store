import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const actionFetchAllProducts = createAsyncThunk(
  "product/actionFetchAllProducts",
  async () => {
    const response = await fetch(
      `${process.env.REACT_APP_LOCAL}/product/fetchAllProducts`,
      {
        method: "GET",
      }
    );
    const responseData = await response.json();
    return responseData;
  }
);

export const actionFetchProductDetails = createAsyncThunk(
  "product/actionFetchProductDetails",
  async (productId) => {
    const response = await fetch(
      `${process.env.REACT_APP_LOCAL}/product/fetchProductDetails/${productId}`,
      {
        method: "GET",
      }
    );
    const responseData = await response.json();
    return responseData;
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
