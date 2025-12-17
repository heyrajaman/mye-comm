import api from "./api";
import { dummyProducts } from "../data/dummyData";

// ==========================================
// 1. CONFIGURATION: MASTER SWITCH
// ==========================================
// Set this to TRUE to use LocalStorage (Development)
// Set this to FALSE to use Real Backend (Production/Integration)
const USE_MOCK = true;

const CART_KEY = "cart_items";

// ==========================================
// 2. HELPER FUNCTIONS (For Mock Mode)
// ==========================================
const getStoredCart = (userId) => {
  const stored = localStorage.getItem(`${CART_KEY}_${userId}`);
  return stored ? JSON.parse(stored) : [];
};

const saveCart = (userId, cart) => {
  localStorage.setItem(`${CART_KEY}_${userId}`, JSON.stringify(cart));
};

const delay = () => new Promise((resolve) => setTimeout(resolve, 300)); // Simulate network lag

// ==========================================
// 3. SERVICE FUNCTIONS
// ==========================================

// --- GET CART ---
export const fetchCart = async (userId) => {
  if (!userId) throw new Error("User ID is required");

  // A. MOCK MODE
  if (USE_MOCK) {
    await delay();
    return getStoredCart(userId);
  }

  // B. REAL BACKEND MODE
  const response = await api.get(`/cart/${userId}`);
  return response.data;
};

// --- ADD TO CART ---
export const addToCart = async (productId, quantity, userId) => {
  // A. MOCK MODE
  if (USE_MOCK) {
    await delay();
    const cart = getStoredCart(userId);
    const existingIndex = cart.findIndex(
      (item) => item.productId === productId
    );

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += quantity;
    } else {
      const product = dummyProducts.find((p) => p.id === productId);
      cart.push({
        id: Date.now(),
        productId,
        quantity,
        userId,
        Product: product, // Store snapshot for UI
      });
    }
    saveCart(userId, cart);
    return cart;
  }

  // B. REAL BACKEND MODE
  const response = await api.post("/cart/add", { productId, quantity, userId });
  return response.data;
};

// --- UPDATE QUANTITY ---
export const updateCartItem = async (cartItemId, quantity) => {
  // A. MOCK MODE
  if (USE_MOCK) {
    await delay();
    // Search all keys to find the user who owns this item (Mock limitation workaround)
    const keys = Object.keys(localStorage).filter((k) =>
      k.startsWith(CART_KEY)
    );

    for (const key of keys) {
      const userId = key.replace(`${CART_KEY}_`, "");
      const cart = getStoredCart(userId);
      const item = cart.find((i) => i.id === cartItemId);

      if (item) {
        item.quantity = quantity;
        saveCart(userId, cart);
        return { cartItemId, quantity };
      }
    }
    throw new Error("Item not found");
  }

  // B. REAL BACKEND MODE
  const response = await api.put(`/cart/update/${cartItemId}`, { quantity });
  return response.data;
};

// --- REMOVE ITEM ---
export const removeFromCart = async (cartItemId) => {
  // A. MOCK MODE
  if (USE_MOCK) {
    await delay();
    const keys = Object.keys(localStorage).filter((k) =>
      k.startsWith(CART_KEY)
    );

    for (const key of keys) {
      const userId = key.replace(`${CART_KEY}_`, "");
      const cart = getStoredCart(userId);
      const filtered = cart.filter((i) => i.id !== cartItemId);

      if (filtered.length < cart.length) {
        saveCart(userId, filtered);
        return { success: true };
      }
    }
    throw new Error("Item not found");
  }

  // B. REAL BACKEND MODE
  const response = await api.delete(`/cart/remove/${cartItemId}`);
  return response.data;
};
