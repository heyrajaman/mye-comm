import api from "./api";

// 1. DISABLE MOCK
const USE_MOCK = false;

// 1. CREATE ORDER (Checkout)
export const createOrder = async (orderData) => {
  if (USE_MOCK) return { success: true, id: "mock-id" };

  // Backend Route: POST /orders/checkout
  const response = await api.post("/orders/checkout", orderData);
  return response.data;
};

// 2. GET MY ORDERS (Customer)
export const getMyOrders = async (userId) => {
  if (USE_MOCK) return [];

  // Backend Route: GET /orders (The controller uses req.user.id from token)
  // Note: Your backend route is explicitly router.get("/", ...), so we request "/orders"
  const response = await api.get("/orders");
  return response.data;
};

// 3. GET ALL ORDERS (Admin)
export const getAllOrders = async () => {
  // Backend Route: GET /orders/admin/all
  const response = await api.get("/orders/admin/all");
  return response.data;
};

// 4. UPDATE ORDER STATUS (Admin)
export const updateOrderStatus = async (orderId, status) => {
  // Backend Route: PUT /orders/admin/:id/status
  const response = await api.put(`/orders/admin/${orderId}/status`, { status });
  return response.data;
};

// 5. GET SINGLE ORDER DETAILS
export const getOrderById = async (orderId) => {
  // Backend Route: GET /orders/:id
  const response = await api.get(`/orders/${orderId}`);
  return response.data;
};
