import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../store/slices/productSlice";

const categories = [
  "Electronics",
  "Fashion",
  "Mobiles",
  "Home & Kitchen",
  "Books",
];

const ProductFilters = () => {
  const dispatch = useDispatch();
  const activeCategory = useSelector(
    (state) => state.products.filters.category
  );

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleCategoryChange = (category) => {
    const newCategory = activeCategory === category ? "" : category; // Toggle
    dispatch(setFilters({ category: newCategory }));
  };

  const handlePriceFilter = () => {
    dispatch(
      setFilters({
        minPrice: minPrice ? Number(minPrice) : null,
        maxPrice: maxPrice ? Number(maxPrice) : null,
      })
    );
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
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-20 px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <span className="text-gray-400">-</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-20 px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handlePriceFilter}
          className="mt-3 w-full bg-blue-600 text-white text-xs py-2 rounded hover:bg-blue-700 transition"
        >
          Apply Price
        </button>
      </div>
    </div>
  );
};

export default ProductFilters;
