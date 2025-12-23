import { useState } from "react";
import { FaUserShield, FaSave } from "react-icons/fa";

const AdminSettings = () => {
  const [adminData, setAdminData] = useState({
    name: "Super Admin",
    email: "admin@ecommerce.com",
    currentPassword: "",
    newPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Admin Settings Updated!");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Settings</h2>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 max-w-2xl">
        <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
          <FaUserShield className="text-blue-600" /> Account Security
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Display Name
            </label>
            <input
              type="text"
              value={adminData.name}
              onChange={(e) =>
                setAdminData({ ...adminData, name: e.target.value })
              }
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              value={adminData.email}
              onChange={(e) =>
                setAdminData({ ...adminData, email: e.target.value })
              }
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          <hr className="my-4" />

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Current Password
            </label>
            <input type="password" className="w-full border p-2 rounded mt-1" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              New Password
            </label>
            <input type="password" className="w-full border p-2 rounded mt-1" />
          </div>

          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition flex items-center gap-2"
          >
            <FaSave /> Update Settings
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;
