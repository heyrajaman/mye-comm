import api from "./api";

const USE_MOCK = true;
const STORAGE_KEY = "mock_addresses";

// Helper to get from local storage
const getLocalAddresses = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

// 1. GET ALL ADDRESSES
export const getAddresses = async (userId) => {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return getLocalAddresses();
  }
  const response = await api.get(`/addresses/${userId}`);
  return response.data;
};

// 2. ADD NEW ADDRESS
export const addAddress = async (userId, addressData) => {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const current = getLocalAddresses();
    const newAddress = { id: Date.now(), ...addressData }; // Assign a fake ID

    const updatedList = [...current, newAddress];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));

    return newAddress;
  }
  const response = await api.post("/addresses", { userId, ...addressData });
  return response.data;
};

// 3. DELETE ADDRESS
export const deleteAddress = async (addressId) => {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const current = getLocalAddresses();
    const updatedList = current.filter((addr) => addr.id !== addressId);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    return true;
  }
  const response = await api.delete(`/addresses/${addressId}`);
  return response.data;
};
