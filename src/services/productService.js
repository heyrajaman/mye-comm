import api from "./api";

// ==========================================
// CONFIGURATION: REAL BACKEND CONNECTION
// ==========================================
const USE_MOCK = false;

// --- PUBLIC ROUTES ---

// 1. Get All Products (Matches: GET /api/products)
// Supports query params: ?category=Electronics&sort=asc
export const getProducts = async (params = {}) => {
  if (USE_MOCK) return [];

  // The backend controller accepts 'category' and 'sort' in req.query
  const response = await api.get("/products", { params });
  return response.data;
};

// 2. Get Single Product (Matches: GET /api/products/:id)
export const getProductById = async (id) => {
  if (USE_MOCK) return null;

  const response = await api.get(`/products/${id}`);
  return response.data;
};

// --- VENDOR & ADMIN ROUTES ---

// 3. Create Product (Matches: POST /api/products)
// IMPORTANT: 'productData' must be a FormData object because of file upload
export const createProduct = async (productData) => {
  const response = await api.post("/products", productData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// 4. Update Product (Matches: PUT /api/products/:id)
export const updateProduct = async (id, productData) => {
  const response = await api.put(`/products/${id}`, productData, {
    headers: {
      // If sending file, use multipart/form-data, otherwise json
      "Content-Type":
        productData instanceof FormData
          ? "multipart/form-data"
          : "application/json",
    },
  });
  return response.data;
};

// 5. Delete Product (Matches: DELETE /api/products/:id)
export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};

// 6. Get Vendor's Own Products (Matches: GET /api/products/vendor/my-products)
export const getVendorProducts = async () => {
  if (USE_MOCK) return [];

  const response = await api.get("/products/vendor/my-products");
  return response.data;
};

// Note: Your backend routes currently DO NOT have a specific endpoint for 'getCategories'.
// If you need that, we might need to add it to the backend later.
