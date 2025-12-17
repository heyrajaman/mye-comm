import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import filterReducer from "./slices/filterSlice";
import cartReducer from "./slices/cartSlice"; // Import

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer, // Add to store
    filters: filterReducer, // Add to store
    cart: cartReducer, // Add to store
  },
});
