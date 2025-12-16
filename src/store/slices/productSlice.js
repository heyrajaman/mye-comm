import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts } from "../../services/productService";

export const getProduct = createAsyncThunk(
  "products/getOne",
  async (id, { rejectWithValue }) => {
    try {
      const data = await fetchProductById(id);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch product"
      );
    }
  }
);

export const getFeaturedProducts = createAsyncThunk(
  "products/getFeatured",
  async (_, { rejectWithValue }) => {
    try {
      // In a real app, you might pass { featured: true }
      const data = await fetchProducts({ limit: 4 });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

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
    currentProduct: null, // <--- New state for single product
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
    clearCurrentProduct: (state) => {
      // Clear data when leaving page
      state.currentProduct = null;
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
        state.error = action.payload;
      })
      // ... keep existing featured cases
      .addCase(getFeaturedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeaturedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.featured = action.payload;
      })
      .addCase(getFeaturedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // (Keep existing featured cases...)
  },
});

export const { setFilters, clearFilters, clearCurrentProduct } =
  productSlice.actions;
export default productSlice.reducer;
