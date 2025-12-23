import { useEffect, useState } from "react";
// FIX: Import 'fetchProducts' instead of 'getAllProducts'
import { fetchProducts, deleteProduct } from "../../services/productService";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products on load
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      // FIX: Call the correct function name
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        // Remove from UI immediately so we don't need to refresh
        setProducts(products.filter((p) => p.id !== id));
      } catch (error) {
        alert("Failed to delete product");
      }
    }
  };

  if (loading) return <div className="p-6">Loading products...</div>;

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Products</h2>
        {/* We will build this 'new' route next */}
        <Link
          to="/admin/products/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <FaPlus /> Add Product
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Product</th>
              <th className="py-3 px-6 text-left">Category</th>
              <th className="py-3 px-6 text-center">Price</th>
              <th className="py-3 px-6 text-center">Stock</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-md overflow-hidden border border-gray-200 mr-3">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </div>
                    <span className="font-medium">{product.name}</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-left">
                  <span className="bg-blue-100 text-blue-600 py-1 px-3 rounded-full text-xs">
                    {product.category?.name || product.category}
                  </span>
                </td>
                <td className="py-3 px-6 text-center font-bold">
                  ₹{product.price}
                </td>
                <td className="py-3 px-6 text-center">
                  {/* Mock Stock value for now */}
                  <span className="text-green-600 font-semibold">In Stock</span>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center gap-4">
                    <button className="text-blue-500 hover:text-blue-700 transform hover:scale-110 transition">
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-500 hover:text-red-700 transform hover:scale-110 transition"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No products found. Click "Add Product" to start selling!
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
