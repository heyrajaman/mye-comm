import api from "./api";

export const createOrder = async (orderData) => {
  // 1. Send data to your Backend
  // expected payload: { items, shippingAddress, paymentMethod, totalAmount }
  const response = await api.post("/orders", orderData);
  return response.data;
};
