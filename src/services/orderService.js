import api from "./api";

const USE_MOCK = true;
const STORAGE_KEY = "mock_orders_db";

// Your existing dummy data - used to initialize the DB so it's not empty
const defaultMockOrders = [
  {
    id: "ORD-1234",
    userId: "user_001", // Assigned to default user
    createdAt: "2023-10-15T10:30:00Z",
    totalAmount: 2499,
    status: "Delivered",
    shippingAddress: { fullName: "Test User", city: "Mumbai" }, // Added mock address
    items: [{ Product: { name: "Casual Sneakers", price: 2499 }, quantity: 1 }],
  },
  {
    id: "ORD-5678",
    userId: "user_001",
    createdAt: "2023-12-01T14:20:00Z",
    totalAmount: 899,
    status: "Processing",
    shippingAddress: { fullName: "Test User", city: "Mumbai" },
    items: [
      { Product: { name: "Cotton T-Shirt", price: 400 }, quantity: 1 },
      { Product: { name: "Sports Cap", price: 499 }, quantity: 1 },
    ],
  },
];

// --- HELPER: Get Data from Local Storage ---
const getLocalOrders = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    // First time load: Copy your dummy data to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultMockOrders));
    return defaultMockOrders;
  }
  return JSON.parse(stored);
};

// 1. CREATE ORDER (Customer Side)
export const createOrder = async (orderData) => {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const orders = getLocalOrders();

    const newOrder = {
      ...orderData,
      id: "ORD-" + Date.now(), // Generate unique ID
      status: "Processing",
      createdAt: new Date().toISOString(),
    };

    // Add to top of list and Save
    const updatedOrders = [newOrder, ...orders];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedOrders));

    return { success: true, orderId: newOrder.id };
  }
  const response = await api.post("/orders", orderData);
  return response.data;
};

// 2. GET MY ORDERS (Customer Profile)
export const getMyOrders = async (userId) => {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const orders = getLocalOrders();
    // Return orders belonging to this user
    // Note: If userId is undefined/null in mock, we might just return all or filter vaguely
    if (!userId) return orders;
    return orders.filter((o) => o.userId === userId);
  }

  const response = await api.get(`/orders/user/${userId}`);
  return response.data;
};

// 3. GET ALL ORDERS (Admin Dashboard)
export const getAllOrders = async () => {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Admin sees EVERYTHING
    return getLocalOrders();
  }
  const response = await api.get("/orders");
  return response.data;
};

// 4. UPDATE ORDER STATUS (Admin Dashboard)
export const updateOrderStatus = async (orderId, status) => {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const orders = getLocalOrders();

    // Find and update
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status } : order
    );

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedOrders));
    return { id: orderId, status };
  }
  const response = await api.put(`/orders/${orderId}`, { status });
  return response.data;
};
