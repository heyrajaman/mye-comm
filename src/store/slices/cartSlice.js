import { createSlice } from "@reduxjs/toolkit";
import {
  getCartItems,
  addItemToCart,
  updateItemQuantity,
  removeItem,
  clearCartThunk,
} from "../thunks/cartThunks";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Cart
      .addCase(getCartItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.loading = false;
        // state.items = action.payload;
        state.items = action.payload.items || action.payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Item (Ideally backend returns the new updated cart list or the single item)
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        // If backend returns the full list, use: state.items = action.payload;
        // If backend returns just the new item, push it (but fetching fresh is safer for calculations)
        state.loading = false;
        console.log("Item added to cart:", action.payload);
        // Cart will be refreshed by dispatching getCartItems after add
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Quantity
      .addCase(updateItemQuantity.fulfilled, (state, action) => {
        const item = state.items.find(
          (i) => (i.cartItemId || i.id) === action.payload.cartItemId
        );
        if (item) {
          item.quantity = action.payload.quantity;
        }
      })

      // Remove Item
      .addCase(removeItem.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => (item.cartItemId || item.id) !== action.payload
        );
      })

      // Clear Cart (from thunk)
      .addCase(clearCartThunk.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
