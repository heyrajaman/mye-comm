import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCurrentProduct } from "../store/slices/productSlice";
import { getProduct } from "../store/thunks/productThunks"; // Updated Import
import { dummyProducts } from "../data/dummyData"; // Fallback data
import { FaShoppingCart, FaArrowLeft, FaStar } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentProduct, loading, error } = useSelector(
    (state) => state.products
  );
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(getProduct(id));

    return () => {
      dispatch(clearCurrentProduct()); // Cleanup on unmount
    };
  }, [dispatch, id]);

  // Logic to handle missing backend (Simulation)
  // If API fails or returns null, we find the product in dummyData
  const product =
    currentProduct || dummyProducts.find((p) => p.id === parseInt(id));

  if (loading)
    return (
      <div className="text-center py-20 text-xl">
        Loading product details...
      </div>
    );
  if (!product)
    return (
      <div className="text-center py-20 text-red-500">Product not found.</div>
    );

  const handleAddToCart = () => {
    // We will implement the actual Cart Logic in the next module
    alert(`Added ${quantity} of ${product.name} to cart!`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link
        to="/shop"
        className="flex items-center text-gray-600 hover:text-blue-600 mb-6 transition"
      >
        <FaArrowLeft className="mr-2" /> Back to Shop
      </Link>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image */}
          <div className="p-8 bg-gray-50 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-96 w-full object-contain hover:scale-105 transition duration-300"
            />
          </div>

          {/* Product Info */}
          <div className="p-8 flex flex-col justify-center">
            <div className="mb-2">
              <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full uppercase tracking-wide font-semibold">
                {product.category}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>

            {/* Rating Placeholder */}
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <span className="text-gray-500 text-sm ml-2">(120 reviews)</span>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
              {product.description ||
                "This is a premium quality product designed to meet your needs. Durable, stylish, and highly rated by customers worldwide."}
            </p>

            <div className="flex items-center mb-6">
              <span className="text-3xl font-bold text-blue-600">
                ₹{product.price}
              </span>
              <span className="ml-4 text-green-600 text-sm font-medium bg-green-50 px-2 py-1 rounded">
                In Stock
              </span>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center space-x-4 mb-4">
                <label className="text-gray-700 font-medium">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    className="px-3 py-1 hover:bg-gray-100 border-r"
                    onClick={() => setQuantity((q) => Math.max(0, q - 1))}
                  >
                    -
                  </button>
                  <span className="px-4 font-medium">{quantity}</span>
                  <button
                    className="px-3 py-1 hover:bg-gray-100 border-l"
                    onClick={() => setQuantity((q) => q + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={quantity === 0}
                  className={`flex-1 py-3 rounded-lg font-bold shadow-md transition flex items-center justify-center space-x-2 ${
                    quantity === 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
                      : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
                  }`}
                >
                  <FaShoppingCart />
                  <span>Add to Cart</span>
                </button>
                {/* Wishlist Button Placeholder */}
                <button className="px-4 py-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
