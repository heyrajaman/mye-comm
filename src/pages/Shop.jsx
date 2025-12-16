import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, setFilters } from "../store/slices/productSlice";
import ProductFilters from "../components/products/ProductFilters";
import ProductCard from "../components/common/ProductCard";
import { FaFilter } from "react-icons/fa";

const Shop = () => {
  const dispatch = useDispatch();
  const { items, loading, error, filters } = useSelector(
    (state) => state.products
  );

  // Fetch products whenever filters change
  useEffect(() => {
    dispatch(getAllProducts(filters));
  }, [dispatch, filters]);

  // Handle Sort Change
  const handleSortChange = (e) => {
    dispatch(setFilters({ sort: e.target.value }));
  };

  // Dummy data for when API is unavailable (similar to Home page)
  const dummyProducts = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 5999,
      category: "Electronics",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 12999,
      category: "Electronics",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      name: "Running Shoes",
      price: 8999,
      category: "Fashion",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 4,
      name: "Leather Bag",
      price: 14999,
      category: "Fashion",
      image:
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 5,
      name: "Digital Camera",
      price: 49999,
      category: "Electronics",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 6,
      name: "Denim Jacket",
      price: 7999,
      category: "Fashion",
      image:
        "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
  ];

  // Logic to filter dummy data if backend is missing (for demonstration)
  const displayItems = (items.length > 0 ? items : dummyProducts)
    .filter((item) => !filters.category || item.category === filters.category)
    .sort((a, b) => {
      if (filters.sort === "price_low") return a.price - b.price;
      if (filters.sort === "price_high") return b.price - a.price;
      return 0;
    });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Mobile Filter Toggle (Hidden on Desktop) */}
      <div className="md:hidden mb-4">
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg">
          <FaFilter /> <span>Filters</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar - Filters */}
        <aside className="w-full md:w-1/4 hidden md:block">
          <ProductFilters />
        </aside>

        {/* Main Content */}
        <div className="w-full md:w-3/4">
          {/* Top Bar - Sorting & Count */}
          <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <p className="text-gray-600">
              Showing{" "}
              <span className="font-bold text-gray-900">
                {displayItems.length}
              </span>{" "}
              results
            </p>

            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600">Sort By:</label>
              <select
                className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={filters.sort}
                onChange={handleSortChange}
              >
                <option value="default">Relevance</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="text-center py-20">Loading products...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayItems.length > 0 ? (
                displayItems.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-span-full text-center py-10 text-gray-500">
                  No products found matching your filters.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
