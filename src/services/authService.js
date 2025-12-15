import api from "./api";

// Register User (FR-01: Phone + Password)
export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// Login User
export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

// Get Current User Profile
export const getProfile = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};
