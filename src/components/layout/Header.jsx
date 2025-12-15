import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser, FaSearch, FaBars } from "react-icons/fa";
import { useState } from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-blue-600 tracking-tighter"
          >
            My E-Store
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 mx-8 max-w-xl relative">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-3 top-2.5 text-gray-500 hover:text-blue-600">
              <FaSearch />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-blue-600 transition"
            >
              <FaShoppingCart size={22} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
            <Link
              to="/login"
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium transition"
            >
              <FaUser size={20} />
              <span>Login</span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <FaBars size={24} />
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4 space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute right-3 top-3 text-gray-400" />
            </div>
            <Link
              to="/cart"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
            >
              <FaShoppingCart /> <span>Cart (0)</span>
            </Link>
            <Link
              to="/login"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
            >
              <FaUser /> <span>Login</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
