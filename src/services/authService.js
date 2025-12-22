import api from "./api";

// Register User (FR-01: Phone + Password)
export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// Login User
// export const loginUser = async (credentials) => {
//   const response = await api.post("/auth/login", credentials);
//   return response.data;
// };
const USE_MOCK = true; // Keep this true to test without backend

// UPDATE: Added curly braces { phone, password } to accept the object from Login.jsx
export const loginUser = async ({ phone, password }) => {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 800));

    // MOCK SUCCESS RESPONSE
    return {
      token: "fake-jwt-token-phone-login",
      user: {
        id: "user_001",
        name: "Test User",
        // FIX: Use the phone number passed in, not the hardcoded one
        phone: phone,
        role: "customer",
      },
    };
  }

  // REAL BACKEND CALL
  const response = await api.post("/auth/login", { phone, password });
  return response.data;
};

// Get Current User Profile
export const getProfile = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};
