import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts, fetchProductById } from "../../services/productService";

// Fetch all products (with filters)
export const getAllProducts = createAsyncThunk(
  "products/getAll",
  async (params, { rejectWithValue }) => {
    try {
      const data = await fetchProducts(params);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

// Fetch featured products
export const getFeaturedProducts = createAsyncThunk(
  "products/getFeatured",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchProducts({ limit: 4 });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

// Fetch single product
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
