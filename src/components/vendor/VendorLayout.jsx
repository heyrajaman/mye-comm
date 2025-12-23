import { Outlet, Link, useNavigate } from "react-router-dom";
import {
  FaBox,
  FaChartLine,
  FaClipboardList,
  FaSignOutAlt,
  FaStore,
  FaUser, // <--- 1. Import User Icon
} from "react-icons/fa";

const VendorLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // In real app: dispatch logout action
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* SIDEBAR */}
      <div className="w-64 bg-purple-800 text-white flex flex-col">
        <div className="p-6 text-center border-b border-purple-700">
          <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
            <FaStore /> Vendor Panel
          </h1>
          <p className="text-purple-300 text-sm mt-1">My Shop Name</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/vendor/dashboard"
            className="flex items-center gap-3 px-4 py-3 hover:bg-purple-700 rounded-lg transition"
          >
            <FaChartLine /> Dashboard
          </Link>
          <Link
            to="/vendor/products"
            className="flex items-center gap-3 px-4 py-3 hover:bg-purple-700 rounded-lg transition"
          >
            <FaBox /> My Products
          </Link>
          <Link
            to="/vendor/orders"
            className="flex items-center gap-3 px-4 py-3 hover:bg-purple-700 rounded-lg transition"
          >
            <FaClipboardList /> My Orders
          </Link>

          {/* <--- 2. Added Profile Link Here */}
          <Link
            to="/vendor/profile"
            className="flex items-center gap-3 px-4 py-3 hover:bg-purple-700 rounded-lg transition"
          >
            <FaUser /> Shop Profile
          </Link>
        </nav>

        <div className="p-4 border-t border-purple-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left hover:bg-red-600 rounded-lg transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Vendor Portal</h2>

          {/* <--- 3. Wrapped Top Right Section in Link */}
          <Link
            to="/vendor/profile"
            className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition"
          >
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-bold">
              Verified Seller
            </span>
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600">
              VS
            </div>
          </Link>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default VendorLayout;
