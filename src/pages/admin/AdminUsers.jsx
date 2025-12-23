import { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../../services/authService";
import { FaTrash, FaUserCircle } from "react-icons/fa";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this user?")) {
      await deleteUser(id);
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  if (loading) return <div className="p-6">Loading users...</div>;

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">User Management</h2>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6">User</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">Phone</th>
              <th className="py-3 px-6">Role</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="py-3 px-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    <FaUserCircle />
                  </div>
                  <span className="font-medium text-gray-800">{user.name}</span>
                </td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6">{user.phone}</td>
                <td className="py-3 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition"
                    title="Delete User"
                    disabled={user.role === "admin"} // Prevent deleting yourself!
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
