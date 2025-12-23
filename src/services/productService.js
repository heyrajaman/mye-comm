import api from "./api";
import { dummyProducts } from "../data/dummyData"; // Ensure this path is correct

const USE_MOCK = true; // <--- SWITCH THIS TO FALSE WHEN BACKEND IS READY
const STORAGE_KEY = "mock_product_db";

// --- HELPER: Get Data from Local Storage ---
const getLocalProducts = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    // First time load: Copy dummyData to localStorage so we have something to edit
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dummyProducts));
    return dummyProducts;
  }
  return JSON.parse(stored);
};

// 1. FETCH ALL PRODUCTS (Used by Shop & Admin)
export const fetchProducts = async (params = {}) => {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay
    let products = getLocalProducts();

    // Optional: Basic Mock Filtering (e.g. ?category=Electronics)
    if (params.category) {
      products = products.filter((p) => p.category === params.category);
    }
    if (params.featured) {
      products = products.filter((p) => p.featured === true); // Assuming you have a featured flag
    }

    return products;
  }

  // Real Backend Call
  const response = await api.get("/products", { params });
  return response.data;
};

// 2. FETCH PRODUCT BY ID (Used by Product Details)
export const fetchProductById = async (id) => {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const products = getLocalProducts();
    // Note: We use == because URL params are strings, but ID might be number
    return products.find((p) => p.id == id);
  }

  // Real Backend Call
  const response = await api.get(`/products/${id}`);
  return response.data;
};

// 3. FETCH CATEGORIES
export const fetchCategories = async () => {
  if (USE_MOCK) {
    const products = getLocalProducts();
    // Extract unique categories
    const categories = [...new Set(products.map((p) => p.category))];
    return categories;
  }

  // Real Backend Call
  const response = await api.get("/products/categories");
  return response.data;
};

// 4. DELETE PRODUCT (New - For Admin)
export const deleteProduct = async (id) => {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const currentProducts = getLocalProducts();
    const updatedProducts = currentProducts.filter((p) => p.id !== id);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
    return id;
  }

  // Real Backend Call
  const response = await api.delete(`/products/${id}`);
  return response.data;
};

// 5. ADD PRODUCT (New - For Admin)
export const addProduct = async (productData) => {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const currentProducts = getLocalProducts();
    const newProduct = {
      ...productData,
      id: Date.now(), // Generate a fake unique ID
      reviews: [],
    };

    // Add to the TOP of the list
    const updatedProducts = [newProduct, ...currentProducts];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));

    return newProduct;
  }

  // Real Backend Call
  const response = await api.post("/products", productData);
  return response.data;
};
