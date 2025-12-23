import {
  FaBoxOpen,
  FaClipboardCheck,
  FaMoneyBillWave,
  FaStar,
} from "react-icons/fa";

const VendorDashboard = () => {
  // Mock Data for Display
  const stats = [
    {
      title: "Total Sales",
      value: "₹45,200",
      icon: <FaMoneyBillWave />,
      color: "bg-green-500",
    },
    {
      title: "Total Orders",
      value: "124",
      icon: <FaClipboardCheck />,
      color: "bg-blue-500",
    },
    {
      title: "My Products",
      value: "15",
      icon: <FaBoxOpen />,
      color: "bg-orange-500",
    },
    {
      title: "Rating",
      value: "4.8/5",
      icon: <FaStar />,
      color: "bg-yellow-500",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Overview</h2>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4"
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${stat.color}`}
            >
              {stat.icon}
            </div>
            <div>
              <p className="text-gray-500 text-sm">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Recent Account Activity
        </h3>
        <p className="text-gray-500">No recent orders today.</p>
      </div>
    </div>
  );
};

export default VendorDashboard;
