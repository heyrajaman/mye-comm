const AdminDashboard = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Stat Cards */}
        {[
          { label: "Total Sales", value: "₹24,500", color: "bg-green-500" },
          { label: "Total Orders", value: "15", color: "bg-blue-500" },
          { label: "Products", value: "8", color: "bg-purple-500" },
          { label: "Customers", value: "12", color: "bg-orange-500" },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden"
          >
            <div
              className={`absolute top-0 right-0 w-2 h-full ${stat.color}`}
            ></div>
            <p className="text-gray-500 text-sm font-medium uppercase">
              {stat.label}
            </p>
            <p className="text-2xl font-bold text-gray-800 mt-1">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
