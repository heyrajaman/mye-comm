import api from "./api";

const USE_MOCK = true;

// --- HELPER FOR MOCK DB ---
// This simulates a database by looking in LocalStorage
const getMockUserDB = () => {
  const stored = localStorage.getItem("mock_user_db");
  // Default user if nothing is stored yet
  return stored
    ? JSON.parse(stored)
    : {
        id: "user_001",
        name: "Test User",
        phone: "9831876254", // Default Phone
        password: "password123", // Default Password
        role: "customer",
      };
};

export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// --- LOGIN (Smart Mock) ---
export const loginUser = async ({ phone, password }) => {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 800));

    // 1. Get the latest user data (from "Mock DB")
    const mockUser = getMockUserDB();

    // 2. Compare with the LATEST data
    if (phone !== mockUser.phone) {
      throw new Error("Invalid phone number"); // Will fail if you use the old number
    }
    if (password !== mockUser.password) {
      throw new Error("Invalid password");
    }

    // 3. Save to localStorage if not already saved (initialize mock DB on first login)
    if (!localStorage.getItem("mock_user_db")) {
      localStorage.setItem("mock_user_db", JSON.stringify(mockUser));
    }

    const storedUser = JSON.parse(localStorage.getItem("mock_user_db"));

    // 4. Return success
    return {
      token: "fake-jwt-token-updated",
      user: {
        id: mockUser.id,
        name: mockUser.name,
        phone: mockUser.phone,
        email: mockUser.email || "",
        role: mockUser.role,
      },
    };
  }

  const response = await api.post("/auth/login", { phone, password });
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

// --- UPDATE PROFILE (Smart Mock) ---
export const updateUserProfile = async (userId, updatedData) => {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 1. Get current data
    const currentUser = getMockUserDB();

    // 2. Merge new changes
    const newUser = { ...currentUser, ...updatedData };

    // 3. Save back to "Mock DB" (LocalStorage)
    localStorage.setItem("mock_user_db", JSON.stringify(newUser));

    return {
      id: userId,
      ...updatedData,
    };
  }

  const response = await api.put(`/users/${userId}`, updatedData);
  return response.data;
};

// ... existing imports ...

// Change Password
export const changePassword = async (userId, currentPassword, newPassword) => {
  // Use the global USE_MOCK variable from top of file
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 1. Get Mock DB
    const stored = localStorage.getItem("mock_user_db");
    const mockUser = stored ? JSON.parse(stored) : { password: "password123" }; // Default mock password

    // 2. Verify Current Password
    if (currentPassword !== mockUser.password) {
      throw new Error("Current password is incorrect");
    }

    // 3. Update Password
    mockUser.password = newPassword;
    localStorage.setItem("mock_user_db", JSON.stringify(mockUser));

    return { success: true, message: "Password updated successfully" };
  }

  // Real Backend Call
  const response = await api.put(`/auth/change-password`, {
    userId,
    currentPassword,
    newPassword,
  });
  return response.data;
};
