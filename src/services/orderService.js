import api from "./api";

// Toggle this to FALSE when your backend is ready
const USE_MOCK = true;

export const createOrder = async (orderData) => {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { success: true, orderId: Date.now() };
  }
  const response = await api.post("/orders", orderData);
  return response.data;
};

// --- NEW FUNCTION ---
export const getMyOrders = async (userId) => {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    // Dummy Orders for testing
    return [
      {
        id: "ORD-1234",
        createdAt: "2023-10-15T10:30:00Z",
        totalAmount: 2499,
        status: "Delivered",
        items: [
          { Product: { name: "Casual Sneakers", price: 2499 }, quantity: 1 },
        ],
      },
      {
        id: "ORD-5678",
        createdAt: "2023-12-01T14:20:00Z",
        totalAmount: 899,
        status: "Processing",
        items: [
          { Product: { name: "Cotton T-Shirt", price: 400 }, quantity: 1 },
          { Product: { name: "Sports Cap", price: 499 }, quantity: 1 },
        ],
      },
    ];
  }

  const response = await api.get(`/orders/user/${userId}`);
  return response.data;
};
