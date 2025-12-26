import { useState } from "react"; // Import useState
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../store/slices/filterSlice";

const categories = [
  "Electronics",
  "Fashion",
  "Mobiles",
  "Accessories",
  "Home & Kitchen",
  "Books",
];

const ProductFilters = () => {
  const dispatch = useDispatch();
  const {
    category: activeCategory,
    minPrice,
    maxPrice,
  } = useSelector((state) => state.filters);

  // Local state for price inputs
  const [localMin, setLocalMin] = useState(minPrice);
  const [localMax, setLocalMax] = useState(maxPrice);

  const handleCategoryChange = (category) => {
    const newCategory = activeCategory === category ? "" : category;
    dispatch(setFilters({ category: newCategory }));
  };

  const applyPriceFilter = () => {
    dispatch(setFilters({ minPrice: localMin, maxPrice: localMax }));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h3 className="font-bold text-gray-800 mb-4">Categories</h3>
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat}>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={activeCategory === cat}
                onChange={() => handleCategoryChange(cat)}
                className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span
                className={`text-sm ${
                  activeCategory === cat
                    ? "text-blue-600 font-medium"
                    : "text-gray-600"
                }`}
              >
                {cat}
              </span>
            </label>
          </li>
        ))}
      </ul>

      <div className="mt-6 border-t pt-4">
        <h3 className="font-bold text-gray-800 mb-4">Price Range</h3>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            placeholder="Min"
            value={localMin}
            onChange={(e) => setLocalMin(e.target.value)}
            className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
          />
          <span className="text-gray-400">-</span>
          <input
            type="number"
            placeholder="Max"
            value={localMax}
            onChange={(e) => setLocalMax(e.target.value)}
            className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          onClick={applyPriceFilter}
          className="mt-3 w-full bg-blue-600 text-white text-sm py-2 rounded hover:bg-blue-700 transition"
        >
          Apply Price
        </button>
      </div>
    </div>
  );
};

export default ProductFilters;
