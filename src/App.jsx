import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppShell from "./components/layout/AppShell";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Profile from "./pages/Profile";

// --- ADMIN IMPORTS ---
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoute from "./components/auth/AdminRoute";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminAddProduct from "./components/admin/AdminAddProduct";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* === ADMIN ROUTES (PROTECTED) === */}
        {/* Wrap AdminLayout with AdminRoute */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />{" "}
            <Route path="products/new" element={<AdminAddProduct />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="users" element={<AdminUsers />} />
            {/* Future admin routes... */}
          </Route>
        </Route>

        {/* === CUSTOMER ROUTES (Uses AppShell with Header/Footer) === */}
        <Route path="/" element={<AppShell />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="shop" element={<Shop />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />

          {/* Protected Customer Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="checkout" element={<Checkout />} />
            <Route path="order-success" element={<OrderSuccess />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* 404 Page (Only for customer paths) */}
          <Route
            path="*"
            element={
              <div className="text-center mt-20 text-2xl">
                404: Page Not Found
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
