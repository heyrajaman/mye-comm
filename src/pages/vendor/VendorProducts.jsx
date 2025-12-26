import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchVendorProducts } from "../../store/thunks/productThunks";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const VendorProducts = () => {
  const dispatch = useDispatch();
  // Ensure your slice has a 'vendorProducts' array, or just use 'items' if you share state
  // Assuming 'items' holds the list:
  const { items, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchVendorProducts());
  }, [dispatch]);

  if (loading)
    return <div className="text-center py-10">Loading your products...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Products</h2>
        <Link
          to="/vendor/products/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <FaPlus /> Add Product
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="bg-white p-10 rounded-xl border border-gray-200 text-center">
          <p className="text-gray-500 text-lg">
            You haven't added any products yet.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-4 font-semibold text-gray-600">Product</th>
                <th className="p-4 font-semibold text-gray-600">Price</th>
                <th className="p-4 font-semibold text-gray-600">Stock</th>
                <th className="p-4 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded md overflow-hidden">
                      {/* Use 'imageUrl' from backend */}
                      <img
                        src={
                          product.imageUrl || "https://via.placeholder.com/150"
                        }
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="font-medium text-gray-800">
                      {product.name}
                    </span>
                  </td>
                  <td className="p-4">₹{product.price}</td>
                  <td className="p-4">
                    <span
                      className={
                        product.stock > 0 ? "text-green-600" : "text-red-600"
                      }
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-3">
                      <button className="text-blue-600 hover:text-blue-800">
                        <FaEdit />
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VendorProducts;
