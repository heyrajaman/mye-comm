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
    items: [],
    featured: [],
    loading: false,
    error: null,
    filters: {
      category: "",
      sort: "default",
      minPrice: "", // New field
      maxPrice: "", // New field
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
        minPrice: "",
        maxPrice: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
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
        state.error = action.payload;
      });
    // (Keep existing featured cases...)
  },
});

export const { setFilters, clearFilters } = productSlice.actions;
export default productSlice.reducer;
