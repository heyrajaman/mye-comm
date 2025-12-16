import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-16 text-white mb-10 flex flex-col md:flex-row items-center justify-between">
      <div className="md:w-1/2 mb-8 md:mb-0">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
          Summer Sale <br /> Up to 50% Off
        </h1>
        <p className="text-lg mb-6 text-blue-100">
          Discover the latest trends in fashion and electronics. Limited time
          offer.
        </p>
        <Link
          to="/shop"
          className="bg-white text-blue-700 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition transform hover:scale-105 inline-block"
        >
          Shop Now
        </Link>
      </div>

      {/* Hero Image  */}
      <div className="md:w-1/2 flex justify-center z-10">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          alt="Shopping Hero"
          className="w-full max-w-md rounded-lg shadow-2xl transform md:rotate-3 hover:rotate-0 transition duration-500"
        />
      </div>
    </div>
  );
};

export default Hero;
