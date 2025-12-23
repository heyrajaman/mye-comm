import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";

const VendorAddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "Electronics",
    description: "",
    imageUrl: "",
    stock: 10,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // MOCK LOGIC: In real app, we send API request
    console.log("Vendor submitting product:", formData);

    alert("Product submitted successfully! It is now pending Admin Approval.");
    navigate("/vendor/products");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h2>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              required
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
              placeholder="e.g. Wireless Headphones"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                required
                onChange={handleChange}
                className="w-full border p-2 rounded-lg"
                placeholder="999"
              />
            </div>
            {/* Stock */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock Quantity
              </label>
              <input
                type="number"
                name="stock"
                required
                onChange={handleChange}
                className="w-full border p-2 rounded-lg"
                defaultValue="10"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              onChange={handleChange}
              className="w-full border p-2 rounded-lg bg-white"
            >
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Home & Kitchen</option>
              <option>Books</option>
            </select>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="url"
              name="imageUrl"
              required
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
              placeholder="https://..."
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows="3"
              required
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2"
          >
            <FaCloudUploadAlt /> Submit for Approval
          </button>
        </form>
      </div>
    </div>
  );
};

export default VendorAddProduct;
