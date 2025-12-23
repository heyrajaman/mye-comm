import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { fetchProducts } from "../../services/productService";

const VendorProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate "My" ID
  const CURRENT_VENDOR_ID = "vendor_123";

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const fetchMyProducts = async () => {
    const allProducts = await fetchProducts();

    // FILTER: In a real app, the backend does this.
    // Here, we simulate showing only products that "belong" to this vendor.
    // For demo purposes, let's just show the first 3 products as "mine".
    const myProducts = allProducts.slice(0, 3).map((p) => ({
      ...p,
      status: p.status || "Active", // Default to Active if not set
    }));

    setProducts(myProducts);
    setLoading(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  if (loading) return <div className="p-6">Loading inventory...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Inventory</h2>
        <Link
          to="/vendor/products/new"
          className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-700 transition"
        >
          <FaPlus /> Add New Product
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 uppercase text-sm">
              <th className="py-3 px-6">Product</th>
              <th className="py-3 px-6">Price</th>
              <th className="py-3 px-6">Category</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {products.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-6 flex items-center gap-3">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-10 h-10 rounded object-cover border"
                  />
                  <span className="font-medium">{product.name}</span>
                </td>
                <td className="py-3 px-6 font-bold">₹{product.price}</td>
                <td className="py-3 px-6">
                  {typeof product.category === "object"
                    ? product.category.name
                    : product.category}
                </td>
                <td className="py-3 px-6">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold ${
                      product.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="py-3 px-6 text-center flex justify-center gap-3">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            You haven't added any products yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorProducts;
