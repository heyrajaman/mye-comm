import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col">
      <Link
        to={`/product/${product.id}`}
        className="block overflow-hidden relative"
      >
        <div className="h-48 bg-gray-100 flex items-center justify-center relative">
          {/* Placeholder for Image */}
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-gray-400">No Image</span>
          )}
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 mb-2">
          {product.Category?.name || product.category?.name || "Uncategorized"}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600">
            ₹{product.price}
          </span>
          <button className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition">
            <FaShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
