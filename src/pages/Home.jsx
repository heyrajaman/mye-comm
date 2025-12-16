import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeaturedProducts } from "../store/slices/productSlice";
import Hero from "../components/home/Hero";
import FeaturedCategories from "../components/home/FeaturedCategories";
import ProductCard from "../components/common/ProductCard";

const Home = () => {
  const dispatch = useDispatch();
  const { featured, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    // Fetch products when component mounts
    dispatch(getFeaturedProducts());
  }, [dispatch]);

  // Dummy data for display if API fails (since backend might not be running)
  const dummyProducts = [
    { id: 1, name: "Wireless Headphones", price: 59, category: "Electronics" },
    { id: 2, name: "Smart Watch", price: 1299, category: "Wearables" },
    { id: 3, name: "Running Shoes", price: 899, category: "Fashion" },
    { id: 4, name: "Gaming Mouse", price: 499, category: "Electronics" },
  ];

  const displayProducts = featured.length > 0 ? featured : dummyProducts;

  return (
    <div className="pb-10">
      <Hero />

      <FeaturedCategories />

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Featured Products
          </h2>
          <button className="text-blue-600 hover:underline font-medium">
            View All
          </button>
        </div>

        {loading ? (
          <div className="text-center py-10">Loading products...</div>
        ) : error ? (
          // Fallback to dummy data if error (for dev purposes)
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
