import { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../../services/orderService";
import { FaBox, FaTruck, FaCheckCircle } from "react-icons/fa";

const VendorOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVendorOrders();
  }, []);

  const fetchVendorOrders = async () => {
    try {
      // 1. Get ALL orders
      const allOrders = await getAllOrders();

      // 2. FILTER: In a real app, backend sends only orders for this vendor.
      // Here, we simulate it by just taking the recent ones.
      setOrders(allOrders);
    } catch (error) {
      console.error("Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    // Update local UI immediately (Optimistic update)
    setOrders(
      orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );

    // Send to backend
    await updateOrderStatus(orderId, newStatus);
  };

  if (loading) return <div className="p-6">Loading orders...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Orders</h2>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No pending orders.
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 uppercase text-sm">
                <th className="py-3 px-6">Order ID</th>
                <th className="py-3 px-6">Item(s) to Pack</th>
                <th className="py-3 px-6">Qty</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-6 font-mono font-bold">
                    #{order.id.slice(-6)}
                  </td>

                  {/* Items Column */}
                  <td className="py-3 px-6">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 mb-1">
                        <FaBox className="text-purple-500" />
                        <span className="font-medium text-gray-800">
                          {item.Product?.name || "Product"}
                        </span>
                      </div>
                    ))}
                  </td>

                  <td className="py-3 px-6">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="mb-1">
                        x {item.quantity}
                      </div>
                    ))}
                  </td>

                  <td className="py-3 px-6">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-bold ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Shipped"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="py-3 px-6">
                    <select
                      className="border p-1 rounded bg-white cursor-pointer hover:border-purple-500"
                      value={order.status}
                      onChange={(e) =>
                        handleStatusUpdate(order.id, e.target.value)
                      }
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default VendorOrders;
