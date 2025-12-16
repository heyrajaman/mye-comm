import api from "./api";

// Fetch all products (supports query params like ?featured=true)
export const fetchProducts = async (params = {}) => {
  const response = await api.get("/products", { params });
  return response.data;
};

// Fetch specific product by ID
export const fetchProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

// Fetch categories
export const fetchCategories = async () => {
  const response = await api.get("/products/categories");
  return response.data;
};
