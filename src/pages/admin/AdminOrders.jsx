import { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../../services/orderService";
import { FaBoxOpen, FaCheckCircle, FaClock, FaTruck } from "react-icons/fa";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      // Optimistic UI Update: Update the UI immediately before server responds
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );

      await updateOrderStatus(orderId, newStatus);
    } catch (error) {
      alert("Failed to update status");
      fetchOrders(); // Revert on failure
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700 border-green-200";
      case "Shipped":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Processing":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  if (loading) return <div className="p-6">Loading orders...</div>;

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Order Management
      </h2>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6">Order ID</th>
              <th className="py-3 px-6">Customer</th>
              <th className="py-3 px-6">Total</th>
              <th className="py-3 px-6">Date</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="py-3 px-6 font-mono font-bold">#{order.id}</td>
                <td className="py-3 px-6">
                  {/* Handle missing shipping address gracefully */}
                  {order.shippingAddress?.fullName || "Guest User"}
                </td>
                <td className="py-3 px-6 font-bold text-gray-800">
                  ₹{order.totalAmount}
                </td>
                <td className="py-3 px-6">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-6">
                  <span
                    className={`py-1 px-3 rounded-full text-xs font-bold border ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-6">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                    className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:border-blue-500 cursor-pointer bg-white"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <div className="p-8 text-center text-gray-500 flex flex-col items-center">
            <FaBoxOpen size={40} className="mb-2 text-gray-300" />
            <p>No orders received yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
