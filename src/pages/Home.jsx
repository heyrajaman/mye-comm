import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../store/slices/productSlice";
import Hero from "../components/home/Hero";
import FeaturedCategories from "../components/home/FeaturedCategories";
import ProductCard from "../components/common/ProductCard";

const Home = () => {
  const dispatch = useDispatch();
  const { featured, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    // Fetch products when component mounts
    dispatch(getAllProducts());
  }, [dispatch]);

  // Dummy data for display if API fails (since backend might not be running)
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
      price: 1299,
      category: "Wearables",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      name: "Running Shoes",
      price: 899,
      category: "Fashion",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 4,
      name: "Gaming Mouse",
      price: 499,
      category: "Electronics",
      image:
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
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
