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
    totalQuantity: 0, // ✅ Added for Navbar badge
    totalAmount: 0, // ✅ Added for Checkout summary
    loading: false,
    error: null,
  },
  reducers: {
    // ✅ SYNC ACTION: Called after successful payment
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      state.error = null;
      // ✅ CRITICAL: Clear browser storage too
      localStorage.removeItem("cartItems");
    },
    // ✅ OPTIONAL: Helper to calculate totals manually if needed
    calculateTotals: (state) => {
      state.totalQuantity = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // --- GET CART ---
      .addCase(getCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.loading = false;
        // Handle different backend response structures
        const fetchedItems = action.payload.items || action.payload || [];
        state.items = fetchedItems;

        // Auto-calculate totals when cart loads
        state.totalQuantity = fetchedItems.reduce(
          (acc, item) => acc + item.quantity,
          0
        );
        state.totalAmount = fetchedItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- ADD ITEM ---
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addItemToCart.fulfilled, (state) => {
        state.loading = false;
        // We don't update items here because usually, we refetch the cart immediately
        // after adding to ensure backend calculation (taxes, stock) is correct.
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- UPDATE QUANTITY ---
      .addCase(updateItemQuantity.fulfilled, (state, action) => {
        const item = state.items.find(
          (i) => (i.cartItemId || i.id) === action.payload.cartItemId
        );
        if (item) {
          item.quantity = action.payload.quantity;
        }
        // Recalculate totals immediately for UI responsiveness
        state.totalQuantity = state.items.reduce(
          (acc, item) => acc + item.quantity,
          0
        );
        state.totalAmount = state.items.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
      })

      // --- REMOVE ITEM ---
      .addCase(removeItem.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => (item.cartItemId || item.id) !== action.payload
        );
        // Recalculate totals
        state.totalQuantity = state.items.reduce(
          (acc, item) => acc + item.quantity,
          0
        );
        state.totalAmount = state.items.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
      })

      // --- CLEAR CART (ASYNC FROM BACKEND) ---
      .addCase(clearCartThunk.fulfilled, (state) => {
        state.items = [];
        state.totalQuantity = 0;
        state.totalAmount = 0;
        localStorage.removeItem("cartItems");
      });
  },
});

export const { clearCart, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;
