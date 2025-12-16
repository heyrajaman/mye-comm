import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts } from "../../services/productService";

// Thunk to fetch products with filters (category, sort, search)
export const getAllProducts = createAsyncThunk(
  "products/getAll",
  async (params, { rejectWithValue }) => {
    try {
      // params example: { category: 'electronics', sort: 'price_asc' }
      const data = await fetchProducts(params);
      return data;
    } catch (error) {
      // If 403 (Forbidden), silently fail to avoid console errors
      // Frontend will use dummy/fallback data
      if (error.response?.status === 403) {
        return rejectWithValue({ status: 403, silent: true });
      }
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

// Reuse the existing fetchFeatured logic...

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [], // For the main shop page
    featured: [], // For the home page
    loading: false,
    error: null,
    filters: {
      // Store active filters in Redux (optional, but good for persistence)
      category: "",
      sort: "default",
      minPrice: null,
      maxPrice: null,
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        category: "",
        sort: "default",
        minPrice: null,
        maxPrice: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle getAllProducts
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        // Silently fail for 403 errors (unauthenticated access)
        // Frontend will use dummy data as fallback
        if (action.payload?.status === 403 && action.payload?.silent) {
          state.error = null;
        } else {
          state.error = action.payload;
        }
      });
    // ... keep existing featured cases
  },
});

export const { setFilters, clearFilters } = productSlice.actions;
export default productSlice.reducer;
