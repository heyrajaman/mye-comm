import api from "./api";

// 1. DISABLE MOCK
const USE_MOCK = false;

// --- GET CART ---
export const fetchCart = async (userId) => {
  if (USE_MOCK) return [];
  // Backend Route: GET /cart/:userId
  const response = await api.get(`/cart/${userId}`);
  return response.data;
};

// --- ADD TO CART ---
export const addToCart = async (productId, quantity, userId) => {
  // Backend Route: POST /cart/add
  // Body: { productId, quantity, userId }
  const response = await api.post("/cart/add", { productId, quantity, userId });
  return response.data;
};

// --- UPDATE QUANTITY ---
export const updateCartItem = async (cartItemId, quantity) => {
  // Backend Route: PUT /cart/update/:id
  const response = await api.put(`/cart/update/${cartItemId}`, { quantity });
  return response.data;
};

// --- REMOVE ITEM ---
export const removeFromCart = async (cartItemId) => {
  // Backend Route: DELETE /cart/remove/:id
  const response = await api.delete(`/cart/remove/${cartItemId}`);
  return response.data;
};

// --- CLEAR CART ---
export const clearCartService = async (userId) => {
  // Note: Backend doesn't have a /cart/clear route
  // The backend should clear the cart in the order checkout controller
  // This just returns success so Redux can clear the frontend state
  console.log("Clearing cart in frontend for user:", userId);
  return { success: true };
};
