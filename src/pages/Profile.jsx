import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyOrders } from "../services/orderService";
import { FaUser, FaBoxOpen, FaSignOutAlt } from "react-icons/fa";
import { logout } from "../store/slices/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState("profile"); // 'profile' or 'orders'
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch orders when tab changes to 'orders'
  useEffect(() => {
    if (activeTab === "orders") {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getMyOrders(user?.id);
      setOrders(data);
    } catch (error) {
      console.error("Failed to load orders", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      dispatch(logout());
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">My Account</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* LEFT: Sidebar Navigation */}
        <div className="md:w-1/4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex flex-col items-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-3xl font-bold mb-3">
                {user?.name?.charAt(0) || "U"}
              </div>
              <h2 className="font-bold text-gray-800">
                {user?.name || "User"}
              </h2>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>

            <nav className="flex flex-col p-2">
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
                  activeTab === "profile"
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <FaUser /> Profile Details
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
                  activeTab === "orders"
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <FaBoxOpen /> Order History
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-left text-red-500 hover:bg-red-50 transition mt-2"
              >
                <FaSignOutAlt /> Logout
              </button>
            </nav>
          </div>
        </div>

        {/* RIGHT: Content Area */}
        <div className="md:w-3/4">
          {/* TAB 1: PROFILE DETAILS */}
          {activeTab === "profile" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-fadeIn">
              <h2 className="text-xl font-bold mb-6 text-gray-800">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Full Name
                  </label>
                  <p className="text-gray-900 font-medium p-3 bg-gray-50 rounded-lg">
                    {user?.name || "Not set"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Email Address
                  </label>
                  <p className="text-gray-900 font-medium p-3 bg-gray-50 rounded-lg">
                    {user?.email || "Not set"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Phone Number
                  </label>
                  <p className="text-gray-900 font-medium p-3 bg-gray-50 rounded-lg">
                    {user?.phone || "Not set"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ORDER HISTORY */}
          {activeTab === "orders" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-fadeIn">
              <h2 className="text-xl font-bold mb-6 text-gray-800">
                Order History
              </h2>

              {loading ? (
                <div className="text-center py-10 text-gray-500">
                  Loading orders...
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  No orders found.
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-gray-100 rounded-lg p-4 hover:border-blue-200 transition"
                    >
                      <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-50">
                        <div>
                          <p className="text-xs text-gray-500 uppercase font-bold">
                            Order ID
                          </p>
                          <p className="font-mono text-gray-800">{order.id}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500 uppercase font-bold">
                            Total
                          </p>
                          <p className="font-bold text-blue-600">
                            ₹{order.totalAmount}
                          </p>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="space-y-2">
                        {order.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between text-sm"
                          >
                            <span className="text-gray-700">
                              {item.Product?.name}{" "}
                              <span className="text-gray-400">
                                x{item.quantity}
                              </span>
                            </span>
                            <span className="text-gray-900 font-medium">
                              ₹{item.Product?.price}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-50 flex justify-between items-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold 
                            ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                        >
                          {order.status || "Processing"}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
