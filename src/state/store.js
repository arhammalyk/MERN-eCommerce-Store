import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk"; // Import thunk as a named export
import userReducer from "../state/user/userSlice";
import productsReducer from "../state/product/productSlice";
import cartReducer from "../state/userCart/cartSlice";
import orderReducer from "../state/order/orderSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

// Combine all reducers
const rootReducer = combineReducers({
  user: userReducer,
  products: productsReducer,
  cart: cartReducer,
  order: orderReducer,
});

// Configure persist for the combined reducer
const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // To handle non-serializable data in Redux state
    }).concat(thunk)
})

export const persistor = persistStore(store);

export default store;
